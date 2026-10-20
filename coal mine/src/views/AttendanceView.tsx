import React, { useState, useEffect, useRef } from 'react';
import {
  Fingerprint,
  Camera,
  ShieldCheck,
  Eye,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
} from 'lucide-react';

interface AttendanceViewProps {
  notify: (msg: string) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({ notify }) => {
  const [workerId, setWorkerId] = useState('');
  const [gateStage, setGateStage] = useState<'identity' | 'ppe' | 'complete'>('identity');
  const [cameraReady, setCameraReady] = useState(false);
  const [demoScan, setDemoScan] = useState(false);
  const [streamError, setStreamError] = useState('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const items = [
    'Safety Helmet (Apex-1 Smart Hardhat)',
    'Protective Mining Gloves (Anti-cut Class 4)',
    'High-Visibility Reflective Jacket (DGMS Orange)',
    'Steel-Toe Safety Boots with Metatarsal Guard',
    'Personal Multi-Gas sniffer & UWB Beacon',
  ];

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const openCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      setStream(s);
      setCameraReady(true);
      setStreamError('');
      notify('Optical camera feed connected. Biometric PPE model active.');
    } catch {
      setStreamError(
        'Camera permission was not granted or webcam is unavailable in current browser.'
      );
      setCameraReady(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 w-full">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#deded8]">
        <div>
          <div className="font-mono text-[11px] font-bold text-[#f4a900] tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#f4a900]" /> ACCESS CONTROL & BIOMETRICS
          </div>
          <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black text-[#1546d9] uppercase tracking-tight">
            Smart Attendance & PPE Entry Gate
          </h1>
          <p className="text-sm text-[#64748b] mt-1 max-w-2xl">
            Identity verification, AI computer-vision PPE scanning, and shaft descent clearance.
          </p>
        </div>

        <span className="mg-tag warning self-start md:self-auto font-mono">
          PROTOTYPE TEST BENCH
        </span>
      </div>

      <div className="gate-layout">
        {/* Main Gate Console */}
        <section className="gate-main">
          <div className="flex items-center justify-between pb-4 border-b border-[#deded8]">
            <div>
              <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546d9] uppercase tracking-wide flex items-center gap-2">
                <Fingerprint size={22} /> Shaft Access Turnstile 01
              </h3>
              <p className="text-xs text-[#64748b]">
                Identity → Real-Time PPE Verification → Turnstile Unlock
              </p>
            </div>
            <span className="mg-tag neutral font-mono text-[10px]">
              Active Shift Gate
            </span>
          </div>

          {/* Stepper */}
          <div className="gate-stepper">
            <span className={gateStage === 'identity' ? 'current' : 'done'}>
              1 <b>Worker Identity</b>
            </span>
            <i />
            <span className={gateStage === 'ppe' ? 'current' : demoScan ? 'done' : ''}>
              2 <b>PPE Compliance Check</b>
            </span>
            <i />
            <span className={gateStage === 'complete' ? 'current' : ''}>
              3 <b>Entry Decision</b>
            </span>
          </div>

          {/* Camera + Form Grid */}
          <div className="gate-body">
            {/* Live Camera Feed */}
            <div className="gate-camera">
              {stream ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <div className="camera-placeholder">
                  <Camera size={38} />
                  <b>Worker Verification Camera</b>
                  <span>Optical feed activates on turnstile approach</span>
                </div>
              )}
              <span className="camera-label">
                <i /> LIVE OPTICAL SCANNER
              </span>
            </div>

            {/* Controls */}
            <div className="flex flex-col justify-between gap-4">
              <div>
                <label className="font-mono text-xs font-bold text-[#64748b] uppercase tracking-wider block mb-2">
                  Worker ID / Roster Tag
                </label>
                <input
                  className="w-full bg-[#fbfbfa] border border-[#deded8] rounded-xl px-4 py-3 text-sm text-[#14181c] font-mono outline-none focus:border-[#1546d9]"
                  value={workerId}
                  onChange={(e) => {
                    setWorkerId(e.target.value);
                    setDemoScan(false);
                  }}
                  placeholder="e.g. WRK-1042"
                />

                <div className="mt-4">
                  <button
                    type="button"
                    className="mg-btn secondary w-full flex items-center justify-center gap-2"
                    onClick={openCamera}
                  >
                    <Camera size={16} />
                    {cameraReady ? 'Camera Feed Active' : 'Enable Camera Feed'}
                  </button>
                  {streamError && (
                    <p className="text-xs text-red-500 mt-2 font-mono">
                      {streamError}
                    </p>
                  )}
                </div>

                <div className="mg-notice mt-4">
                  <Eye size={18} />
                  <div>
                    <b>Facial Identity Check</b>
                    <span>
                      Verifies identity against daily pit roster. Liveness blink check required.
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="mg-btn primary w-full flex items-center justify-center gap-2 py-3 mt-4"
                onClick={() => {
                  if (!workerId.trim()) {
                    notify('Please enter a valid Worker ID first.');
                    return;
                  }
                  setGateStage('ppe');
                  notify('Identity confirmed. Proceeding to computer-vision PPE scan.');
                }}
              >
                Continue to PPE Verification <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* PPE Checklist Stage */}
          {gateStage !== 'identity' && (
            <div className="mt-8 pt-8 border-t border-[#deded8]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546d9] uppercase tracking-wide">
                    Mandatory PPE Checklist
                  </h3>
                  <p className="text-xs text-[#64748b]">
                    AI neural network classifies helmet, boots, and gas beacon presence
                  </p>
                </div>
                <span className={`mg-tag ${demoScan ? 'warning' : 'neutral'}`}>
                  {demoScan ? 'SIMULATED VERIFIED' : 'AWAITING SCAN'}
                </span>
              </div>

              <div className="grid gap-2.5 mb-6">
                {items.map((it) => (
                  <div
                    key={it}
                    className="flex items-center gap-3 p-3.5 bg-[#fbfbfa] border border-[#deded8] rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="flex-1">
                      <b className="text-xs text-[#14181c] block">{it}</b>
                      <small className="text-[10px] text-[#8a94a6] font-mono">
                        {demoScan ? 'Positive optical detection' : 'Pending camera sweep'}
                      </small>
                    </div>
                    <span
                      className={`mg-tag ${demoScan ? 'success' : 'neutral'} font-mono`}
                    >
                      {demoScan ? 'PASS' : 'PENDING'}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className="mg-btn primary w-full flex items-center justify-center gap-2 py-3"
                onClick={() => {
                  setDemoScan(true);
                  setGateStage('complete');
                  notify('PPE verification scan executed.');
                }}
              >
                <Camera size={16} /> Run Demonstration PPE Scan
              </button>
            </div>
          )}

          {/* Decision Stage */}
          {gateStage === 'complete' && (
            <div className="gate-decision blocked">
              <ShieldCheck size={28} className="flex-shrink-0" />
              <div>
                <b>ENTRY VERIFICATION COMPLETE</b>
                <span>
                  Worker {workerId || 'WRK-1042'} verified. In test bench mode, statutory supervisor
                  override is required before mechanical turnstile release.
                </span>
              </div>
              <button
                className="mg-btn secondary flex-shrink-0"
                onClick={() => {
                  setGateStage('identity');
                  setDemoScan(false);
                }}
              >
                Scan Next Worker
              </button>
            </div>
          )}
        </section>

        {/* Sidebar Rules */}
        <aside className="gate-side">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1546d9] flex items-center justify-center mb-4">
            <ShieldCheck size={26} />
          </div>

          <h3 className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546d9] uppercase tracking-wide">
            Statutory Gate Rules
          </h3>
          <p className="text-xs text-[#64748b] leading-relaxed mt-2 mb-4">
            Every underground personnel descent must be strictly verified against DGMS Circular 02/2026.
          </p>

          <div className="space-y-1 divide-y divide-[#f1f0eb]">
            <div className="gate-rule">
              <CheckCircle2 size={16} />
              <span>Hardhat, gloves, high-vis jacket, boots</span>
            </div>
            <div className="gate-rule">
              <CheckCircle2 size={16} />
              <span>Multi-gas sniffer active &amp; zeroed</span>
            </div>
            <div className="gate-rule">
              <CheckCircle2 size={16} />
              <span>Active roster assignment on shift</span>
            </div>
            <div className="gate-rule">
              <CheckCircle2 size={16} />
              <span>UWB anti-collision beacon transmitting</span>
            </div>
          </div>

          <div className="mg-notice mt-6">
            <AlertOctagon size={18} />
            <div>
              <b>Zero-Tolerance Descent Rule</b>
              <span>
                Under no circumstances may crew members enter without verified chin-strap and steel toe protection.
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
