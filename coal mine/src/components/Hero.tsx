import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { IsometricMine } from './IsometricMine';

interface HeroProps {
  onExplore: () => void;
  onBookDemo: () => void;
  onSelectComponent: (name: string, data: any) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onBookDemo,
  onSelectComponent,
}) => {
  // Live metric counters with realistic simulated micro-telemetry
  const [tonnage, setTonnage] = useState(14.8);
  const [efficiency, setEfficiency] = useState(99.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setEfficiency(+(99.4 + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setTonnage(+(14.8 + (Math.random() * 0.2 - 0.1)).toFixed(1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen pt-28 pb-16 flex items-center bg-[#E8E9DF] overflow-hidden">
      
      {/* =====================================================================
          SUN YELLOW #F9B315 FLOATING AMBIENT SPHERES
          Balanced medium-sized editorial spheres framing the hero section
          ===================================================================== */}
      {/* Left Canvas Spheres (Framing Headline & Metrics) */}
      <div className="absolute top-20 left-[7%] w-8 h-8 rounded-full sun-yellow-dot animate-levitate-1 pointer-events-none select-none z-0" />
      <div className="absolute top-[42%] left-[3%] w-7 h-7 rounded-full sun-yellow-dot animate-levitate-2 pointer-events-none select-none z-0" />
      <div className="absolute top-[64%] left-[20%] w-6 h-6 rounded-full sun-yellow-dot animate-levitate-3 pointer-events-none select-none z-0" />
      <div className="absolute bottom-10 left-[8%] w-7 h-7 rounded-full sun-yellow-dot animate-levitate-1 pointer-events-none select-none z-0" />

      {/* Center Ambient Spheres */}
      <div className="absolute top-20 left-[48%] w-8 h-8 rounded-full sun-yellow-dot animate-levitate-2 pointer-events-none select-none z-0" />
      <div className="absolute bottom-8 left-[45%] w-7 h-7 rounded-full sun-yellow-dot animate-levitate-3 pointer-events-none select-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-20">
        {/* 12-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ===============================================================
              LEFT 6 COLUMNS: HIGH-FASHION EDITORIAL CALLIGRAPHY & METRICS
              =============================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10 relative">
            


            {/* =============================================================
                TILLA TYPOGRAPHY HEADLINE (User Request: Tilla font)
                Clean canvas - sits directly on soft white background #E8E9DF
                ============================================================= */}
            <div className="flex flex-col select-none my-2 leading-[0.84] tracking-tight">
              {/* Top: "COAL" */}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: "'Tilla', 'Tilla Regular', 'Oswald', 'Bebas Neue', 'Barlow Condensed', sans-serif" }}
                className="font-tilla text-7xl sm:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] font-bold text-[#1546D9] uppercase tracking-normal"
              >
                COAL
              </motion.span>

              {/* Bottom: "WORKS" */}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: "'Tilla', 'Tilla Regular', 'Oswald', 'Bebas Neue', 'Barlow Condensed', sans-serif" }}
                className="font-tilla text-7xl sm:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] font-bold text-[#1546D9] uppercase tracking-normal"
              >
                WORKS
              </motion.span>
            </div>

            {/* Solid Black Editorial Accent Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="w-16 h-[3px] bg-[#1A1A1A] my-4 origin-left"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl font-medium text-[#1A1A1A] leading-relaxed max-w-xl mt-4 mb-7"
            >
              Smarter Mining. Safer Work.{' '}
              <span className="font-semibold text-[#1546D9] underline decoration-[#F9B318] decoration-2 underline-offset-4">
                AI & IoT operations
              </span>{' '}
              made simple.
            </motion.p>

            {/* Button Group */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex items-center flex-wrap gap-4 mb-10"
            >
              {/* Primary Filled Cobalt Blue Pill Button */}
              <button
                onClick={onExplore}
                className="group flex items-center gap-2 bg-[#1546D9] hover:bg-[#1037B0] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-lg shadow-[#1546D9]/25 hover:shadow-xl hover:shadow-[#1546D9]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Operations</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary Outline Pill Button */}
              <button
                onClick={onBookDemo}
                className="flex items-center gap-2 bg-transparent hover:bg-[#1546D9]/5 text-[#1546D9] border-1.5 border-[#1546D9] px-7 py-3.5 rounded-full text-sm font-bold hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span>Book Demo</span>
              </button>
            </motion.div>

            {/* Stats Footer: 4-Column Live Counters (Preserved) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="pt-6 border-t border-[#1546D9]/15 grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              <div>
                <div className="font-barlow text-3xl font-black text-[#1546D9] leading-none">
                  {efficiency}%
                </div>
                <div className="font-mono text-[11px] text-[#64748B] uppercase tracking-wider mt-1.5">
                  Autonomous Haul Telemetry
                </div>
              </div>

              <div>
                <div className="font-barlow text-3xl font-black text-[#1546D9] leading-none">
                  0.00
                </div>
                <div className="font-mono text-[11px] text-[#64748B] uppercase tracking-wider mt-1.5">
                  Lost-Time Incidents
                </div>
              </div>

              <div>
                <div className="font-barlow text-3xl font-black text-[#1546D9] leading-none">
                  {tonnage} kt/d
                </div>
                <div className="font-mono text-[11px] text-[#64748B] uppercase tracking-wider mt-1.5">
                  Conveyor Throughput
                </div>
              </div>

              <div>
                <div className="font-barlow text-3xl font-black text-[#1546D9] leading-none flex items-center gap-1">
                  ISO 45001
                </div>
                <div className="font-mono text-[11px] text-[#64748B] uppercase tracking-wider mt-1.5">
                  Safety Standard Certified
                </div>
              </div>
            </motion.div>

          </div>

          {/* ===============================================================
              RIGHT 6 COLUMNS: ANIMATED CARTOON MINE + SURROUNDING SUN-YELLOW SPHERES
              =============================================================== */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            
            {/* Ambient Sun-Yellow Spheres Floating Directly Around the Cartoon Crane Scene */}
            {/* Top of Crane Boom / Cable */}
            <div className="absolute -top-10 left-[20%] w-9 h-9 rounded-full sun-yellow-dot animate-levitate-1 pointer-events-none select-none z-10" />
            {/* Above Center Scene */}
            <div className="absolute -top-8 left-[50%] w-7 h-7 rounded-full sun-yellow-dot animate-levitate-3 pointer-events-none select-none z-10" />
            {/* Upper Right above Factory Smokestacks */}
            <div className="absolute top-[2%] -right-2 sm:right-[-10px] w-8 h-8 rounded-full sun-yellow-dot animate-levitate-2 pointer-events-none select-none z-10" />
            {/* Floating to the left of Crane Road Ramp */}
            <div className="absolute top-[42%] -left-8 sm:left-[-28px] w-8 h-8 rounded-full sun-yellow-dot animate-levitate-1 pointer-events-none select-none z-10" />
            {/* Right side near Plant & Gold Ore */}
            <div className="absolute top-[64%] -right-8 sm:right-[-24px] w-7 h-7 rounded-full sun-yellow-dot animate-levitate-2 pointer-events-none select-none z-10" />
            {/* Below Crane Roadway */}
            <div className="absolute -bottom-6 left-[16%] w-8 h-8 rounded-full sun-yellow-dot animate-levitate-3 pointer-events-none select-none z-10" />
            {/* Bottom Right near Gold Ore & Platform */}
            <div className="absolute -bottom-8 right-[14%] w-7 h-7 rounded-full sun-yellow-dot animate-levitate-1 pointer-events-none select-none z-10" />

            <IsometricMine onSelectComponent={onSelectComponent} />
          </div>

        </div>
      </div>
    </section>
  );
};
