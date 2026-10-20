import React, { useState } from 'react';
import { Search, Plus, Construction } from 'lucide-react';
import type { EquipmentItem } from '../types/mineguard';

interface EquipmentViewProps {
  equipment: EquipmentItem[];
  onOpenEquipmentModal: () => void;
}

export const EquipmentView: React.FC<EquipmentViewProps> = ({
  equipment,
  onOpenEquipmentModal,
}) => {
  const [query, setQuery] = useState('');

  const filteredEquipment = equipment.filter((x) =>
    `${x.asset_name} ${x.asset_code} ${x.location} ${x.status}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 w-full">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#deded8]">
        <div>
          <div className="font-mono text-[11px] font-bold text-[#f4a900] tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#f4a900]" /> HEAVY MACHINERY & FLEET
          </div>
          <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black text-[#1546d9] uppercase tracking-tight">
            Equipment & Machinery Registry
          </h1>
          <p className="text-sm text-[#64748b] mt-1 max-w-2xl">
            Asset operational status, maintenance cycles, and sub-surface machinery telemetry.
          </p>
        </div>

        <button className="mg-btn primary self-start md:self-auto" onClick={onOpenEquipmentModal}>
          <Plus size={16} /> Register Equipment
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 bg-white border border-[#deded8] rounded-xl px-4 py-2.5 flex-1 max-w-md shadow-sm">
          <Search size={18} className="text-[#64748b]" />
          <input
            className="w-full bg-transparent border-0 outline-none text-xs text-[#14181c] placeholder:text-[#94a3b8]"
            placeholder="Search asset name, code (e.g. CM-04), or panel..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="font-mono text-xs text-[#64748b] font-bold">
          {filteredEquipment.length} REGISTERED ASSETS
        </div>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((x) => (
          <div
            key={x.id}
            className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-sm hover:border-[#1546d9] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Construction size={20} />
                </div>
                <span
                  className={`mg-tag ${
                    x.status === 'Operational'
                      ? 'success'
                      : x.status === 'Down'
                      ? 'high'
                      : 'warning'
                  }`}
                >
                  {x.status}
                </span>
              </div>

              <span className="font-mono text-xs font-bold text-[#f4a900] tracking-wider block">
                {x.asset_code}
              </span>

              <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#14181c] uppercase mt-1">
                {x.asset_name}
              </h3>

              <div className="flex items-center gap-2 mt-2 text-xs text-[#64748b]">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono">{x.location}</span>
              </div>

              {x.notes && (
                <p className="text-xs text-[#64748b] mt-3 line-clamp-2">
                  {x.notes}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-[#f1f0eb] flex items-center justify-between text-xs font-mono text-[#8a94a6] mt-6">
              <span>LAST SERVICE</span>
              <b className="text-[#14181c]">{x.last_service || 'Not recorded'}</b>
            </div>
          </div>
        ))}

        {!filteredEquipment.length && (
          <div className="col-span-full text-center py-16 text-slate-400 font-mono text-xs">
            No equipment assets match your search query.
          </div>
        )}
      </div>
    </div>
  );
};
