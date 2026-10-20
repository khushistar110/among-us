import React from 'react';
import { Gauge, ClipboardCheck, Truck, Plus } from 'lucide-react';
import type { ProductionEntry } from '../types/mineguard';

interface ProductionViewProps {
  production: ProductionEntry[];
  downEquipment: number;
  onOpenProductionModal: () => void;
}

export const ProductionView: React.FC<ProductionViewProps> = ({
  production,
  downEquipment,
  onOpenProductionModal,
}) => {
  const totalProduction = production.reduce(
    (s, x) => s + Number(x.output ?? x.output_tonnes ?? 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 w-full">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#deded8]">
        <div>
          <div className="font-mono text-[11px] font-bold text-[#f4a900] tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#f4a900]" /> EXTRACTION LOGISTICS
          </div>
          <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black text-[#1546d9] uppercase tracking-tight">
            Production & Extraction Attainment
          </h1>
          <p className="text-sm text-[#64748b] mt-1 max-w-2xl">
            Shift-by-shift coal output telemetry, cut-face attainment, and haulage targets.
          </p>
        </div>

        <button className="mg-btn primary self-start md:self-auto" onClick={onOpenProductionModal}>
          <Plus size={16} /> Add Production Entry
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="mg-metric-card">
          <div className="mg-metric-top">
            <span>Total Recorded Output</span>
            <div className="mg-metric-icon amber">
              <Gauge size={18} />
            </div>
          </div>
          <div className="mg-metric-value">
            {totalProduction.toLocaleString('en-IN')}
            <small>tonnes</small>
          </div>
          <div className="mg-metric-footer">Combined active pit sections</div>
        </div>

        <div className="mg-metric-card">
          <div className="mg-metric-top">
            <span>Production Entries</span>
            <div className="mg-metric-icon blue">
              <ClipboardCheck size={18} />
            </div>
          </div>
          <div className="mg-metric-value">
            {production.length}
            <small>shifts logged</small>
          </div>
          <div className="mg-metric-footer">Current reporting period</div>
        </div>

        <div className="mg-metric-card">
          <div className="mg-metric-top">
            <span>Equipment Offline</span>
            <div className="mg-metric-icon red">
              <Truck size={18} />
            </div>
          </div>
          <div className="mg-metric-value">
            {downEquipment}
            <small>assets</small>
          </div>
          <div className="mg-metric-footer">Impacts hourly cycle time</div>
        </div>
      </div>

      {/* Production Log Table */}
      <div className="mg-table-panel mb-8">
        <div className="p-5 border-b border-[#deded8] flex items-center justify-between">
          <div>
            <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546d9] uppercase tracking-wide">
              Shift Records
            </h3>
            <p className="text-xs text-[#64748b]">
              Attainment calculated against statutory face quota
            </p>
          </div>
          <span className="font-mono text-xs text-[#64748b]">
            {production.length} entries on record
          </span>
        </div>

        <div className="mg-table-scroll">
          <table className="mg-table">
            <thead>
              <tr>
                <th>Shift</th>
                <th>Section</th>
                <th>Output</th>
                <th>Target</th>
                <th>Attainment</th>
                <th>Recorded By</th>
              </tr>
            </thead>
            <tbody>
              {[...production].reverse().map((p, i) => {
                const out = Number(p.output ?? p.output_tonnes ?? 0);
                const tar = Number(p.target_tonnes ?? 450);
                const pct = tar ? Math.round((out / tar) * 100) : 0;

                return (
                  <tr key={p.id || i}>
                    <td>
                      <b className="font-semibold text-xs text-[#14181c]">
                        {p.shift_name || p.day}
                      </b>
                    </td>
                    <td>
                      <span className="font-mono text-xs">{p.section_name || 'Panel A-2'}</span>
                    </td>
                    <td>
                      <b className="text-[#1546d9] font-mono text-xs">
                        {out.toLocaleString()} t
                      </b>
                    </td>
                    <td>
                      <span className="font-mono text-xs text-[#64748b]">
                        {tar.toLocaleString()} t
                      </span>
                    </td>
                    <td>
                      <div className="attainment">
                        <div>
                          <i style={{ width: `${Math.min(100, pct)}%` }} />
                        </div>
                        <span>{pct}%</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs text-[#475569]">
                        {p.recorded_by || 'Supervisor'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
