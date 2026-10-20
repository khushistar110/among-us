import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IsometricMineProps {
  onSelectComponent?: (name: string, data: any) => void;
}

export const IsometricMine: React.FC<IsometricMineProps> = ({ onSelectComponent }) => {
  const [activeTooltip, setActiveTooltip] = useState<{
    title: string;
    tag: string;
    stat: string;
    sub: string;
    x: number;
    y: number;
  } | null>(null);

  const handleHover = (
    name: string,
    tag: string,
    stat: string,
    sub: string,
    clientX: number,
    clientY: number
  ) => {
    setActiveTooltip({ title: name, tag, stat, sub, x: clientX, y: clientY });
  };

  const handleLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none py-6">
      {/* SVG Container - Pure Vector 2.5D Isometric Cartoon Scene + Iconic Backdrop */}
      <svg
        viewBox="0 0 920 740"
        className="w-full h-auto max-w-[1040px] scale-130 sm:scale-135 lg:scale-140 xl:scale-145 lg:translate-x-3 origin-center overflow-visible drop-shadow-[0_25px_35px_rgba(21,70,217,0.08)] transition-transform duration-300"
        style={{ transformOrigin: 'center center' }}
      >
        <defs>
          {/* Large Sun-Yellow Disc Gradient */}
          <radialGradient id="sunYellowDisc" cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#FFDE6A" />
            <stop offset="65%" stopColor="#F9B318" />
            <stop offset="100%" stopColor="#D99304" />
          </radialGradient>

          {/* Staggered Cobalt Blue 3D Bars Gradients */}
          <linearGradient id="cobaltTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A5DF3" />
            <stop offset="100%" stopColor="#1546D9" />
          </linearGradient>
          <linearGradient id="cobaltLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1546D9" />
            <stop offset="100%" stopColor="#0E34A8" />
          </linearGradient>
          <linearGradient id="cobaltRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1037B0" />
            <stop offset="100%" stopColor="#09257A" />
          </linearGradient>

          {/* Platform Sand / Clay Gradients (IconScout inspired) */}
          <linearGradient id="clayTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5D8B8" />
            <stop offset="100%" stopColor="#E8C39E" />
          </linearGradient>
          <linearGradient id="clayLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A782" />
            <stop offset="100%" stopColor="#BA8C67" />
          </linearGradient>
          <linearGradient id="clayRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BF8F6B" />
            <stop offset="100%" stopColor="#9C6F4F" />
          </linearGradient>

          {/* Road Asphalt Gradients */}
          <linearGradient id="roadTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="roadSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Factory Walls Gradients */}
          <linearGradient id="factoryWallTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="factoryWallLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="factoryWallRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Safety Yellow Machinery Gradients */}
          <linearGradient id="yellowTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FED468" />
            <stop offset="100%" stopColor="#FACC15" />
          </linearGradient>
          <linearGradient id="yellowLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
          <linearGradient id="yellowRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#A16207" />
          </linearGradient>

          {/* Amber Interior Tunnel Glow */}
          <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F9B318" stopOpacity="1" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>

          {/* Gold Ingot Shine */}
          <linearGradient id="goldBarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
        </defs>


        {/* =================================================================
            LAYER 1: MAIN ISOMETRIC CLAY PLATFORM (Bleeds into background)
            ================================================================= */}
        <g id="isometric-platform" transform="translate(40, 20)">
          {/* Ambient Platform Shadow */}
          <polygon
            points="230,470 540,310 820,470 510,630"
            fill="rgba(21, 70, 217, 0.05)"
          />

          {/* Stepped Terracotta Ground Slab */}
          <g transform="translate(40, 20)">
            <polygon
              points="480,240 760,390 480,545 200,395"
              fill="url(#clayTop)"
              stroke="#D4A782"
              strokeWidth="1.5"
            />
            <polygon
              points="200,395 480,545 480,575 200,425"
              fill="url(#clayLeft)"
            />
            <polygon
              points="480,545 760,390 760,420 480,575"
              fill="url(#clayRight)"
            />
          </g>

          {/* Cast Shadows on Platform */}
          <ellipse cx="360" cy="475" rx="36" ry="12" fill="rgba(186, 140, 103, 0.6)" />
          <polygon points="500,430 690,340 730,420 540,520" fill="rgba(186, 140, 103, 0.45)" />

          {/* Cute Low-Poly Green Saguaro Cactus (from IconScout reference!) */}
          <g id="saguaro-cactus" transform="translate(345, 405)">
            <rect x="18" y="20" width="12" height="60" rx="6" fill="#65A30D" />
            <rect x="20" y="22" width="4" height="56" rx="2" fill="#84CC16" />
            <path d="M8,38 L18,38 L18,48 L8,48 Z" fill="#65A30D" />
            <rect x="4" y="24" width="8" height="24" rx="4" fill="#65A30D" />
            <rect x="6" y="26" width="3" height="20" rx="1.5" fill="#84CC16" />
            <path d="M26,46 L38,46 L38,56 L26,56 Z" fill="#4D7C0F" />
            <rect x="34" y="34" width="8" height="22" rx="4" fill="#4D7C0F" />
          </g>
        </g>

        {/* =================================================================
            LAYER 2: HAUL ROAD RAMP & TUNNEL (Left Side)
            ================================================================= */}
        <g id="haul-road-ramp" transform="translate(40, 20)">
          <polygon
            points="120,380 340,270 420,315 200,425"
            fill="url(#roadTop)"
            stroke="#475569"
            strokeWidth="1.5"
          />
          <polygon
            points="120,380 200,425 200,455 120,410"
            fill="url(#roadSide)"
          />

          <line x1="160" y1="400" x2="380" y2="292" stroke="#FACC15" strokeWidth="2.5" strokeDasharray="8 6" />
        </g>

        {/* =================================================================
            CARTOONISH MINE CRANE (Mobile Carrier on Haul Road Ramp)
            ================================================================= */}
        <g id="cartoon-mine-crane" className="cursor-pointer" transform="translate(40, 20)"
          onMouseEnter={() => handleHover("Cartoon Mobile Mine Crane", "MOBILE HAUL", "Active Ore Lift Routine", "Payload: 16t Raw Ore Bucket", 310, 350)}
          onMouseLeave={handleLeave}
          onClick={() => onSelectComponent?.('Cartoon Mobile Mine Crane', { type: 'Mobile Road Crane', slew: '-10° to +20° Auto-Slew', cargo: '16t Ore Bucket', status: 'Optimal' })}
        >
          {/* Ground Contact Shadow on Asphalt Road Surface */}
          <ellipse cx="270" cy="372" rx="52" ry="20" fill="rgba(15, 23, 42, 0.55)" />

          {/* Heavy Cartoon Mobile Carrier Chassis on the Road */}
          <g id="crane-mobile-carrier">
            {/* 4 Chunky Cartoon Road Wheels */}
            {/* Rear-Left Wheel */}
            <g transform="translate(225, 375)">
              <ellipse cx="0" cy="0" rx="11" ry="15" fill="#0F172A" stroke="#334155" strokeWidth="2" />
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#FACC15" />
              <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
            </g>
            {/* Front-Left Wheel */}
            <g transform="translate(295, 340)">
              <ellipse cx="0" cy="0" rx="11" ry="15" fill="#0F172A" stroke="#334155" strokeWidth="2" />
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#FACC15" />
              <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
            </g>
            {/* Rear-Right Wheel (Partially hidden) */}
            <g transform="translate(245, 358)">
              <ellipse cx="0" cy="0" rx="9" ry="13" fill="#0F172A" />
              <ellipse cx="0" cy="0" rx="4.5" ry="7" fill="#EAB308" />
            </g>
            {/* Front-Right Wheel (Partially hidden) */}
            <g transform="translate(315, 323)">
              <ellipse cx="0" cy="0" rx="9" ry="13" fill="#0F172A" />
              <ellipse cx="0" cy="0" rx="4.5" ry="7" fill="#EAB308" />
            </g>

            {/* Heavy Isometric Carrier Deck */}
            <polygon
              points="215,364 285,324 325,344 255,384"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="2"
            />
            <polygon
              points="215,364 255,384 255,394 215,374"
              fill="#0F172A"
            />
            <polygon
              points="255,384 325,344 325,354 255,394"
              fill="#334155"
            />

            {/* Hazard Caution Chevron Stripes on Front & Rear Bumpers */}
            <g stroke="#FACC15" strokeWidth="3" strokeLinecap="round">
              <line x1="222" y1="367" x2="230" y2="373" />
              <line x1="232" y1="362" x2="240" y2="368" />
              <line x1="242" y1="357" x2="250" y2="363" />
              <line x1="262" y1="388" x2="272" y2="382" />
              <line x1="278" y1="379" x2="288" y2="373" />
              <line x1="294" y1="370" x2="304" y2="364" />
            </g>

            {/* Extended Hydraulic Stabilizer Outriggers on Asphalt */}
            {/* Left Outrigger Pad */}
            <line x1="230" y1="380" x2="215" y2="395" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <polygon points="208,393 222,393 218,398 204,398" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
            {/* Right Outrigger Pad */}
            <line x1="295" y1="345" x2="310" y2="360" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <polygon points="305,358 319,358 315,363 301,363" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
          </g>

          {/* Chunky Stationary Turntable Base on the Carrier Deck */}
          <g id="cartoon-crane-base" transform="translate(270, 345)">
            {/* Turntable Base Foundation Cylinder */}
            <ellipse cx="0" cy="12" rx="30" ry="12" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
            <polygon points="-30,12 30,12 30,20 -30,20" fill="#0F172A" />
            <ellipse cx="0" cy="20" rx="30" ry="12" fill="#020617" />

            {/* Heavy Hazard Stripe Collar */}
            <ellipse cx="0" cy="8" rx="25" ry="10" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
            <path d="M-18,6 L-12,10 M-8,4 L-2,11 M4,3 L10,10 M16,4 L22,8" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />

            {/* Upper Golden Turntable Gear & Mechanical Chrome Bolts */}
            <ellipse cx="0" cy="4" rx="17" ry="7" fill="#EAB308" stroke="#A16207" strokeWidth="1.5" />
            <circle cx="-11" cy="4" r="2.5" fill="#F8FAFC" stroke="#475569" strokeWidth="1" />
            <circle cx="11" cy="4" r="2.5" fill="#F8FAFC" stroke="#475569" strokeWidth="1" />
            <circle cx="0" cy="8" r="2.5" fill="#F8FAFC" stroke="#475569" strokeWidth="1" />
            <circle cx="0" cy="0" r="2.5" fill="#F8FAFC" stroke="#475569" strokeWidth="1" />

            {/* Central Heavy Pivot Column with Cobalt Blue Ring */}
            <rect x="-10" y="-18" width="20" height="22" rx="6" fill="#F9B318" stroke="#D97706" strokeWidth="2" />
            <rect x="-12" y="-10" width="24" height="7" rx="2.5" fill="#1546D9" stroke="#1E40AF" strokeWidth="1.5" />
            <ellipse cx="0" cy="-18" rx="10" ry="4.5" fill="#FDE047" />
          </g>

          {/* Slewing Upper Structure (Cabin + Boom Arm + Pulley + Ore Bucket) */}
          <g transform="translate(270, 327)">
            <g id="cartoon-crane-slew-assembly" className="cartoon-crane-arm-animated">
              
              {/* Chubby Operator Cabin (Behind the pivot) */}
              <g transform="translate(-56, -42)">
                {/* Rear Counterweight Block with Bold Hazard Diagonal Stripes */}
                <g transform="translate(-18, 14)">
                  <rect x="0" y="0" width="22" height="24" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                  <line x1="3" y1="4" x2="19" y2="20" stroke="#FACC15" strokeWidth="3" />
                  <line x1="3" y1="12" x2="15" y2="24" stroke="#FACC15" strokeWidth="3" />
                  <line x1="9" y1="2" x2="21" y2="14" stroke="#FACC15" strokeWidth="3" />
                </g>

                {/* Cartoon Exhaust Pipe & Animated Smoke Puffs */}
                <g transform="translate(-12, 6)">
                  <path d="M0,8 L-6,8 L-6,-8 L-2,-8" fill="none" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="-2" cy="-14" r="3.5" fill="#E2E8F0" opacity="0.75" className="animate-cartoon-puff" />
                  <circle cx="-4" cy="-20" r="5" fill="#CBD5E1" opacity="0.6" className="animate-cartoon-puff-delay" />
                </g>

                {/* Main Cabin Body with Rounded Corners */}
                <rect x="0" y="0" width="46" height="40" rx="12" fill="#EAB308" stroke="#CA8A04" strokeWidth="2.5" />
                <rect x="3" y="3" width="40" height="16" rx="8" fill="#FACC15" />
                <line x1="8" y1="38" x2="38" y2="38" stroke="#A16207" strokeWidth="2" strokeLinecap="round" />

                {/* Panoramic Cartoon Glass Windshield with Signature Glare Glints */}
                <rect x="20" y="6" width="22" height="22" rx="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
                <path d="M24,9 L32,9 L27,24 L22,24 Z" fill="#BAE6FD" opacity="0.9" />
                <circle cx="36" cy="11" r="2" fill="#FFFFFF" opacity="0.95" />

                {/* Friendly Operator Silhouette with Yellow Hardhat */}
                <circle cx="31" cy="19" r="4.2" fill="#0F172A" />
                <ellipse cx="31" cy="17" rx="5" ry="3" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />

                {/* Cartoon Headlight */}
                <circle cx="44" cy="28" r="4" fill="#FDE047" stroke="#EAB308" strokeWidth="1.5" />
                <circle cx="44" cy="28" r="2" fill="#FFFFFF" />

                {/* Blinking Red Safety Siren Beacon on Roof */}
                <ellipse cx="16" cy="-2" rx="6" ry="2.5" fill="#334155" />
                <circle cx="16" cy="-9" r="7" fill="#EF4444" opacity="0.3" className="animate-ping" />
                <rect x="12" y="-9" width="8" height="9" rx="4" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
                <ellipse cx="16" cy="-9" rx="3.5" ry="1.8" fill="#FCA5A5" />
              </g>

              {/* Robust Curved Cartoon Boom Arm (Sun Yellow with Cobalt Accents) */}
              <g id="cartoon-boom-arm">
                {/* Main Curved Thick Boom Arch */}
                <path d="M0,-8 C26,-22 55,-54 110,-92" stroke="#CA8A04" strokeWidth="20" strokeLinecap="round" fill="none" />
                <path d="M0,-8 C26,-22 55,-54 110,-92" stroke="#F9B318" strokeWidth="16" strokeLinecap="round" fill="none" />
                <path d="M0,-8 C26,-22 55,-54 110,-92" stroke="#FDE047" strokeWidth="8" strokeLinecap="round" fill="none" />

                {/* Large Cartoon Lightening Cutouts with Cobalt Blue Rings */}
                <g transform="translate(32, -26)">
                  <circle cx="0" cy="0" r="6.5" fill="#1546D9" stroke="#1E40AF" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="3.2" fill="#0F172A" />
                  <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                </g>
                <g transform="translate(68, -58)">
                  <circle cx="0" cy="0" r="6.5" fill="#1546D9" stroke="#1E40AF" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="3.2" fill="#0F172A" />
                  <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                </g>

                {/* Shiny Hydraulic Ram Cylinder Piston */}
                <line x1="10" y1="2" x2="56" y2="-40" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
                <line x1="10" y1="2" x2="42" y2="-26" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
                <circle cx="10" cy="2" r="4.5" fill="#1546D9" />
                <circle cx="56" cy="-40" r="4.5" fill="#1546D9" />

                {/* Oversized Giant Cartoon Pulley Sheave Wheel at Apex (x: 110, y: -92) */}
                <g transform="translate(110, -92)">
                  <circle cx="0" cy="0" r="17" fill="#0F172A" stroke="#FACC15" strokeWidth="3.5" />
                  <circle cx="0" cy="0" r="10" fill="#F9B318" stroke="#CA8A04" strokeWidth="1.5" />
                  {/* Pulley Cutouts */}
                  <circle cx="-5" cy="-5" r="2.2" fill="#0F172A" />
                  <circle cx="5" cy="-5" r="2.2" fill="#0F172A" />
                  <circle cx="-5" cy="5" r="2.2" fill="#0F172A" />
                  <circle cx="5" cy="5" r="2.2" fill="#0F172A" />
                  <circle cx="0" cy="0" r="4" fill="#1546D9" stroke="#FFFFFF" strokeWidth="1" />

                  {/* Hoist Cable Assembly (Smooth vertical bobbing) */}
                  <g id="cartoon-hoist-assembly" className="cartoon-crane-hoist-animated">
                    {/* Braided Cable */}
                    <line x1="0" y1="14" x2="0" y2="52" stroke="#0F172A" strokeWidth="3" strokeDasharray="4 2" />

                    {/* Heavy Cartoon Hook & Swivel Block */}
                    <g transform="translate(0, 54)">
                      <rect x="-8" y="0" width="16" height="14" rx="4" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
                      <circle cx="0" cy="7" r="3" fill="#1546D9" />
                      {/* Chunky C-Shaped Cartoon Hook */}
                      <path
                        d="M0,14 C-3.5,19 -3.5,27 1.5,29 C7,27 5.5,21 1.5,21"
                        stroke="#1E293B"
                        strokeWidth="4.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <circle cx="1.5" cy="21" r="2" fill="#E2E8F0" />

                      {/* Suspended Cartoon Mining Ore Bucket with Reactive Pendulum Sway */}
                      <g id="cartoon-ore-bucket" className="cartoon-bucket-animated" transform="translate(0, 20)">
                        {/* Hanging Chains */}
                        <line x1="0" y1="0" x2="-16" y2="14" stroke="#64748B" strokeWidth="2.2" />
                        <line x1="0" y1="0" x2="16" y2="14" stroke="#64748B" strokeWidth="2.2" />

                        {/* Chubby Cobalt Blue Bucket Container */}
                        <g transform="translate(-19, 14)">
                          {/* Bucket Body with Rounded Lip */}
                          <path
                            d="M3,4 L35,4 L31,28 C30,31 27,33 23,33 L15,33 C11,33 8,31 7,28 Z"
                            fill="#1546D9"
                            stroke="#1E40AF"
                            strokeWidth="2"
                          />
                          <path d="M3,4 L35,4 L31,10 L7,10 Z" fill="#2563EB" />
                          <ellipse cx="19" cy="4" rx="16" ry="4.5" fill="#1E3A8A" stroke="#1546D9" strokeWidth="1.5" />

                          {/* Raw Coal & Sparkling Gold Nuggets inside Bucket */}
                          <path d="M4,4 Q19,-6 34,4 Z" fill="#0F172A" />
                          <circle cx="11" cy="2" r="3.8" fill="#1E293B" />
                          <circle cx="19" cy="-1" r="4.2" fill="#334155" />
                          <circle cx="27" cy="2" r="3.5" fill="#0F172A" />
                          <circle cx="15" cy="2" r="2.5" fill="#475569" />
                          
                          {/* Gold Ore Sparkles */}
                          <polygon points="13,0 15,3 18,3 15,5 16,8 13,6 10,8 11,5 8,3 11,3" fill="#FACC15" className="animate-glimmer" />
                          <polygon points="23,-2 25,1 28,1 25,3 26,6 23,4 20,6 21,3 18,1 21,1" fill="#FEF08A" className="animate-glimmer" />

                          {/* "CW" Micro Brand Tag on Bucket */}
                          <text x="12" y="23" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">CW</text>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>

            </g>
          </g>
        </g>

        {/* =================================================================
            LAYER 4: DIAGONAL CONVEYOR BELT & HOPPER
            ================================================================= */}
        <g id="diagonal-conveyor" className="cursor-pointer" transform="translate(40, 20)"
          onMouseEnter={() => handleHover("Continuous Conveyor B-42", "CONVEYOR AI", "Speed: 3.20 m/s • 1,850 t/h", "Belt Tension: 98.6% Balanced", 480, 320)}
          onMouseLeave={handleLeave}
        >
          <g stroke="#64748B" strokeWidth="2.5" fill="none">
            <line x1="390" y1="360" x2="390" y2="445" />
            <line x1="435" y1="335" x2="435" y2="420" />
            <line x1="390" y1="375" x2="435" y2="420" />
            <line x1="435" y1="350" x2="390" y2="395" />
          </g>

          <g>
            <polygon
              points="335,405 480,320 535,350 390,435"
              fill="#1E293B"
            />
            <polygon
              points="335,405 390,435 390,443 335,413"
              fill="#0F172A"
            />

            <line
              x1="345" y1="410"
              x2="525" y2="335"
              stroke="#334155"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <line
              x1="350" y1="410"
              x2="520" y2="338"
              stroke="#FACC15"
              strokeWidth="4"
              strokeDasharray="6 14"
              className="animate-conveyor-roll"
              opacity="0.85"
            />

            <g>
              <circle cx="365" cy="402" r="5" fill="#0F172A">
                <animate attributeName="cx" values="350; 510" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="cy" values="410; 338" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0; 1; 1; 0" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="410" cy="380" r="6" fill="#1E293B">
                <animate attributeName="cx" values="350; 510" dur="1.8s" begin="0.5s" repeatCount="indefinite" />
                <animate attributeName="cy" values="410; 338" dur="1.8s" begin="0.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0; 1; 1; 0" dur="1.8s" begin="0.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="455" cy="360" r="5" fill="#0F172A">
                <animate attributeName="cx" values="350; 510" dur="1.8s" begin="1.1s" repeatCount="indefinite" />
                <animate attributeName="cy" values="410; 338" dur="1.8s" begin="1.1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0; 1; 1; 0" dur="1.8s" begin="1.1s" repeatCount="indefinite" />
              </circle>
              <circle cx="430" cy="370" r="3.5" fill="#FACC15">
                <animate attributeName="cx" values="350; 510" dur="1.8s" begin="0.8s" repeatCount="indefinite" />
                <animate attributeName="cy" values="410; 338" dur="1.8s" begin="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0; 1; 1; 0" dur="1.8s" begin="0.8s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>

          <g transform="translate(315, 360)">
            <polygon points="25,5 50,-10 75,5 50,20" fill="url(#yellowTop)" />
            <polygon points="25,5 50,20 50,45 25,30" fill="url(#yellowLeft)" />
            <polygon points="50,20 75,5 75,30 50,45" fill="url(#yellowRight)" />
            <polygon points="35,6 50,1 65,6 50,14" fill="#854D0E" />
          </g>
        </g>

        {/* =================================================================
            LAYER 5: PROCESSING FACTORY & TWIN STRIPED SMOKESTACKS
            ================================================================= */}
        <g id="processing-factory" className="cursor-pointer" transform="translate(40, 20)"
          onMouseEnter={() => handleHover("Preparation Plant #1", "PREPARATION PLANT", "Particulate Filter: 99.8%", "Scrubbers: Steam Purge Active", 660, 260)}
          onMouseLeave={handleLeave}
        >
          <g transform="translate(490, 220)">
            <polygon points="90,40 180,-10 270,40 180,90" fill="url(#factoryWallTop)" />
            <polygon points="90,40 180,90 180,220 90,170" fill="url(#factoryWallLeft)" />
            <polygon points="180,90 270,40 270,170 180,220" fill="url(#factoryWallRight)" />

            <polygon points="110,95 125,103 125,130 110,122" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
            <polygon points="140,111 155,119 155,146 140,138" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />

            <g transform="translate(130, -50)">
              <rect x="0" y="0" width="34" height="95" rx="17" fill="#E2E8F0" />
              <rect x="0" y="24" width="34" height="15" fill="#EF4444" />
              <rect x="0" y="54" width="34" height="15" fill="#EF4444" />
              <ellipse cx="17" cy="4" rx="17" ry="7" fill="#334155" />
              <ellipse cx="17" cy="4" rx="12" ry="4" fill="#0F172A" />

              <circle cx="17" cy="-10" r="12" fill="#FFFFFF" opacity="0.8" className="animate-smoke-1" />
              <circle cx="24" cy="-22" r="16" fill="#F1F5F9" opacity="0.6" className="animate-smoke-2" />
            </g>

            <g transform="translate(180, -25)">
              <rect x="0" y="0" width="36" height="105" rx="18" fill="#F8FAFC" />
              <rect x="0" y="28" width="36" height="16" fill="#EF4444" />
              <rect x="0" y="62" width="36" height="16" fill="#EF4444" />
              <ellipse cx="18" cy="4" rx="18" ry="8" fill="#475569" />
              <ellipse cx="18" cy="4" rx="13" ry="5" fill="#0F172A" />

              <circle cx="18" cy="-12" r="14" fill="#FFFFFF" opacity="0.8" className="animate-smoke-2" />
              <circle cx="12" cy="-30" r="18" fill="#F8FAFC" opacity="0.5" className="animate-smoke-3" />
            </g>
          </g>

          <g id="gold-ingots" transform="translate(690, 485)" className="drop-shadow-lg cursor-pointer"
            onMouseEnter={() => handleHover("Processed High-Grade Yield", "YIELD PRODUCTION", "4,280.4 Tons Cleaned", "Gold & Metallurgical Grade", 730, 490)}
            onMouseLeave={handleLeave}
          >
            <g transform="translate(0, 15)">
              <polygon points="25,0 55,-15 85,0 55,15" fill="url(#goldBarGrad)" />
              <polygon points="25,0 55,15 55,28 25,13" fill="#CA8A04" />
              <polygon points="55,15 85,0 85,13 55,28" fill="#A16207" />
            </g>
            <g transform="translate(25, -2)">
              <polygon points="25,0 55,-15 85,0 55,15" fill="url(#goldBarGrad)" />
              <polygon points="25,0 55,15 55,28 25,13" fill="#EAB308" />
              <polygon points="55,15 85,0 85,13 55,28" fill="#CA8A04" />
            </g>
          </g>
        </g>

        {/* =================================================================
            LAYER 6: INTERACTIVE TELEMETRY BEACONS / PINS
            ================================================================= */}
        <g id="interactive-beacons" transform="translate(40, 20)">

          <g transform="translate(420, 370)" className="cursor-pointer"
            onClick={() => onSelectComponent?.('Conveyor B-42', { velocity: '3.20 m/s', tension: '98.6%', tonnage: '1,850 t/h' })}
          >
            <circle cx="0" cy="0" r="10" fill="#F9B318" opacity="0.3">
              <animate attributeName="r" values="6;16;6" dur="2s" begin="0.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="5" fill="#F9B318" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        </g>
      </svg>

      {/* Floating Dynamic Tooltip Card */}
      <AnimatePresence>
        {activeTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute z-30 pointer-events-none bg-[#0F172A]/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl border border-[#F9B318]/40 shadow-2xl shadow-blue-900/30 w-60"
            style={{
              top: `${activeTooltip.y - 120}px`,
              left: `${activeTooltip.x - 120}px`,
            }}
          >
            <span className="text-[10px] font-mono font-bold tracking-wider text-[#F9B318] uppercase block mb-1">
              {activeTooltip.tag}
            </span>
            <div className="font-bold text-sm text-slate-100 leading-snug mb-1.5">
              {activeTooltip.title}
            </div>
            <div className="flex items-center justify-between text-xs font-mono pt-1.5 border-t border-white/10">
              <span className="text-slate-400">{activeTooltip.sub}</span>
              <strong className="text-[#38BDF8]">{activeTooltip.stat}</strong>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
