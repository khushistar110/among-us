import React from 'react';
import { ClipboardCheck } from 'lucide-react';

interface PlaceholderViewProps {
  pageName: string;
  notify: (msg: string) => void;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({
  pageName,
  notify,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-6 shadow-sm">
        <ClipboardCheck size={32} />
      </div>

      <div className="font-mono text-xs font-bold text-[#f4a900] tracking-widest uppercase mb-2">
        ENTERPRISE EXPANSION MODULE
      </div>

      <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black text-[#1546d9] uppercase tracking-tight mb-4">
        {pageName} Operations Module
      </h2>

      <p className="text-sm text-[#64748b] max-w-lg mx-auto leading-relaxed mb-8">
        This operations module connects directly with the Flask telemetry API and MySQL
        database backend for automated scheduling, ISO 45001 checklist exports, and ESG audit reports.
      </p>

      <button
        className="mg-btn primary"
        onClick={() => notify(`${pageName} module configured for telemetry sync.`)}
      >
        Sync {pageName} to Roster
      </button>
    </div>
  );
};
