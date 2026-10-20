import React, { useEffect, useState } from 'react';
import {
  Gauge,
  ShieldAlert,
  Truck,
  Activity,
  RadioTower,
  Construction,
  Users,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type {
  Incident,
  ProductionEntry,
  EquipmentItem,
  EnvironmentalReading,
  PageRoute,
} from '../types/mineguard';

export const Scramble: React.FC<{ text: string }> = ({ text }) => {
  const [out, setOut] = useState(text.replace(/[A-Za-z0-9]/g, '·'));

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text);
      return;
    }
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let f = 0;
    const total = 34;
    const hold = 8;
    let id: any;

    const start = setTimeout(() => {
      id = setInterval(() => {
        f++;
        const keep = Math.max(0, Math.floor((text.length * (f - hold)) / (total - hold)));
        setOut(
          text
            .split('')
            .map((c, i) =>
              i < keep || !/[A-Za-z0-9]/.test(c)
                ? c
                : chars[Math.floor(Math.random() * chars.length)]
            )
            .join('')
        );
        if (f >= total) {
          clearInterval(id);
          setOut(text);
        }
      }, 65);
    }, 450);

    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [text]);

  return <span className="scr" aria-label={text}>{out}</span>;
};

interface OverviewViewProps {
  incidents: Incident[];
  production: ProductionEntry[];
  equipment: EquipmentItem[];
  readings: EnvironmentalReading[];
  onNavigate: (page: PageRoute) => void;
  onOpenIncidentModal: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  incidents,
  production,
  equipment,
  readings,
  onNavigate,
  onOpenIncidentModal,
}) => {
  const totalProduction = production.reduce(
    (sum, x) => sum + Number(x.output || x.output_tonnes || 0),
    0
  );
  const openIncidents = incidents.filter((x) => x.status !== 'Resolved').length;
  const downEquipment = equipment.filter((x) => x.status === 'Down').length;
  const latest = readings[0] || {
    location: 'Panel A-2',
    recorded_at: 'Demo data',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -12;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 16;
    e.currentTarget.style.setProperty('--rx', `${rx}deg`);
    e.currentTarget.style.setProperty('--ry', `${ry}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="w-full">
      {/* 3D Aerospace Hero Radar Section */}
      <section
        className="hx"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="hx-bg" />
        <div className="hx-grid" />

        <div className="hx-inner">
          <div>
            <div className="hx-tag">
              <i /> NORTH RIDGE MINE · SHIFT A · LIVE OPERATIONS
            </div>
            <h2>
              <span className="sm">
                <Scramble text="Mine intelligence platform" />
              </span>
              <Scramble text="Every shift." />
              <br />
              <span className="ol">
                <Scramble text="Every signal." />
              </span>
            </h2>
            <p>
              One command view for coal extraction, equipment telemetry, sub-surface
              environmental logs, and zero-harm hazard tracking—engineered for
              supervisors who run the mine and answer for it.
            </p>
            <div className="hx-cta">
              <button
                className="mg-btn primary"
                onClick={() => onNavigate('Safety & incidents')}
              >
                Review safety queue <span>↗</span>
              </button>
              <button
                className="mg-btn secondary"
                onClick={() => onNavigate('Attendance & PPE')}
              >
                Open entry gate
              </button>
            </div>
          </div>

          <div className="hx-radar" aria-hidden="true">
            <div className="hx-ring" />
            <div className="hx-cross" />
            <div className="hx-sweep" />
            <i className="hx-blip b1" />
            <i className="hx-blip b2" />
            <i className="hx-blip b3" />

            <div className="hx-chip c1">
              <small>OUTPUT</small>
              <b>
                {totalProduction.toLocaleString('en-IN')}
                <em>t</em>
              </b>
            </div>
            <div className="hx-chip c2">
              <small>OPEN REPORTS</small>
              <b>
                {openIncidents}
                <em>active</em>
              </b>
            </div>
            <div className="hx-chip c3">
              <small>ASSETS DOWN</small>
              <b>
                {downEquipment}
                <em>units</em>
              </b>
            </div>
          </div>
        </div>

        {/* Bottom Stat Strip */}
        <div className="hx-strip">
          <div>
            <b>
              {totalProduction.toLocaleString('en-IN')}
              <em>t</em>
            </b>
            <span>Coal recorded</span>
          </div>
          <div>
            <b>{openIncidents}</b>
            <span>Open safety reports</span>
          </div>
          <div>
            <b>{equipment.length}</b>
            <span>Registered assets</span>
          </div>
          <div>
            <b>{readings.length}</b>
            <span>Environmental logs</span>
          </div>
        </div>
      </section>

      {/* Main Container for Snapshot & Charts */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10">
        {/* Section Head */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#deded8]">
          <div>
            <h2 className="font-['Barlow_Condensed'] text-3xl font-black text-[#1546d9] uppercase tracking-wide flex items-center gap-2">
              <span className="text-[#f4a900]">//</span> Operational Snapshot
            </h2>
            <p className="text-xs text-[#64748b] mt-1 font-mono">
              Key indicators for the current pit reporting view
            </p>
          </div>
          <span className="font-mono text-[11px] font-bold text-[#64748b] flex items-center gap-2 uppercase tracking-wider bg-white px-3 py-1.5 rounded-full border border-[#deded8]">
            <span className="live-dot" /> LIVE DATA SYNCHRONIZED
          </span>
        </div>

        {/* Metric Cards Grid */}
        <div className="mg-metric-grid">
          <div className="mg-metric-card">
            <div className="mg-metric-top">
              <span>Coal Production</span>
              <div className="mg-metric-icon amber">
                <Gauge size={18} />
              </div>
            </div>
            <div className="mg-metric-value">
              {totalProduction.toLocaleString('en-IN')}
              <small>tonnes</small>
            </div>
            <div className="mg-metric-change">
              <ArrowUpRight size={14} />
              <span>Shift entries</span>
            </div>
            <div className="mg-metric-footer">Current shift extraction logs</div>
          </div>

          <div className="mg-metric-card">
            <div className="mg-metric-top">
              <span>Open Safety Reports</span>
              <div className="mg-metric-icon red">
                <ShieldAlert size={18} />
              </div>
            </div>
            <div className="mg-metric-value">
              {openIncidents}
              <small>reports</small>
            </div>
            <div className="mg-metric-change text-red-500">
              <ArrowDownRight size={14} />
              <span>{openIncidents ? 'Needs review' : 'Clear'}</span>
            </div>
            <div className="mg-metric-footer">Unresolved incident records</div>
          </div>

          <div className="mg-metric-card">
            <div className="mg-metric-top">
              <span>Equipment Down</span>
              <div className="mg-metric-icon blue">
                <Truck size={18} />
              </div>
            </div>
            <div className="mg-metric-value">
              {downEquipment}
              <small>assets</small>
            </div>
            <div className="mg-metric-change text-blue-600">
              <span>{downEquipment ? 'Action needed' : 'Operational'}</span>
            </div>
            <div className="mg-metric-footer">Status from asset register</div>
          </div>

          <div className="mg-metric-card">
            <div className="mg-metric-top">
              <span>Environmental Logs</span>
              <div className="mg-metric-icon green">
                <Activity size={18} />
              </div>
            </div>
            <div className="mg-metric-value">
              {readings.length}
              <small>records</small>
            </div>
            <div className="mg-metric-change">
              <ArrowUpRight size={14} />
              <span>Telemetry active</span>
            </div>
            <div className="mg-metric-footer">4-Gas sub-surface sniffer</div>
          </div>
        </div>

        {/* Dashboard Grid: Chart + Safety Follow-ups */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Production Chart (7 Cols) */}
          <div className="lg:col-span-8 bg-white border border-[#deded8] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-[#f1f0eb]">
              <div>
                <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546d9] uppercase tracking-wide">
                  Production Overview
                </h3>
                <p className="text-xs text-[#64748b]">
                  Recorded shift output against operational targets
                </p>
              </div>
              <button
                className="font-mono text-xs font-bold text-[#1546d9] hover:underline"
                onClick={() => onNavigate('Production')}
              >
                VIEW FULL RECORDS ↗
              </button>
            </div>

            <div className="flex items-center gap-3 my-3 text-xs font-semibold text-[#64748b]">
              <span className="w-3 h-3 rounded-sm bg-[#f4a900]" />
              <span>Coal Output (Tonnes)</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={
                    production.length
                      ? production
                      : [
                          { day: 'Mon', output: 362, shift_name: 'Day', section_name: 'Panel A-2', target_tonnes: 450, recorded_by: 'Supervisor' },
                          { day: 'Tue', output: 398, shift_name: 'Day', section_name: 'Panel A-2', target_tonnes: 450, recorded_by: 'Supervisor' },
                          { day: 'Wed', output: 374, shift_name: 'Evening', section_name: 'Panel B-1', target_tonnes: 450, recorded_by: 'Supervisor' },
                          { day: 'Thu', output: 426, shift_name: 'Day', section_name: 'Panel A-2', target_tonnes: 450, recorded_by: 'Supervisor' },
                          { day: 'Fri', output: 405, shift_name: 'Night', section_name: 'Panel B-1', target_tonnes: 450, recorded_by: 'Supervisor' },
                          { day: 'Sat', output: 442, shift_name: 'Day', section_name: 'Panel A-2', target_tonnes: 450, recorded_by: 'Supervisor' },
                          { day: 'Sun', output: 420, shift_name: 'Day', section_name: 'Panel A-2', target_tonnes: 450, recorded_by: 'Supervisor' },
                        ]
                  }
                  margin={{ top: 12, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="amberFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F4A900" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#F4A900" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#E3E2DC" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#64748B', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#FFFFFF',
                      border: '1px solid #DEDED8',
                      borderRadius: 10,
                      color: '#1546D9',
                      fontWeight: 700,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="output"
                    stroke="#1546D9"
                    strokeWidth={2.5}
                    fill="url(#amberFill)"
                    activeDot={{ r: 5, fill: '#F5A623', stroke: '#1546D9', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-3 border-t border-[#f1f0eb] flex items-center justify-between text-[11px] font-mono text-[#8a94a6]">
              <span>Real-time pit weighbridge integration</span>
              <span>Metric tons / Shift</span>
            </div>
          </div>

          {/* Safety Follow-ups (4 Cols) */}
          <div className="lg:col-span-4 bg-white border border-[#deded8] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#f1f0eb]">
                <div>
                  <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546d9] uppercase tracking-wide">
                    Safety Queue
                  </h3>
                  <p className="text-xs text-[#64748b]">Open items requiring supervisor signoff</p>
                </div>
                <button
                  className="font-mono text-xs font-bold text-[#1546d9] hover:underline"
                  onClick={() => onNavigate('Safety & incidents')}
                >
                  VIEW ALL ↗
                </button>
              </div>

              {/* Circular Ring Summary */}
              <div className="safety-summary">
                <div className="safety-ring">
                  <div>
                    <b>{openIncidents}</b>
                    <small>OPEN</small>
                  </div>
                </div>
                <div>
                  <b className="text-xs font-bold text-[#14181c] block">
                    Review Outstanding Reports
                  </b>
                  <span className="text-[11px] text-[#64748b] leading-relaxed block mt-1">
                    Assign responsible pit engineer and follow approved DGMS escalation.
                  </span>
                </div>
              </div>

              {/* Mini List */}
              <div className="divide-y divide-[#f1f0eb] mt-4">
                {incidents
                  .filter((i) => i.status !== 'Resolved')
                  .slice(0, 3)
                  .map((i) => (
                    <div className="mini-row" key={i.id}>
                      <div className={`severity-mark ${i.severity.toLowerCase()}`} />
                      <div className="flex-1 min-w-0">
                        <b className="text-xs font-bold text-[#14181c] block truncate">
                          {i.title}
                        </b>
                        <small className="text-[10px] text-[#64748b] font-mono block">
                          {i.location}
                        </small>
                      </div>
                      <span className={`mg-tag ${i.severity.toLowerCase()}`}>
                        {i.severity}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <button
              className="mg-btn secondary full mt-6"
              onClick={onOpenIncidentModal}
            >
              <Plus size={15} /> Log a Safety Report
            </button>
          </div>
        </div>

        {/* Site Readiness Cards */}
        <div className="mb-4">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#deded8]">
            <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546d9] uppercase tracking-wide flex items-center gap-2">
              <span className="text-[#f4a900]">//</span> Site Readiness
            </h3>
            <button
              className="font-mono text-xs font-bold text-[#1546d9] hover:underline"
              onClick={() => onNavigate('Environment')}
            >
              ENVIRONMENTAL LOGS ↗
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-sm hover:border-[#1546d9] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1546d9] flex items-center justify-center">
                  <RadioTower size={18} />
                </div>
                <span className="mg-tag neutral">Recorded</span>
              </div>
              <span className="text-[11px] font-mono text-[#64748b] uppercase tracking-wider block">
                Latest Sniffer Station
              </span>
              <b className="font-['Barlow_Condensed'] text-2xl font-bold text-[#14181c] block mt-1 uppercase">
                {latest.location || 'Panel A-2'}
              </b>
              <small className="text-[11px] text-[#8a94a6] block mt-2">
                Gas reading station · {latest.recorded_at || 'Just recorded'}
              </small>
            </div>

            <div className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-sm hover:border-[#1546d9] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Construction size={18} />
                </div>
                <span className={`mg-tag ${downEquipment ? 'high' : 'success'}`}>
                  {downEquipment ? 'Attention' : 'Optimal'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#64748b] uppercase tracking-wider block">
                Equipment Down
              </span>
              <b className="font-['Barlow_Condensed'] text-2xl font-bold text-[#14181c] block mt-1 uppercase">
                {downEquipment} <small className="text-sm font-normal">assets offline</small>
              </b>
              <small className="text-[11px] text-[#8a94a6] block mt-2">
                Confirm telemetry status with pit master.
              </small>
            </div>

            <div className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-sm hover:border-[#1546d9] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Users size={18} />
                </div>
                <span className="mg-tag neutral">Shift Active</span>
              </div>
              <span className="text-[11px] font-mono text-[#64748b] uppercase tracking-wider block">
                Attendance Gate
              </span>
              <b className="font-['Barlow_Condensed'] text-2xl font-bold text-[#14181c] block mt-1 uppercase">
                Smart PPE Verification
              </b>
              <small className="text-[11px] text-[#8a94a6] block mt-2">
                Optical turnstiles active on shaft elevator 1 & 2.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
