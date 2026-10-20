# MineGuard (Light edition) — Coal Mine Productivity & Safety Management

A starter full-stack web application built with React + Vite, Flask, and MySQL.

## Features
- Dark industrial dashboard with sample KPIs and production chart
- Safety incident / hazard reporting and incident list
- Daily production entry and production history
- Equipment status and maintenance records
- Environmental readings for methane, carbon monoxide, oxygen, temperature and ventilation
- REST API in Flask; MySQL schema and demo seed data
- Responsive layout for desktop and mobile

> Safety note: This is a management prototype. It is not a certified mine safety system and must not replace approved gas monitoring, ventilation controls, emergency plans, or competent safety personnel. Demo sensor readings are illustrative, not live data.

## Requirements
- Python 3.10+
- Node.js 18+
- MySQL 8+

## 1. Create the database
Open MySQL Workbench or the MySQL CLI and run `database/schema.sql`.
It creates the `mineguard` database and tables.

Optional: run `database/seed.sql` for sample data.

## 2. Configure Flask
In a terminal, enter the project folder, then:

### Windows (PowerShell)
```powershell
cd backend
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `backend/.env` and set your MySQL username/password.

### macOS/Linux
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Start API:
```bash
python app.py
```
API runs at `http://127.0.0.1:5000`. Test `http://127.0.0.1:5000/api/health`.

## 3. Start React
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

If MySQL or Flask is not configured yet, the interface uses built-in demo data. Once the API is available, it loads data from Flask.

## API endpoints
- `GET /api/health`
- `GET /api/dashboard`
- `GET/POST /api/incidents`
- `GET/POST /api/production`
- `GET/POST /api/equipment`
- `GET/POST /api/readings`

## Suggested next steps before real deployment
- Add authentication, role-based access control, audit logs and secure password handling.
- Add input validation, backups, HTTPS, rate limiting and deployment secrets.
- Integrate only approved, authenticated sensor gateways; show timestamp, source, stale-data state and fail-safe alerting.
- Have mine safety professionals validate thresholds and workflows for the actual jurisdiction and site.

> Light edition runs on http://localhost:5174 so it can sit beside the dark edition (5173). Same Flask API and database.
