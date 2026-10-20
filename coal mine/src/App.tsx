import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './views/HomeView';
import { OverviewView } from './views/OverviewView';
import { SafetyView } from './views/SafetyView';
import { ProductionView } from './views/ProductionView';
import { EquipmentView } from './views/EquipmentView';
import { EnvironmentView } from './views/EnvironmentView';
import { AttendanceView } from './views/AttendanceView';
import { PlaceholderView } from './views/PlaceholderView';

import { SupervisorModal } from './components/SupervisorModal';
import { DemoModal } from './components/DemoModal';
import { IncidentModal } from './components/modals/IncidentModal';
import { ProductionModal } from './components/modals/ProductionModal';
import { EquipmentModal } from './components/modals/EquipmentModal';
import { ReadingModal } from './components/modals/ReadingModal';

import { CheckCircle2 } from 'lucide-react';
import type {
  Incident,
  ProductionEntry,
  EquipmentItem,
  EnvironmentalReading,
  PageRoute,
} from './types/mineguard';

const API = 'http://127.0.0.1:5000/api';

const demoIncidents: Incident[] = [
  {
    id: 1,
    title: 'Loose material reported on conveyor line',
    location: 'Panel B-1',
    severity: 'High',
    status: 'Investigating',
    reported_by: 'Shift supervisor',
    created_at: 'Today, 09:42',
    details: 'Spill along transfer chute 3B. Crew alerted.',
  },
  {
    id: 2,
    title: 'Lighting fault on main haul road',
    location: 'Main roadway',
    severity: 'Low',
    status: 'Open',
    reported_by: 'Maintenance team',
    created_at: 'Today, 08:15',
    details: 'Strobe unit 4 extinguished. Replacement queued.',
  },
  {
    id: 3,
    title: 'Pre-shift inspection follow-up on Bolter RB-02',
    location: 'Panel A-2',
    severity: 'Medium',
    status: 'Open',
    reported_by: 'Safety officer',
    created_at: 'Yesterday',
    details: 'Hydraulic seal inspection due before shift start.',
  },
];

const demoProduction: ProductionEntry[] = [
  { day: 'Mon', shift_name: 'Day', section_name: 'Panel A-2', output: 362, target_tonnes: 450, recorded_by: 'Shift supervisor' },
  { day: 'Tue', shift_name: 'Day', section_name: 'Panel A-2', output: 398, target_tonnes: 450, recorded_by: 'Shift supervisor' },
  { day: 'Wed', shift_name: 'Evening', section_name: 'Panel B-1', output: 374, target_tonnes: 450, recorded_by: 'Shift supervisor' },
  { day: 'Thu', shift_name: 'Day', section_name: 'Panel A-2', output: 426, target_tonnes: 450, recorded_by: 'Shift supervisor' },
  { day: 'Fri', shift_name: 'Night', section_name: 'Panel B-1', output: 405, target_tonnes: 450, recorded_by: 'Shift supervisor' },
  { day: 'Sat', shift_name: 'Day', section_name: 'Panel A-2', output: 442, target_tonnes: 450, recorded_by: 'Shift supervisor' },
  { day: 'Sun', shift_name: 'Day', section_name: 'Panel A-2', output: 420, target_tonnes: 450, recorded_by: 'Shift supervisor' },
];

const demoEquipment: EquipmentItem[] = [
  {
    id: 1,
    asset_name: 'Continuous Miner CM-04',
    asset_code: 'CM-04',
    location: 'Panel A-2',
    status: 'Operational',
    last_service: '2026-09-22',
    notes: 'Hydraulic fluid replaced, teeth inspected.',
  },
  {
    id: 2,
    asset_name: 'Roof Bolter RB-02',
    asset_code: 'RB-02',
    location: 'Panel B-1',
    status: 'Maintenance',
    last_service: '2026-10-10',
    notes: 'Awaiting primary seal kit delivery.',
  },
  {
    id: 3,
    asset_name: 'Haulage Vehicle HV-11',
    asset_code: 'HV-11',
    location: 'Main roadway',
    status: 'Down',
    last_service: '2026-10-03',
    notes: 'Electric drive motor diagnostics required.',
  },
];

const demoReadings: EnvironmentalReading[] = [
  {
    id: 1,
    location: 'Panel A-2 Face',
    methane_pct: 0.35,
    carbon_monoxide_ppm: 8,
    oxygen_pct: 20.8,
    temperature_c: 27.4,
    ventilation_m_s: 1.8,
    source_name: 'Apex-1 Beacon Sniffer',
    recorded_at: 'Demo live data',
  },
  {
    id: 2,
    location: 'Main Roadway West',
    methane_pct: 0.22,
    carbon_monoxide_ppm: 5,
    oxygen_pct: 20.9,
    temperature_c: 25.8,
    ventilation_m_s: 2.1,
    source_name: 'Ventilation Telemetry 04',
    recorded_at: 'Demo live data',
  },
];

