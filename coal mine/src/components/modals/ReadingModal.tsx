import React, { useState } from 'react';
import { X, AlertOctagon } from 'lucide-react';
import type { EnvironmentalReading } from '../../types/mineguard';

interface ReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<EnvironmentalReading, 'id' | 'recorded_at'>) => void;
}

export const ReadingModal: React.FC<ReadingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<Omit<EnvironmentalReading, 'id' | 'recorded_at'>>({
    location: 'Panel A-2',
    methane_pct: 0.25,
    carbon_monoxide_ppm: 5,
    oxygen_pct: 20.9,
    temperature_c: 26.5,
    ventilation_m_s: 2.1,
    source_name: 'Manual Sniffer Apex-1',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      methane_pct: Number(form.methane_pct),
      carbon_monoxide_ppm: Number(form.carbon_monoxide_ppm),
      oxygen_pct: Number(form.oxygen_pct),
      temperature_c: Number(form.temperature_c),
      ventilation_m_s: Number(form.ventilation_m_s),
    });
  };

  return (
    <div
      className="mg-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mg-modal">
        <div className="mg-modal-head">
          <h3>Add Environmental Reading</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form className="mg-form-grid" onSubmit={handleSubmit}>
          <label className="mg-wide">
            Mine Location / Gallery
            <input
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Panel A-2 Face"
            />
          </label>

          <label>
            Methane (CH₄ %)
            <input
              required
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={form.methane_pct}
              onChange={(e) =>
                setForm({ ...form, methane_pct: parseFloat(e.target.value) || 0 })
              }
            />
          </label>

          <label>
            Carbon Monoxide (CO ppm)
            <input
              required
              type="number"
              step="1"
              min="0"
              value={form.carbon_monoxide_ppm}
              onChange={(e) =>
                setForm({
                  ...form,
                  carbon_monoxide_ppm: parseFloat(e.target.value) || 0,
                })
              }
            />
          </label>

          <label>
            Oxygen (O₂ %)
            <input
              required
              type="number"
              step="0.1"
              min="0"
              max="25"
              value={form.oxygen_pct}
              onChange={(e) =>
                setForm({ ...form, oxygen_pct: parseFloat(e.target.value) || 0 })
              }
            />
          </label>

          <label>
            Temperature (°C)
            <input
              required
              type="number"
              step="0.1"
              value={form.temperature_c}
              onChange={(e) =>
                setForm({ ...form, temperature_c: parseFloat(e.target.value) || 0 })
              }
            />
          </label>

          <label className="mg-wide">
            Ventilation Velocity (m/s)
            <input
              required
              type="number"
              step="0.1"
              min="0"
              value={form.ventilation_m_s}
              onChange={(e) =>
                setForm({
                  ...form,
                  ventilation_m_s: parseFloat(e.target.value) || 0,
                })
              }
            />
          </label>

          <label className="mg-wide">
            Source / Sniffer Device
            <input
              value={form.source_name || ''}
              onChange={(e) => setForm({ ...form, source_name: e.target.value })}
              placeholder="e.g. Apex-1 Optical IoT Beacon"
            />
          </label>

          <div className="mg-notice mg-wide">
            <AlertOctagon size={18} />
            <div>
              <b>Atmospheric Standard Protocol</b>
              <span>
                Manual gas entries must be verified using DGMS-approved multi-gas
                detectors before crew clearance is issued.
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 mg-wide mt-3">
            <button
              type="button"
              className="mg-btn secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="mg-btn primary">
              Save Reading
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
