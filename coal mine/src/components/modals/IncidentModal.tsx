import React, { useState } from 'react';
import { X, AlertOctagon } from 'lucide-react';
import type { Incident } from '../../types/mineguard';

interface IncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Incident, 'id' | 'created_at'>) => void;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<Omit<Incident, 'id' | 'created_at'>>({
    title: '',
    location: 'Panel B-1',
    severity: 'Medium',
    status: 'Open',
    reported_by: 'Shift supervisor',
    details: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      title: '',
      location: 'Panel B-1',
      severity: 'Medium',
      status: 'Open',
      reported_by: 'Shift supervisor',
      details: '',
    });
  };

  return (
    <div
      className="mg-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mg-modal">
        <div className="mg-modal-head">
          <h3>Report a Safety Incident</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form className="mg-form-grid" onSubmit={handleSubmit}>
          <label className="mg-wide">
            Incident Title
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Loose material observed at conveyor belt"
            />
          </label>

          <label>
            Location
            <input
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Panel B-1"
            />
          </label>

          <label>
            Severity Level
            <select
              value={form.severity}
              onChange={(e) =>
                setForm({
                  ...form,
                  severity: e.target.value as Incident['severity'],
                })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </label>

          <label className="mg-wide">
            Reported By
            <input
              required
              value={form.reported_by}
              onChange={(e) => setForm({ ...form, reported_by: e.target.value })}
            />
          </label>

          <label className="mg-wide">
            Details & Observations
            <textarea
              rows={3}
              value={form.details || ''}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              placeholder="Describe observation, immediate perimeter isolation, and steps taken..."
            />
          </label>

          <div className="mg-notice mg-wide">
            <AlertOctagon size={18} />
            <div>
              <b>Immediate Hazard Protocol</b>
              <span>
                For high methane or roof stability alerts, activate the primary horn
                beacon and evacuate crew per DGMS Section 4.
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 mg-wide mt-2">
            <button
              type="button"
              className="mg-btn secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="mg-btn primary">
              Save Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
