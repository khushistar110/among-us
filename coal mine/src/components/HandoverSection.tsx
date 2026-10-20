import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

export const HandoverSection: React.FC = () => {
  const [signed, setSigned] = useState(false);
  const [utcTime, setUtcTime] = useState('14:00:00 UTC');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        `${String(now.getUTCHours()).padStart(2, '0')}:${String(
          now.getUTCMinutes()
        ).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="shift-handover" className="py-24 border-t border-[#1546D9]/15 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-[#1546D9]/5 border border-[#1546D9]/15 px-3 py-1 rounded-full font-mono text-[11px] font-bold text-[#1546D9] uppercase tracking-wider mb-3">
            <span>WORKFLOW // 03</span>
          </div>
          <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl lg:text-6xl font-black text-[#1546D9] uppercase tracking-tight">
            Seamless Digital Shift Handover Protocol
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mt-3">
            Eliminate miscommunications between surface and underground crews with AI debriefs, automated equipment health checks, and instant sign-offs.
          </p>
        </div>

        {/* 2-Column Split Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Timeline Feed */}
          <div className="bg-[#F6F5F0] border border-[#1546D9]/15 rounded-3xl p-7 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#1546D9]/10 mb-6">
              <span className="font-mono text-xs font-bold text-[#1546D9] uppercase tracking-wider">
                SHIFT 1 → SHIFT 2 CHANGEOVER
              </span>
              <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {utcTime}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start pb-4 border-b border-dashed border-[#1546D9]/15">
                <span className="font-mono text-xs font-bold text-[#1546D9] bg-white px-2 py-1 rounded-md border border-[#1546D9]/15">
                  13:45
                </span>
                <div>
                  <h4 className="font-bold text-sm text-[#1A1A1A]">Haul Road Ramp 4B Graded</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Motor grader smoothed 400m curve. Haul speed restored to 35 km/h for all CAT 797F units.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start pb-4 border-b border-dashed border-[#1546D9]/15">
                <span className="font-mono text-xs font-bold text-[#1546D9] bg-white px-2 py-1 rounded-md border border-[#1546D9]/15">
                  13:20
                </span>
                <div>
                  <h4 className="font-bold text-sm text-[#1A1A1A]">Conveyor B-42 Sump Pump Cleared</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Runoff water drained at discharge chute. Belt velocity nominal at 3.20 m/s.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-mono text-xs font-bold text-[#1546D9] bg-white px-2 py-1 rounded-md border border-[#1546D9]/15">
                  12:55
                </span>
                <div>
                  <h4 className="font-bold text-sm text-[#1A1A1A]">Seismic Node #14 Checked</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Zero shear wave anomaly detected in Portal B. Ceiling integrity confirmed at Class 1.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1546D9]/15 flex items-center justify-between">
              <span className="font-mono text-xs text-[#64748B]">
                Supervisor: M. Vance (PE #4812)
              </span>
              <button
                onClick={() => setSigned(true)}
                className={`px-5 py-2 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  signed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#1546D9] hover:bg-[#1037B0] text-white shadow-md'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{signed ? 'Handover Signed ✓' : 'Sign & Transfer Shift'}</span>
              </button>
            </div>
          </div>

          {/* Autonomous Hot Seat Swap Card */}
          <div className="bg-white border border-[#1546D9]/15 rounded-3xl p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] font-bold text-[#1546D9] tracking-wider uppercase">
                  ZERO-DOWNTIME LOGISTICS
                </span>
                <span className="bg-[#F9B318]/20 text-[#CA8A04] font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  12-MIN BATTERY SWAP
                </span>
              </div>

              <h3 className="font-['Barlow_Condensed'] text-3xl font-black text-[#1546D9] uppercase mb-3">
                Continuous Pit Velocity
              </h3>
              <p className="text-sm text-[#1A1A1A] leading-relaxed mb-6">
                Autonomous haulers dock at the automated battery & charging bay with zero driver downtime, synchronizing telemetry directly into shift handovers without stopping continuous extraction.
              </p>

              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-[#E8E9DF]/60 p-4 rounded-2xl border border-[#1546D9]/10">
                  <div className="font-['Barlow_Condensed'] text-3xl font-black text-[#1546D9]">
                    4.2 Min
                  </div>
                  <div className="font-mono text-[11px] text-[#64748B] mt-1">
                    Average Shift Latency (Saved 52m)
                  </div>
                </div>

                <div className="bg-[#E8E9DF]/60 p-4 rounded-2xl border border-[#1546D9]/10">
                  <div className="font-['Barlow_Condensed'] text-3xl font-black text-[#1546D9]">
                    100%
                  </div>
                  <div className="font-mono text-[11px] text-[#64748B] mt-1">
                    Audit Verification Trail
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1546D9]/10 font-mono text-xs text-[#64748B] flex items-center justify-between">
              <span>LEDGER PROTOCOL:</span>
              <strong className="text-[#1546D9]">CRYPTOGRAPHICALLY VERIFIED</strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
