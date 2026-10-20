import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-[#E8E9DF] border-2 border-[#1546D9] rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#1546D9]/10 hover:bg-[#1546D9] text-[#1546D9] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-[#1546D9] tracking-wider block mb-1">
                FIELD EVALUATION
              </span>
              <h3 className="font-['Barlow_Condensed'] text-3xl font-black text-[#1546D9] uppercase tracking-tight mb-2">
                Book a VIP Platform Walkthrough
              </h3>
              <p className="text-sm text-[#64748B] mb-6">
                See how CoalWorks synchronizes autonomous haulers, conveyor tear-sensing, and bio-telemetry on your site in under 14 days.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[11px] font-bold text-[#1546D9] uppercase mb-1">
                    Facility Architecture
                  </label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#1546D9]/20 bg-white text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1546D9]">
                    <option>Open-Cast Surface Pit (Truck & Shovel)</option>
                    <option>Underground Longwall & Continuous Miner</option>
                    <option>Coal Preparation Plant & Rail Terminal</option>
                    <option>Hard Rock & Mineral Extraction</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[11px] font-bold text-[#1546D9] uppercase mb-1">
                      Lead Engineer
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#1546D9]/20 bg-white text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1546D9]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] font-bold text-[#1546D9] uppercase mb-1">
                      Work Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="ops@miningcorp.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#1546D9]/20 bg-white text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1546D9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] font-bold text-[#1546D9] uppercase mb-1">
                    Annual Throughput (Estimate)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 8,000,000 MT/year"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1546D9]/20 bg-white text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1546D9]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1546D9] hover:bg-[#1037B0] text-white font-bold rounded-full text-sm shadow-lg shadow-[#1546D9]/30 mt-4 transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Confirm Field Session →
                </button>
              </form>
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h4 className="font-['Barlow_Condensed'] text-3xl font-black text-[#1546D9] uppercase">
                Walkthrough Scheduled!
              </h4>
              <p className="text-sm text-[#64748B] max-w-xs mx-auto">
                Our Senior Mining Systems Architect will contact you with encrypted conference access within 2 hours.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
