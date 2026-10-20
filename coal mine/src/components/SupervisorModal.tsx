import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu } from 'lucide-react';

interface SupervisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedComponent?: { name: string; data: any } | null;
}

export const SupervisorModal: React.FC<SupervisorModalProps> = ({
  isOpen,
  onClose,
  selectedComponent,
}) => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'crane' | 'conveyor' | 'safety'>('fleet');
  const [conveyorRunning, setConveyorRunning] = useState(true);
  const [craneAuto, setCraneAuto] = useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-[#E8E9DF] border-2 border-[#1546D9] rounded-3xl shadow-2xl max-w-4xl w-full p-6 sm:p-8 overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1546D9]/15">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1546D9] text-white flex items-center justify-center shadow-md">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase font-bold text-[#64748B] tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  SUPERVISOR PORTAL // PIT SECTOR ALPHA-7
                </div>
                <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546D9] uppercase tracking-wide">
                  Autonomous Mining Command Console
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#1546D9]/10 hover:bg-[#1546D9] text-[#1546D9] hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Tabs */}
          <div className="flex gap-2 pt-4 pb-2 border-b border-[#1546D9]/10 overflow-x-auto">
            {[
              { id: 'fleet', label: 'Autonomous Fleet (28)' },
              { id: 'crane', label: 'Tower Crane MK-IV' },
              { id: 'conveyor', label: 'Continuous Conveyor' },
              { id: 'safety', label: 'Atmospheric & Gas' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1546D9] text-white shadow-md'
                    : 'bg-white/60 text-[#1A1A1A] hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Body Content */}
          <div className="py-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Inspector Alert if component clicked */}
            {selectedComponent && (
              <div className="bg-[#1546D9]/10 border border-[#1546D9]/30 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#1546D9] uppercase">INSPECTED OBJECT</span>
                  <div className="font-bold text-[#1A1A1A] text-sm">{selectedComponent.name}</div>
                </div>
                <span className="font-mono text-xs bg-white/80 px-3 py-1 rounded-full text-[#1546D9] font-bold">
                  TELEMETRY LIVE
                </span>
              </div>
            )}

            {/* Dark Technical Matrix Console */}
            <div className="bg-[#0B1120] text-slate-100 rounded-2xl p-5 border border-[#1546D9]/40 font-mono text-xs shadow-inner">
              <div className="flex justify-between items-center pb-3 border-b border-white/10 text-slate-400 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2">HOST: ALPHA-CENTRAL-01</span>
                </div>
                <span>LATENCY: 4.2ms | SYNC: 100%</span>
              </div>

              {activeTab === 'fleet' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase">Haul Truck #07 (CAT 797F)</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">Status: Hauling (Nominal)</div>
                    <div className="text-slate-300 text-xs mt-2 space-y-1">
                      <div>Speed: 24 km/h (GPS Path Locked)</div>
                      <div>Payload: 340 Tonnes Run-of-Mine Coal</div>
                      <div>Battery / Fuel: 94% (Hot Swap in 4.2h)</div>
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase">Fleet Collision Bubble</div>
                    <div className="text-xl font-bold text-sky-400 mt-1">Zero Proximity Breaches</div>
                    <div className="text-slate-300 text-xs mt-2 space-y-1">
                      <div>Active Radar Mesh: 28 Units</div>
                      <div>Tire Pressure Equalization: ACTIVE</div>
                      <div>AI Dispatch Queue: 0 sec wait</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'crane' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase">Tower Crane MK-IV Slew</div>
                    <div className="text-xl font-bold text-yellow-400 mt-1">Sweep: -18° to +22°</div>
                    <div className="text-slate-300 text-xs mt-2 space-y-1">
                      <div>Jib Mode: {craneAuto ? 'AI Auto-Coordinated' : 'Manual Lock'}</div>
                      <div>Hoist Cable Travel: 35m Cycle</div>
                      <div>Cargo: 14t Cobalt Coal Crate</div>
                    </div>
                    <button
                      onClick={() => setCraneAuto(!craneAuto)}
                      className="mt-3 px-3 py-1.5 bg-[#F9B318] text-black font-bold rounded-lg text-[11px] cursor-pointer"
                    >
                      {craneAuto ? 'Switch to Manual Hold' : 'Resume AI Slew Routine'}
                    </button>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase">Pendulum Dampener</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">±3.0° Compensated</div>
                    <div className="text-slate-300 text-xs mt-2 space-y-1">
                      <div>Wind Speed: 4.2 kt (Calm)</div>
                      <div>Trolley Torque: 98.4 Nm</div>
                      <div>Emergency Stop Trigger: READY</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'conveyor' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase">Conveyor B-42 Drive</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">3.20 m/s Speed</div>
                    <div className="text-slate-300 text-xs mt-2 space-y-2">
                      <div>Throughput: 1,850 t/h</div>
                      <div>Belt Tension: 98.6% Balanced</div>
                      <div>Tear Detection Infrared: ACTIVE</div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => setConveyorRunning(!conveyorRunning)}
                        className={`px-3 py-1.5 font-bold rounded-lg text-[11px] cursor-pointer ${
                          conveyorRunning ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                        }`}
                      >
                        {conveyorRunning ? 'Pause Conveyor' : 'Start Conveyor'}
                      </button>
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase">Intake Hopper & Scrubber</div>
                    <div className="text-xl font-bold text-sky-400 mt-1">Zero Chute Choke</div>
                    <div className="text-slate-300 text-xs mt-2 space-y-1">
                      <div>Vibrator Motor: Active Continuous</div>
                      <div>Twin Smokestacks: Steam Cleaned</div>
                      <div>Particulate Effluent: 0.02%</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'safety' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase">Sub-Surface Shaft (-320M)</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">Methane: 0.018% SAFE</div>
                    <div className="text-slate-300 text-xs mt-2 space-y-1">
                      <div>DGMS Mandate Threshold: &lt; 0.50%</div>
                      <div>Carbon Monoxide (CO): 2 ppm</div>
                      <div>Oxygen (O2): 20.9% Normal</div>
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase">Ventilation Booster</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">85,200 CFM Active</div>
                    <div className="text-slate-300 text-xs mt-2 space-y-1">
                      <div>Airflow Velocity: 4.8 m/s</div>
                      <div>Automated Flow Reversal: ARMED</div>
                      <div>Underground Workers: 42 Tracked</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#1546D9]/15 flex items-center justify-between">
            <span className="font-mono text-xs text-[#64748B]">
              COALWORKS AI CORE // SIL-3 COMPLIANT
            </span>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-[#1546D9]/30 text-xs font-bold text-[#1546D9] hover:bg-white cursor-pointer"
              >
                Close Console
              </button>
              <button
                onClick={() => {
                  alert('Shift Telemetry Report Exported to MSHA/DGMS Audit Log.');
                  onClose();
                }}
                className="px-5 py-2.5 rounded-full bg-[#1546D9] text-white text-xs font-bold shadow-md hover:bg-[#1037B0] cursor-pointer"
              >
                Export Audit Log
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
