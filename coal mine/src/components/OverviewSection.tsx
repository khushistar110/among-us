import React from 'react';
import { motion } from 'framer-motion';

interface WaveConfig {
  id: string;
  from: string;
  mid: string;
  to: string;
  glow: string;
  bg: string;
  border: string;
  tagColor: string;
  badge: string;
}

const WaveRibbon: React.FC<{
  type: 'blue' | 'amber' | 'purple';
  quote: string;
  tag: string;
}> = ({ type, quote, tag }) => {
  const configs: Record<string, WaveConfig> = {
    blue: {
      id: 'wave-blue',
      from: '#1D4ED8',
      mid: '#3B82F6',
      to: '#60A5FA',
      glow: 'rgba(59, 130, 246, 0.45)',
      bg: 'from-[#06122F] via-[#0A1A44] to-[#06112C]',
      border: 'border-[#3B82F6]/35',
      tagColor: 'text-[#93C5FD]',
      badge: 'CH-01 // 94.2 kHz',
    },
    amber: {
      id: 'wave-amber',
      from: '#D97706',
      mid: '#F59E0B',
      to: '#FBBF24',
      glow: 'rgba(245, 158, 11, 0.45)',
      bg: 'from-[#1A1102] via-[#2B1B04] to-[#170E01]',
      border: 'border-[#F59E0B]/35',
      tagColor: 'text-[#FCD34D]',
      badge: 'ACOUSTIC // 12.8 kHz',
    },
    purple: {
      id: 'wave-purple',
      from: '#7C3AED',
      mid: '#A855F7',
      to: '#C084FC',
      glow: 'rgba(168, 85, 247, 0.45)',
      bg: 'from-[#13072E] via-[#1F0C47] to-[#100526]',
      border: 'border-[#A855F7]/35',
      tagColor: 'text-[#E9D5FF]',
      badge: 'SEISMIC // 0.02 Hz',
    },
  };

  const config = configs[type];

  return (
    <div
      className={`relative h-44 rounded-2xl overflow-hidden bg-gradient-to-br ${config.bg} border ${config.border} p-4 flex flex-col justify-between select-none mb-6 group-hover:border-opacity-70 transition-all`}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 animate-wave-glow"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${config.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Top micro status bar */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[9px] tracking-widest text-white/60">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>ACTIVE OSCILLOSCOPE</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
          {config.badge}
        </span>
      </div>

      {/* Flowing Multi-Strand Sine Ribbon Wave SVG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full animate-wave-pulse"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={config.id} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={config.from} stopOpacity="0.8" />
              <stop offset="50%" stopColor={config.mid} stopOpacity="1" />
              <stop offset="100%" stopColor={config.to} stopOpacity="0.8" />
            </linearGradient>
            <filter id={`glow-${config.id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glowing Primary Wave Strands */}
          <path
            d="M 0,65 C 60,15 100,115 160,65 C 220,15 260,115 320,65"
            fill="none"
            stroke={`url(#${config.id})`}
            strokeWidth="3.2"
            filter={`url(#glow-${config.id})`}
            className="animate-wave-flow"
            strokeDasharray="180"
          />
          <path
            d="M 0,60 C 60,10 100,110 160,60 C 220,10 260,110 320,60"
            fill="none"
            stroke={`url(#${config.id})`}
            strokeWidth="2.2"
            opacity="0.8"
          />
          <path
            d="M 0,55 C 60,5 100,105 160,55 C 220,5 260,105 320,55"
            fill="none"
            stroke={`url(#${config.id})`}
            strokeWidth="1.6"
            opacity="0.55"
          />
          <path
            d="M 0,70 C 60,20 100,120 160,70 C 220,20 260,120 320,70"
            fill="none"
            stroke={`url(#${config.id})`}
            strokeWidth="1.6"
            opacity="0.55"
          />

          {/* Counter-weaving 3D volumetric ribbon mesh strands */}
          <path
            d="M 0,50 C 60,105 100,10 160,55 C 220,105 260,15 320,60"
            fill="none"
            stroke={`url(#${config.id})`}
            strokeWidth="2"
            opacity="0.65"
            strokeDasharray="6 3"
          />
          <path
            d="M 0,55 C 60,110 100,15 160,60 C 220,110 260,20 320,65"
            fill="none"
            stroke={`url(#${config.id})`}
            strokeWidth="1.4"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Center quote context */}
      <div className="relative z-10 px-1 py-1">
        <p className="text-xs sm:text-[13px] font-medium text-white/95 drop-shadow-sm leading-snug">
          {quote}
        </p>
      </div>

      {/* Bottom overlaid micro-tag */}
      <div className="relative z-10 flex items-center justify-between">
        <span className={`font-mono text-[10px] font-bold tracking-wider ${config.tagColor} uppercase`}>
          {tag}
        </span>
        <span className="font-mono text-[9px] text-white/40">60 FPS REALTIME</span>
      </div>
    </div>
  );
};

