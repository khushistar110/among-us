import React, { useState } from 'react';
import { Search, Plus, ShieldCheck } from 'lucide-react';
import type { Incident } from '../types/mineguard';

interface SafetyViewProps {
  incidents: Incident[];
  onOpenIncidentModal: () => void;
}

export const SafetyView: React.FC<SafetyViewProps> = ({
  incidents,
  onOpenIncidentModal,
}) => {
  const [query, setQuery] = useState('');

  const filteredIncidents = incidents.filter((x) =>
    `${x.title} ${x.location} ${x.severity} ${x.status}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 w-full">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#deded8]">
        <div>
          <div className="font-mono text-[11px] font-bold text-[#f4a900] tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#f4a900]" /> ZERO HARM WORKFLOWS
          </div>
          <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black text-[#1546d9] uppercase tracking-tight">
            Safety & Incident Registry
          </h1>
          <p className="text-sm text-[#64748b] mt-1 max-w-2xl">
            Real-time hazard logging, DGMS statutory incident reporting, and mitigation audit trails.
          </p>
        </div>

        <button className="mg-btn primary self-start md:self-auto" onClick={onOpenIncidentModal}>
          <Plus size={16} /> Report Incident
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 bg-white border border-[#deded8] rounded-xl px-4 py-2.5 flex-1 max-w-md shadow-sm">
          <Search size={18} className="text-[#64748b]" />
          <input
            className="w-full bg-transparent border-0 outline-none text-xs text-[#14181c] placeholder:text-[#94a3b8]"
            placeholder="Search incident title, panel location, severity, status..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="font-mono text-xs text-[#64748b] font-bold">
          {filteredIncidents.length} RECORDS DISPLAYED
        </div>
      </div>

      {/* Table Panel */}
      <div className="mg-table-panel mb-8">
        <div className="mg-table-scroll">
          <table className="mg-table">
            <thead>
              <tr>
                <th>Incident</th>
                <th>Location</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Reported By</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((i) => (
                <tr key={i.id}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className={`severity-mark ${i.severity.toLowerCase()}`} />
                      <b className="font-semibold text-xs text-[#14181c]">{i.title}</b>
                    </div>
                  </td>
                  <td>
                    <span className="font-mono text-xs">{i.location}</span>
                  </td>
                  <td>
                    <span className={`mg-tag ${i.severity.toLowerCase()}`}>
                      {i.severity}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`mg-tag ${
                        i.status === 'Resolved'
                          ? 'success'
                          : i.status === 'Investigating'
                          ? 'info'
                          : 'neutral'
                      }`}
                    >
                      {i.status}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-[#475569]">{i.reported_by}</span>
                  </td>
                  <td>
                    <span className="font-mono text-[11px] text-[#64748b]">
                      {i.created_at}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!filteredIncidents.length && (
            <div className="text-center py-16 text-slate-400 font-mono text-xs">
              No safety records match your search filter.
            </div>
          )}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="mg-notice">
        <ShieldCheck size={20} className="text-[#f4a900]" />
        <div>
          <b>Statutory Mine Safety Compliance (DGMS Section 23)</b>
          <span>
            Recording an incident here logs an immutable entry in the mine's digital register.
            For imminent ground fall or hazardous gas thresholds (&gt;0.8% CH₄), follow statutory
            whistle protocols and notify shift deputies immediately.
          </span>
        </div>
      </div>
    </div>
  );
};
