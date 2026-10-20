export interface Incident {
  id: number | string;
  title: string;
  location: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Investigating' | 'Resolved';
  reported_by: string;
  created_at: string;
  details?: string;
}

export interface ProductionEntry {
  id?: number | string;
  day?: string;
  shift_name: string;
  section_name: string;
  output: number;
  output_tonnes?: number;
  target_tonnes: number;
  recorded_by: string;
}

export interface EquipmentItem {
  id: number | string;
  asset_name: string;
  asset_code: string;
  location: string;
  status: 'Operational' | 'Maintenance' | 'Down';
  last_service: string;
  notes?: string;
}

export interface EnvironmentalReading {
  id: number | string;
  location: string;
  methane_pct: number;
  carbon_monoxide_ppm: number;
  oxygen_pct: number;
  temperature_c: number;
  ventilation_m_s: number;
  source_name?: string;
  recorded_at?: string;
}

export type PageRoute =
  | 'home'
  | 'Overview'
  | 'Safety & incidents'
  | 'Production'
  | 'Equipment'
  | 'Environment'
  | 'Attendance & PPE'
  | 'Workforce'
  | 'Inspections'
  | 'Reports';