export const OverviewSection: React.FC = () => {
  const cards = [
    {
      badge: '99.4% UPTIME',
      tag: '— SHIFT MANAGEMENT',
      hook: '01.',
      title: 'SHIFT MANAGEMENT',
      quote: 'Dynamic inspection routes & real-time round verification.',
      paragraphs: [
        'Centrally manage worker attendance, duty schedules, and machinery certifications to automatically distribute field crews across open-cast and underground pit sections.',
        'Equip shift supervisors with dynamic, real-time inspection routes that automatically adjust to active mine conditions, enabling them to assign targeted site checks, monitor worker progress, and verify round completion digitally.',
      ],
      metricLabel: 'Shift Readiness:',
      stat: '100% Digital',
      waveType: 'blue' as const,
      // Blue & White Theme: Royal Cobalt Blue Card
      sleeveBg: 'bg-[#0B1E5C]',
      sleeveBorder: 'border-[#1546D9]/40',
      sleeveTabBg: 'bg-[#0B1E5C] text-[#93C5FD]',
      tabFillClass: 'text-[#0B1E5C]',
      innerCardStyles:
        'bg-gradient-to-br from-[#1546D9] via-[#1037B5] to-[#0A2472] border-[#60A5FA]/35 group-hover:border-[#60A5FA]/80 shadow-[0_14px_30px_rgba(21,70,217,0.28)] group-hover:shadow-[0_28px_54px_rgba(21,70,217,0.55)]',
      hookColor: 'text-white',
      titleColor: 'text-white',
      bodyColor: 'text-white/80',
      dividerColor: 'border-white/15',
      metricLabelColor: 'text-white/60',
      statColor: 'text-[#93C5FD]',
      activeDotClass: 'bg-[#60A5FA] shadow-[0_0_8px_#3B82F6]',
      mutedDotClass: 'bg-white/25',
    },
    {
      badge: '10+ LANGUAGES',
      tag: '— ISSUE & TASK TRACKER',
      hook: '02.',
      title: 'ISSUE & TASK TRACKER',
      quote: 'Voice commands in 10+ regional languages with instant AI dispatch.',
      paragraphs: [
        'Enable operators and field workers to instantly log equipment malfunctions, electrical hazards, or physical obstructions using smart voice commands supporting 10+ Indian regional languages, completely eliminating literacy barriers and manual paperwork in the field.',
        'Leverage an integrated AI engine that instantly analyzes the severity of reported issues, cross-references statutory safety management plans (SMP), and automatically dispatches work orders to the closest qualified technician with clear priority flags.',
      ],
      metricLabel: 'SMP Cross-ref:',
      stat: 'Auto Work Orders',
      waveType: 'amber' as const,
      // Blue & White Theme: Crisp Pure White Card with Cobalt Sleeve
      sleeveBg: 'bg-[#1546D9]',
      sleeveBorder: 'border-[#1546D9]',
      sleeveTabBg: 'bg-[#1546D9] text-white',
      tabFillClass: 'text-[#1546D9]',
      innerCardStyles:
        'bg-gradient-to-br from-white via-[#FAFBFD] to-[#F1F5F9] border-[#1546D9]/25 group-hover:border-[#1546D9]/70 shadow-[0_14px_30px_rgba(15,23,42,0.08)] group-hover:shadow-[0_28px_54px_rgba(21,70,217,0.28)]',
      hookColor: 'text-[#1546D9]',
      titleColor: 'text-[#1A1A1A]',
      bodyColor: 'text-[#475569]',
      dividerColor: 'border-[#1546D9]/15',
      metricLabelColor: 'text-[#64748B]',
      statColor: 'text-[#D97706]',
      activeDotClass: 'bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]',
      mutedDotClass: 'bg-slate-300',
    },
    {
      badge: 'ZERO PAPER',
      tag: '— PAPER-TO-DIGITAL OCR',
      hook: '03.',
      title: 'PAPER-TO-DIGITAL OCR',
      quote: 'Industrial OCR digitizing statutory inspection sheets & shift registers.',
      paragraphs: [
        'Utilize specialized optical character recognition (OCR) models trained on industrial records to capture and digitize physical shift registers, maintenance logs, and statutory inspection sheets directly from mobile photos or desktop scanners.',
        'Convert unstructured, messy paper records into structured digital data fields—accurately extracting machine serial numbers, timestamps, operational metrics, and technician notes without manual data re-entry.',
      ],
      metricLabel: 'Data Extraction:',
      stat: 'Zero Re-entry',
      waveType: 'purple' as const,
      // Blue & White Theme: Royal Cobalt Blue Card
      sleeveBg: 'bg-[#091D54]',
      sleeveBorder: 'border-[#1546D9]/40',
      sleeveTabBg: 'bg-[#091D54] text-[#D8B4FE]',
      tabFillClass: 'text-[#091D54]',
      innerCardStyles:
        'bg-gradient-to-br from-[#1546D9] via-[#0E33A8] to-[#081B4E] border-[#C084FC]/35 group-hover:border-[#C084FC]/80 shadow-[0_14px_30px_rgba(124,58,237,0.28)] group-hover:shadow-[0_28px_54px_rgba(124,58,237,0.55)]',
      hookColor: 'text-white',
      titleColor: 'text-white',
      bodyColor: 'text-white/80',
      dividerColor: 'border-white/15',
      metricLabelColor: 'text-white/60',
      statColor: 'text-[#E9D5FF]',
      activeDotClass: 'bg-[#C084FC] shadow-[0_0_8px_#A855F7]',
      mutedDotClass: 'bg-white/25',
    },
  ];

  return (
    <section id="overview" className="pt-28 pb-32 sm:pb-40 border-t border-[#1546D9]/15 relative scroll-mt-28 sm:scroll-mt-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#1546D9]/5 border border-[#1546D9]/15 px-3 py-1 rounded-full font-mono text-[11px] font-bold text-[#1546D9] uppercase tracking-wider mb-3">
            <span>CORE SUITE // 01</span>
          </div>
          <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl lg:text-6xl font-black text-[#1546D9] uppercase tracking-tight">
            Features of the Website
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] max-w-3xl mt-3 leading-relaxed">
            Explore the core capabilities of CoalWorks—engineered to combine AI automation, connected IoT telemetry, and optical character recognition to build a safer, more productive mining ecosystem.
          </p>
        </div>

        {/* Feature Cards Grid: 3 Interactive "Card Bookmark" Components */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 pt-4 pb-8 items-stretch">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.15 }}
              className="relative group cursor-pointer pt-11 h-full flex flex-col"
            >
              {/* Outer Bookmark Sleeve (Fixed backdrop folder with top-right tab notch) */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Top-Right Elevated Bookmark Tab */}
                <div
                  className={`absolute top-0 right-0 h-11 w-[58%] rounded-t-[20px] border-t border-r border-l ${card.sleeveBorder} ${card.sleeveTabBg} flex items-center justify-end pr-5 shadow-sm z-0`}
                >
                  <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
                    — {card.badge}
                  </span>
                </div>

                {/* Concave fillet curve connecting left shoulder to the tab */}
                <div className="absolute top-[20px] right-[58%] w-6 h-6 pointer-events-none">
                  <svg className={`w-full h-full ${card.tabFillClass}`} viewBox="0 0 24 24">
                    <path d="M0,24 A24,24 0 0,0 24,0 L24,24 Z" fill="currentColor" />
                  </svg>
                </div>

                {/* Main Sleeve Folder Body (Sits from top-11 to bottom-0) */}
                <div
                  className={`absolute inset-x-0 top-11 bottom-0 rounded-[26px] border ${card.sleeveBorder} ${card.sleeveBg} shadow-md`}
                />

                {/* Bottom Asymmetric Bookmark Notch (Revealed on hover) */}
                <div
                  className={`absolute -bottom-1 right-3 h-3 w-16 rounded-b-md ${card.sleeveBg} border-b border-r border-l ${card.sleeveBorder} opacity-80`}
                />
              </div>

              {/* Liftable Inner Card (Physically slides UP by 18px on hover) */}
              <div
                className={`relative mx-1.5 h-full rounded-[22px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[18px] will-change-transform z-10 border ${card.innerCardStyles}`}
              >
                <div>
                  {/* Wave Ribbon Container */}
                  <WaveRibbon type={card.waveType} quote={card.quote} tag={card.tag} />

                  {/* Main Hook Headline */}
                  <div className="mb-1">
                    <h4 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${card.hookColor}`}>
                      {card.hook}
                    </h4>
                  </div>

                  {/* Sub-headline / Title */}
                  <div className="mb-3">
                    <h3 className={`font-['Oswald'] text-xl sm:text-2xl font-bold uppercase tracking-wide leading-tight ${card.titleColor}`}>
                      {card.title}
                    </h3>
                  </div>

                  {/* Body Description Paragraphs */}
                  <div className={`space-y-3 mb-6 text-[13px] sm:text-sm leading-relaxed ${card.bodyColor}`}>
                    {card.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className={`pt-4 border-t ${card.dividerColor} flex items-center justify-between font-mono text-xs mt-auto`}>
                  <div className="flex items-center gap-1.5">
                    <span className={card.metricLabelColor}>{card.metricLabel}</span>
                    <strong className={`font-bold ${card.statColor}`}>{card.stat}</strong>
                  </div>

                  {/* 3 Indicator Dots */}
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${card.activeDotClass}`} />
                    <span className={`w-2 h-2 rounded-full ${card.mutedDotClass}`} />
                    <span className={`w-2 h-2 rounded-full ${card.mutedDotClass}`} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
