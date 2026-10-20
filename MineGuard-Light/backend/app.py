import os
from datetime import date
from decimal import Decimal
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"]}})

def connect_db():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST", "127.0.0.1"),
        port=int(os.getenv("MYSQL_PORT", "3306")),
        user=os.getenv("MYSQL_USER", "root"),
        password=os.getenv("MYSQL_PASSWORD", ""),
        database=os.getenv("MYSQL_DATABASE", "mineguard"),
        connection_timeout=3
    )

def clean(value):
    if isinstance(value, (date,)):
        return value.isoformat()
    if isinstance(value, Decimal):
        return float(value)
    return value

def query(sql, params=(), one=False, write=False):
    conn = connect_db()
    cur = conn.cursor(dictionary=True)
    try:
        cur.execute(sql, params)
        if write:
            conn.commit()
            return cur.lastrowid
        rows = cur.fetchone() if one else cur.fetchall()
        if one:
            return {k: clean(v) for k, v in rows.items()} if rows else None
        return [{k: clean(v) for k, v in row.items()} for row in rows]
    finally:
        cur.close()
        conn.close()

def db_error(exc):
    return jsonify({"error": "Database unavailable. Check MySQL is running, schema.sql was executed, and backend/.env is configured.", "detail": str(exc)}), 503

@app.get("/api/health")
def health():
    try:
        query("SELECT 1 AS ok", one=True)
        return jsonify({"status": "ok", "database": "connected"})
    except Error as exc:
        return db_error(exc)

@app.get("/api/dashboard")
def dashboard():
    try:
        incidents = query("SELECT COUNT(*) AS total FROM incidents WHERE status <> 'Resolved'", one=True)["total"]
        production_row = query("SELECT COALESCE(SUM(output_tonnes),0) AS output, COALESCE(SUM(target_tonnes),0) AS target FROM production WHERE DATE(created_at)=CURDATE()", one=True)
        equipment_down = query("SELECT COUNT(*) AS total FROM equipment WHERE status='Down'", one=True)["total"]
        latest = query("SELECT * FROM environmental_readings ORDER BY recorded_at DESC LIMIT 1", one=True)
        trend = query("""SELECT DATE_FORMAT(created_at, '%a') AS day, SUM(output_tonnes) AS output
                         FROM production WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
                         GROUP BY DATE(created_at), DATE_FORMAT(created_at, '%a')
                         ORDER BY DATE(created_at)""")
        return jsonify({
            "open_incidents": incidents, "production_tonnes": production_row["output"],
            "target_tonnes": production_row["target"], "equipment_down": equipment_down,
            "latest_reading": latest, "production_trend": trend
        })
    except Error as exc:
        return db_error(exc)

@app.route("/api/incidents", methods=["GET", "POST"])
def incidents():
    try:
        if request.method == "GET":
            return jsonify(query("SELECT * FROM incidents ORDER BY created_at DESC LIMIT 100"))
        data = request.get_json(silent=True) or {}
        required = ["title", "location", "severity", "reported_by"]
        if any(not str(data.get(k, "")).strip() for k in required):
            return jsonify({"error": "title, location, severity and reported_by are required"}), 400
        if data["severity"] not in ["Low", "Medium", "High", "Critical"]:
            return jsonify({"error": "Invalid severity"}), 400
        new_id = query("""INSERT INTO incidents (title, location, severity, reported_by, details)
                          VALUES (%s,%s,%s,%s,%s)""",
                       (data["title"].strip(), data["location"].strip(), data["severity"],
                        data["reported_by"].strip(), data.get("details", "").strip()), write=True)
        return jsonify({"id": new_id, "message": "Incident recorded"}), 201
    except Error as exc:
        return db_error(exc)

@app.route("/api/production", methods=["GET", "POST"])
def production():
    try:
        if request.method == "GET":
            return jsonify(query("SELECT * FROM production ORDER BY created_at DESC LIMIT 100"))
        data = request.get_json(silent=True) or {}
        try:
            output, target = float(data["output_tonnes"]), float(data["target_tonnes"])
        except (KeyError, TypeError, ValueError):
            return jsonify({"error": "Valid output_tonnes and target_tonnes are required"}), 400
        if output < 0 or target <= 0:
            return jsonify({"error": "Output must be >= 0 and target must be > 0"}), 400
        new_id = query("""INSERT INTO production (shift_name, section_name, output_tonnes, target_tonnes, recorded_by)
                          VALUES (%s,%s,%s,%s,%s)""",
                       (data.get("shift_name", "Day"), data.get("section_name", "Unassigned"),
                        output, target, data.get("recorded_by", "Supervisor")), write=True)
        return jsonify({"id": new_id, "message": "Production recorded"}), 201
    except Error as exc:
        return db_error(exc)

@app.route("/api/equipment", methods=["GET", "POST"])
def equipment():
    try:
        if request.method == "GET":
            return jsonify(query("SELECT * FROM equipment ORDER BY asset_name"))
        data = request.get_json(silent=True) or {}
        required = ["asset_name", "asset_code", "location", "status"]
        if any(not str(data.get(k, "")).strip() for k in required):
            return jsonify({"error": "asset_name, asset_code, location and status are required"}), 400
        if data["status"] not in ["Operational", "Maintenance", "Down"]:
            return jsonify({"error": "Invalid equipment status"}), 400
        new_id = query("""INSERT INTO equipment (asset_name, asset_code, location, status, notes)
                          VALUES (%s,%s,%s,%s,%s)""",
                       (data["asset_name"], data["asset_code"], data["location"], data["status"], data.get("notes", "")), write=True)
        return jsonify({"id": new_id, "message": "Equipment recorded"}), 201
    except Error as exc:
        if getattr(exc, "errno", None) == 1062:
            return jsonify({"error": "That asset code already exists"}), 409
        return db_error(exc)

@app.route("/api/readings", methods=["GET", "POST"])
def readings():
    try:
        if request.method == "GET":
            return jsonify(query("SELECT * FROM environmental_readings ORDER BY recorded_at DESC LIMIT 100"))
        data = request.get_json(silent=True) or {}
        fields = ["methane_pct", "carbon_monoxide_ppm", "oxygen_pct", "temperature_c", "ventilation_m_s"]
        try:
            vals = [float(data[k]) for k in fields]
        except (KeyError, TypeError, ValueError):
            return jsonify({"error": "All five numeric environmental readings are required"}), 400
        if any(v < 0 for v in vals):
            return jsonify({"error": "Readings cannot be negative"}), 400
        new_id = query("""INSERT INTO environmental_readings
            (location,methane_pct,carbon_monoxide_ppm,oxygen_pct,temperature_c,ventilation_m_s,source_name)
            VALUES (%s,%s,%s,%s,%s,%s,%s)""",
            (data.get("location", "Unassigned"), *vals, data.get("source_name", "Manual entry")), write=True)
        return jsonify({"id": new_id, "message": "Reading recorded. Validate against site-approved limits."}), 201
    except Error as exc:
        return db_error(exc)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=os.getenv("FLASK_DEBUG", "false").lower() == "true")