export const App: React.FC = () => {
  // Navigation & Page State
  const [page, setPage] = useState<PageRoute>('home');
  const [currentLang, setCurrentLang] = useState('en');

  // Backend / Telemetry Data State
  const [apiLive, setApiLive] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>(demoIncidents);
  const [production, setProduction] = useState<ProductionEntry[]>(demoProduction);
  const [equipment, setEquipment] = useState<EquipmentItem[]>(demoEquipment);
  const [readings, setReadings] = useState<EnvironmentalReading[]>(demoReadings);

  // Modals State
  const [supervisorOpen, setSupervisorOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [incidentModalOpen, setIncidentModalOpen] = useState(false);
  const [productionModalOpen, setProductionModalOpen] = useState(false);
  const [equipmentModalOpen, setEquipmentModalOpen] = useState(false);
  const [readingModalOpen, setReadingModalOpen] = useState(false);
  const [inspectedComponent, setInspectedComponent] = useState<{
    name: string;
    data: any;
  } | null>(null);

  // Toast feedback state
  const [toast, setToast] = useState('');

  const notify = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  }, []);

  // Hash route mapping
  const routeToHash: Record<PageRoute, string> = {
    home: '#home',
    Overview: '#overview',
    'Safety & incidents': '#safety',
    Production: '#production',
    Equipment: '#equipment',
    Environment: '#environment',
    'Attendance & PPE': '#attendance',
    Workforce: '#workforce',
    Inspections: '#inspections',
    Reports: '#reports',
  };

  const hashToRoute: Record<string, PageRoute> = {
    '': 'home',
    '#': 'home',
    '#home': 'home',
    '#overview': 'Overview',
    '#safety': 'Safety & incidents',
    '#production': 'Production',
    '#equipment': 'Equipment',
    '#environment': 'Environment',
    '#attendance': 'Attendance & PPE',
    '#workforce': 'Workforce',
    '#inspections': 'Inspections',
    '#reports': 'Reports',
  };

  // Sync route with URL hash
  const navigateTo = (targetPage: PageRoute) => {
    setPage(targetPage);
    const hash = routeToHash[targetPage] || '#home';
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash.toLowerCase();
      // Allow section anchors on landing page without changing page away from home
      if (['#overview-section', '#safety-tech', '#shift-handover', '#compliance'].includes(currentHash)) {
        setPage('home');
        return;
      }
      if (hashToRoute[currentHash]) {
        setPage(hashToRoute[currentHash]);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Telemetry API loader with demo mode fallback
  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const [h, i, p, e, r] = await Promise.all([
          fetch(`${API}/health`, { signal: AbortSignal.timeout(2000) }),
          fetch(`${API}/incidents`, { signal: AbortSignal.timeout(2000) }),
          fetch(`${API}/production`, { signal: AbortSignal.timeout(2000) }),
          fetch(`${API}/equipment`, { signal: AbortSignal.timeout(2000) }),
          fetch(`${API}/readings`, { signal: AbortSignal.timeout(2000) }),
        ]);

        if (!h.ok || !i.ok || !p.ok || !e.ok || !r.ok) throw new Error();

        const [hj, ij, pj, ej, rj] = await Promise.all([
          h.json(),
          i.json(),
          p.json(),
          e.json(),
          r.json(),
        ]);

        if (!alive) return;
        setApiLive(hj.database === 'connected');
        setIncidents(ij);
        setProduction(
          pj.map((x: any, idx: number) => ({
            day: x.shift_name || `Entry ${idx + 1}`,
            output: Number(x.output_tonnes || x.output || 0),
            ...x,
          }))
        );
        setEquipment(ej);
        setReadings(rj);
      } catch {
        if (alive) setApiLive(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  // Post helper for API
  async function postApi(path: string, data: any) {
    const res = await fetch(`${API}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error || 'Could not save record');
    return body;
  }

  // Modal Handlers
  const handleSaveIncident = async (newIncident: Omit<Incident, 'id' | 'created_at'>) => {
    try {
      if (apiLive) {
        await postApi('incidents', newIncident);
        const r = await fetch(`${API}/incidents`);
        setIncidents(await r.json());
      } else {
        setIncidents((prev) => [
          {
            ...newIncident,
            id: Date.now(),
            created_at: 'Just now',
          },
          ...prev,
        ]);
      }
      setIncidentModalOpen(false);
      notify('Incident report saved and logged to safety queue.');
    } catch (err: any) {
      notify(err.message || 'Error saving incident');
    }
  };

  const handleSaveProduction = async (newProd: Omit<ProductionEntry, 'id'>) => {
    try {
      if (apiLive) {
        await postApi('production', {
          ...newProd,
          output_tonnes: Number(newProd.output),
          target_tonnes: Number(newProd.target_tonnes),
        });
        const r = await fetch(`${API}/production`);
        const data = await r.json();
        setProduction(
          data.map((x: any, i: number) => ({
            day: x.shift_name || `Entry ${i + 1}`,
            output: Number(x.output_tonnes),
            ...x,
          }))
        );
      } else {
        setProduction((prev) => [
          ...prev,
          {
            ...newProd,
            id: Date.now(),
            day: newProd.shift_name,
          },
        ]);
      }
      setProductionModalOpen(false);
      notify('Shift production entry recorded.');
    } catch (err: any) {
      notify(err.message || 'Error saving production entry');
    }
  };

  const handleSaveEquipment = async (newEquip: Omit<EquipmentItem, 'id'>) => {
    try {
      if (apiLive) {
        await postApi('equipment', newEquip);
        const r = await (await fetch(`${API}/equipment`)).json();
        setEquipment(r);
      } else {
        setEquipment((prev) => [...prev, { ...newEquip, id: Date.now() }]);
      }
      setEquipmentModalOpen(false);
      notify('Heavy machinery asset registered.');
    } catch (err: any) {
      notify(err.message || 'Error saving equipment');
    }
  };

  const handleSaveReading = async (newReading: Omit<EnvironmentalReading, 'id' | 'recorded_at'>) => {
    try {
      if (apiLive) {
        await postApi('readings', newReading);
        const r = await (await fetch(`${API}/readings`)).json();
        setReadings(r);
      } else {
        setReadings((prev) => [
          {
            ...newReading,
            id: Date.now(),
            recorded_at: 'Just now',
          },
          ...prev,
        ]);
      }
      setReadingModalOpen(false);
      notify('Sub-surface environmental gas telemetry recorded.');
    } catch (err: any) {
      notify(err.message || 'Error saving gas reading');
    }
  };

  const handleSelectComponent = (name: string, data: any) => {
    setInspectedComponent({ name, data });
    setSupervisorOpen(true);
  };

  const handleExplore = () => {
    const el = document.getElementById('overview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openIncidentsCount = incidents.filter((x) => x.status !== 'Resolved').length;
  const downEquipmentCount = equipment.filter((x) => x.status === 'Down').length;

  return (
    <div className="min-h-screen bg-[#E8E9DF] text-[#14181C] relative selection:bg-[#1546D9] selection:text-white">
      {/* 1. Complete MineGuard Light Top Navigation Bar */}
      <Navbar
        currentPage={page}
        onNavigate={navigateTo}
        openIncidentsCount={openIncidentsCount}
        apiLive={apiLive}
        onOpenSupervisor={() => {
          setInspectedComponent(null);
          setSupervisorOpen(true);
        }}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
      />

      {/* 2. Main Content Router View */}
      <main className="w-full">
        {page === 'home' && (
          <HomeView
            onExplore={handleExplore}
            onBookDemo={() => setDemoOpen(true)}
            onSelectComponent={handleSelectComponent}
            onNavigateSection={(sec) => navigateTo(sec as PageRoute)}
          />
        )}

        {page === 'Overview' && (
          <OverviewView
            incidents={incidents}
            production={production}
            equipment={equipment}
            readings={readings}
            onNavigate={navigateTo}
            onOpenIncidentModal={() => setIncidentModalOpen(true)}
          />
        )}

        {page === 'Safety & incidents' && (
          <SafetyView
            incidents={incidents}
            onOpenIncidentModal={() => setIncidentModalOpen(true)}
          />
        )}

        {page === 'Production' && (
          <ProductionView
            production={production}
            downEquipment={downEquipmentCount}
            onOpenProductionModal={() => setProductionModalOpen(true)}
          />
        )}

        {page === 'Equipment' && (
          <EquipmentView
            equipment={equipment}
            onOpenEquipmentModal={() => setEquipmentModalOpen(true)}
          />
        )}

        {page === 'Environment' && (
          <EnvironmentView
            readings={readings}
            onOpenReadingModal={() => setReadingModalOpen(true)}
          />
        )}

        {page === 'Attendance & PPE' && (
          <AttendanceView notify={notify} />
        )}

        {['Workforce', 'Inspections', 'Reports'].includes(page) && (
          <PlaceholderView pageName={page} notify={notify} />
        )}
      </main>

      {/* Interactive Modals */}
      <SupervisorModal
        isOpen={supervisorOpen}
        onClose={() => setSupervisorOpen(false)}
        selectedComponent={inspectedComponent}
      />

      <DemoModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
      />

      <IncidentModal
        isOpen={incidentModalOpen}
        onClose={() => setIncidentModalOpen(false)}
        onSubmit={handleSaveIncident}
      />

      <ProductionModal
        isOpen={productionModalOpen}
        onClose={() => setProductionModalOpen(false)}
        onSubmit={handleSaveProduction}
      />

      <EquipmentModal
        isOpen={equipmentModalOpen}
        onClose={() => setEquipmentModalOpen(false)}
        onSubmit={handleSaveEquipment}
      />

      <ReadingModal
        isOpen={readingModalOpen}
        onClose={() => setReadingModalOpen(false)}
        onSubmit={handleSaveReading}
      />

      {/* Floating Status Toast */}
      {toast && (
        <div className="mg-toast">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default App;
