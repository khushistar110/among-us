USE mineguard;
INSERT IGNORE INTO equipment (asset_name, asset_code, location, status, last_service, notes) VALUES
('Continuous Miner CM-04','CM-04','Panel A-2','Operational','2026-09-22','Routine inspection recorded'),
('Roof Bolter RB-02','RB-02','Panel B-1','Maintenance','2026-10-10','Scheduled maintenance'),
('Haulage Vehicle HV-11','HV-11','Main roadway','Down','2026-10-03','Awaiting inspection');
INSERT INTO incidents (title, location, severity, status, reported_by, details) VALUES
('Loose material reported','Panel B-1','High','Investigating','Demo Supervisor','Area isolated pending inspection'),
('Lighting fault','Main roadway','Low','Open','Demo Operator','Maintenance ticket required');
INSERT INTO production (shift_name, section_name, output_tonnes, target_tonnes, recorded_by) VALUES
('Day','Panel A-2',420,450,'Demo Supervisor'),
('Evening','Panel A-2',385,400,'Demo Supervisor'),
('Night','Panel B-1',350,380,'Demo Supervisor');
INSERT INTO environmental_readings (location, methane_pct, carbon_monoxide_ppm, oxygen_pct, temperature_c, ventilation_m_s, source_name) VALUES
('Panel A-2',0.35,8,20.8,27.4,1.8,'Illustrative demo data'),
('Main roadway',0.22,5,20.9,25.8,2.1,'Illustrative demo data');
