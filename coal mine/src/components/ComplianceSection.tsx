import React from 'react';
import { FileCheck, Sparkles, Leaf } from 'lucide-react';

export const ComplianceSection: React.FC = () => {
  return (
    <section id="compliance" className="py-24 bg-[#1546D9]/[0.02] border-t border-[#1546D9]/15 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-[#1546D9]/5 border border-[#1546D9]/15 px-3 py-1 rounded-full font-mono text-[11px] font-bold text-[#1546D9] uppercase tracking-wider mb-3">
            <span>GOVERNANCE // 04</span>
          </div>
          <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl lg:text-6xl font-black text-[#1546D9] uppercase tracking-tight">
            Automated Regulatory & ESG Compliance
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mt-3">
            Effortlessly meet DGMS, MSHA, and global ESG environmental guidelines with tamper-proof automated logs.
          </p>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white border border-[#1546D9]/15 rounded-3xl p-7 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#1546D9]/10 text-[#1546D9] flex items-center justify-center mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546D9] uppercase mb-2">
              Statutory DGMS & MSHA Logs
            </h3>
            <p className="text-sm text-[#1A1A1A] leading-relaxed mb-6">
              Automated generation of statutory inspection sheets, daily haul road audits, and pre-shift machinery sign-offs with zero manual paperwork.
            </p>
            <div className="pt-4 border-t border-[#1546D9]/10 font-mono text-xs flex justify-between">
              <span className="text-[#64748B]">Audit Pass Rate:</span>
              <strong className="text-emerald-600 font-bold">100.0% Verified</strong>
            </div>
          </div>

          <div className="bg-[#1546D9] border-2 border-[#1546D9] rounded-3xl p-7 shadow-xl shadow-[#1546D9]/25 text-white transform hover:-translate-y-1 transition-transform duration-200">
            <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center mb-4 backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-white uppercase mb-2 tracking-wide">
              Intelligent Dust Suppression
            </h3>
            <p className="text-sm text-white/90 leading-relaxed mb-6">
              Automated water misting cannons trigger dynamically according to real-time wind anemometers, ambient PM2.5 sensors, and haul truck approach.
            </p>
            <div className="pt-4 border-t border-white/20 font-mono text-xs flex justify-between items-center">
              <span className="text-white/75">Airborne PM10:</span>
              <strong className="text-[#FFDF7A] font-bold bg-white/10 px-2 py-0.5 rounded">-78% Suppression</strong>
            </div>
          </div>

          <div className="bg-white border border-[#1546D9]/15 rounded-3xl p-7 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546D9] uppercase mb-2">
              Scope 1 & 2 Emissions Ledger
            </h3>
            <p className="text-sm text-[#1A1A1A] leading-relaxed mb-6">
              Direct fuel injection telemetry from haul fleets and electrical draw from preparation plant twin scrubbers logged into verified ESG accounting.
            </p>
            <div className="pt-4 border-t border-[#1546D9]/10 font-mono text-xs flex justify-between">
              <span className="text-[#64748B]">Diesel Fuel Draw:</span>
              <strong className="text-[#1546D9] font-bold">-22.4% Optimized</strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
