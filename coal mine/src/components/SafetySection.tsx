import React from 'react';
import { Eye, Wind, Radio } from 'lucide-react';

export const SafetySection: React.FC = () => {
  return (
    <section id="safety-tech" className="py-24 bg-[#1546D9]/[0.02] border-t border-[#1546D9]/15 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-[#F9B318]/15 border border-[#F9B318]/30 px-3 py-1 rounded-full font-mono text-[11px] font-bold text-[#CA8A04] uppercase tracking-wider mb-3">
            <span>ZERO HARM // 02</span>
          </div>
          <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl lg:text-6xl font-black text-[#1546D9] uppercase tracking-tight">
            Next-Gen Safety Tech & Bio-Sensing IoT
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mt-3">
            Real-time wearable telemetry, sub-surface gas analysis, and computer-vision PPE compliance protecting every miner on site.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Pure Vector Smart Helmet Graphic */}
          <div className="lg:col-span-5 bg-white border border-[#1546D9]/15 rounded-3xl p-8 shadow-md flex flex-col items-center text-center">
            <div className="w-48 h-48 relative my-2 flex items-center justify-center">
              {/* Pure SVG 2.5D Cartoon Safety Helmet */}
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                {/* Yellow Hardhat Dome */}
                <ellipse cx="100" cy="115" rx="75" ry="40" fill="#CA8A04" />
                <path
                  d="M25,115 C25,60 55,30 100,30 C145,30 175,60 175,115 C175,125 155,130 100,130 C45,130 25,125 25,115 Z"
                  fill="#FACC15"
                />
                {/* Dome Highlight */}
                <path
                  d="M45,100 C45,65 65,45 100,45 C115,45 125,50 135,60 C105,55 65,75 55,105 Z"
                  fill="#FEF08A"
                />
                {/* Ridge Crest */}
                <rect x="94" y="30" width="12" height="75" rx="6" fill="#EAB308" />
                {/* Headlamp Housing in Slate Gray */}
                <rect x="82" y="95" width="36" height="26" rx="6" fill="#334155" />
                {/* Glowing Amber Lamp */}
                <circle cx="100" cy="108" r="10" fill="#F9B318" />
                <circle cx="100" cy="108" r="6" fill="#FFFBEB" />
                {/* Blue Smart IoT Antenna */}
                <path d="M140,55 L155,30" stroke="#1546D9" strokeWidth="4" strokeLinecap="round" />
                <circle cx="155" cy="30" r="4" fill="#38BDF8" className="animate-ping" />
              </svg>
            </div>

            <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546D9] uppercase mt-2">
              Apex-1 IoT Smart Hardhat
            </h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-xs leading-relaxed">
              Equipped with 4-gas atmospheric sniffing, fatigue eye-tracking, and ultra-wideband collision transponders.
            </p>

            <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-6 border-t border-[#1546D9]/10 font-mono text-xs">
              <div className="bg-[#E8E9DF]/60 p-2.5 rounded-xl text-left">
                <span className="text-[#64748B] text-[10px] block">METHANE SNIFFER</span>
                <strong className="text-emerald-600 font-bold">0.00% SAFE</strong>
              </div>
              <div className="bg-[#E8E9DF]/60 p-2.5 rounded-xl text-left">
                <span className="text-[#64748B] text-[10px] block">COLLISION BUBBLE</span>
                <strong className="text-[#1546D9] font-bold">15M RADIUS</strong>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Safety Technology Pillars */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="bg-white border border-[#1546D9]/15 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-['Barlow_Condensed'] text-xl font-black text-[#1546D9] uppercase flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#1546D9]" />
                  Computer Vision PPE Verification
                </h4>
                <span className="font-mono text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  ACTIVE AI CAMERA
                </span>
              </div>
              <p className="text-sm text-[#1A1A1A] leading-relaxed">
                Optical gate turnstiles verify high-visibility reflective striping, chin-straps, respirators, and active gas transponders before shaft descent is unlocked.
              </p>
            </div>

            <div className="bg-white border border-[#1546D9]/15 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-['Barlow_Condensed'] text-xl font-black text-[#1546D9] uppercase flex items-center gap-2">
                  <Radio className="w-5 h-5 text-[#1546D9]" />
                  Heavy Equipment Proximity Radar
                </h4>
                <span className="font-mono text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                  UWB MESH
                </span>
              </div>
              <p className="text-sm text-[#1A1A1A] leading-relaxed">
                Autonomous haulers instantly throttle down to 0 km/h if an underground crew member’s beacon is detected within the 15m danger perimeter.
              </p>
            </div>

            <div className="bg-white border border-[#1546D9]/15 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-['Barlow_Condensed'] text-xl font-black text-[#1546D9] uppercase flex items-center gap-2">
                  <Wind className="w-5 h-5 text-[#1546D9]" />
                  Automated Gas Evacuation Protocol
                </h4>
                <span className="font-mono text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                  DGMS STANDARD
                </span>
              </div>
              <p className="text-sm text-[#1A1A1A] leading-relaxed">
                If sub-surface CH4 breaches 0.50%, ventilation booster shafts automatically reverse airflow in 400ms, routing gas away from active work faces.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
