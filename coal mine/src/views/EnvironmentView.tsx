import React from 'react';
import { RadioTower, Plus } from 'lucide-react';
import type { EnvironmentalReading } from '../types/mineguard';

interface EnvironmentViewProps {
  readings: EnvironmentalReading[];
  onOpenReadingModal: () => void;
}

export const EnvironmentView: React.FC<EnvironmentViewProps> = ({
  readings,
  onOpenReadingModal,
}) => {
  const latest = readings[0] || {
    location: 'Panel A-2 Face',
    methane_pct: 0.25,
    carbon_monoxide_ppm: 5,
    oxygen_pct: 20.9,
    temperature_c: 26.2,
    ventilation_m_s: 2.1,
    source_name: 'Apex-1 Sniffer Mesh',
  };

  const gasCards: Array<{
    name: string;
    val: number | string;
    unit: string;
    color: string;
    desc: string;
  }> = [
    {
      name: 'Methane (CH₄)',
      val: latest.methane_pct,
      unit: '%',
      color: 'bg-amber-500',
      desc: 'Threshold: < 0.75% per DGMS',
    },
    {
      name: 'Carbon Monoxide (CO)',
      val: latest.carbon_monoxide_ppm,
      unit: 'ppm',
      color: 'bg-red-500',
      desc: 'Threshold: < 25 ppm statutory',
    },
    {
      name: 'Oxygen (O₂)',
      val: latest.oxygen_pct,
      unit: '%',
      color: 'bg-blue-500',
      desc: 'Min Safe: > 19.5% breathable',
    },
    {
      name: 'Temperature',
      val: latest.temperature_c,
      unit: '°C',
      color: 'bg-amber-500',
      desc: 'Face thermal comfort check',
    },
    {
      name: 'Ventilation Velocity',
      val: latest.ventilation_m_s,
      unit: 'm/s',
      color: 'bg-emerald-500',
      desc: 'Airflow across active seam',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 w-full">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#deded8]">
        <div>
          <div className="font-mono text-[11px] font-bold text-[#f4a900] tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#f4a900]" /> SUB-SURFACE ATMOSPHERIC
          </div>
          <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black text-[#1546d9] uppercase tracking-tight">
            Environmental & Gas Sniffer Logs
          </h1>
          <p className="text-sm text-[#64748b] mt-1 max-w-2xl">
            Continuous atmospheric monitoring, ventilation airflow meters, and statutory gas clearance.
          </p>
        </div>

        <button className="mg-btn primary self-start md:self-auto" onClick={onOpenReadingModal}>
          <Plus size={16} /> Add Reading
        </button>
      </div>

      {/* Safety Notice */}
      <div className="mg-notice mb-8">
        <RadioTower size={20} className="text-[#f4a900]" />
        <div>
          <b>Atmospheric Safety Telemetry Notice</b>
          <span>
            These measurements represent authenticated pit sensor feeds and manual sniffer entries.
            Always confirm gas thresholds with approved handheld DGMS multi-gas detectors prior to shot-firing.
          </span>
        </div>
      </div>

      {/* Environmental Gas Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {gasCards.map((g) => (
          <div
            key={g.name}
            className="bg-white border border-[#deded8] rounded-2xl p-5 shadow-sm hover:border-[#1546d9] transition-colors flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-[11px] font-bold text-[#64748b] block uppercase">
                {g.name}
              </span>
              <div className="flex items-baseline gap-1 my-3">
                <b className="font-['Barlow_Condensed'] text-4xl font-black text-[#14181c]">
                  {g.val ?? '—'}
                </b>
                <small className="text-xs font-semibold text-[#64748b]">{g.unit}</small>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div className={`h-full ${g.color} w-3/5 rounded-full`} />
              </div>
            </div>
            <small className="font-mono text-[10px] text-[#8a94a6] block mt-1">
              {g.desc}
            </small>
          </div>
        ))}
      </div>

      {/* Reading Log Table */}
      <div className="mg-table-panel mb-8">
        <div className="p-5 border-b border-[#deded8] flex items-center justify-between">
          <div>
            <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546d9] uppercase tracking-wide">
              Historical Sniffer Readings
            </h3>
            <p className="text-xs text-[#64748b]">
              Location and verification source recorded per shift entry
            </p>
          </div>
          <span className="font-mono text-xs text-[#64748b]">
            Station: {latest.location}
          </span>
        </div>

        <div className="mg-table-scroll">
          <table className="mg-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>CH₄ (%)</th>
                <th>CO (ppm)</th>
                <th>O₂ (%)</th>
                <th>Temp (°C)</th>
                <th>Ventilation (m/s)</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {readings.map((x) => (
                <tr key={x.id}>
                  <td>
                    <b className="font-semibold text-xs text-[#14181c]">
                      {x.location}
                    </b>
                  </td>
                  <td>
                    <span className="font-mono font-bold text-xs text-[#d97706]">
                      {x.methane_pct}%
                    </span>
                  </td>
                  <td>
                    <span className="font-mono font-bold text-xs text-[#dc2626]">
                      {x.carbon_monoxide_ppm} ppm
                    </span>
                  </td>
                  <td>
                    <span className="font-mono font-bold text-xs text-[#1546d9]">
                      {x.oxygen_pct}%
                    </span>
                  </td>
                  <td>
                    <span className="font-mono text-xs text-[#475569]">
                      {x.temperature_c}°C
                    </span>
                  </td>
                  <td>
                    <span className="font-mono font-bold text-xs text-emerald-600">
                      {x.ventilation_m_s} m/s
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-[#64748b]">
                      {x.source_name || 'Apex-1 Beacon'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
