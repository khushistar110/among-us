import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { EquipmentItem } from '../../types/mineguard';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<EquipmentItem, 'id'>) => void;
}

export const EquipmentModal: React.FC<EquipmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<Omit<EquipmentItem, 'id'>>({
    asset_name: '',
    asset_code: '',
    location: 'Panel A-2',
    status: 'Operational',
    last_service: new Date().toISOString().split('T')[0],
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      asset_name: '',
      asset_code: '',
      location: 'Panel A-2',
      status: 'Operational',
      last_service: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  return (
    <div
      className="mg-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mg-modal">
        <div className="mg-modal-head">
          <h3>Register Equipment</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form className="mg-form-grid" onSubmit={handleSubmit}>
          <label className="mg-wide">
            Asset Name
            <input
              required
              value={form.asset_name}
              onChange={(e) => setForm({ ...form, asset_name: e.target.value })}
              placeholder="e.g. Continuous Miner CM-04"
            />
          </label>

          <label>
            Asset Code
            <input
              required
              value={form.asset_code}
              onChange={(e) => setForm({ ...form, asset_code: e.target.value })}
              placeholder="e.g. CM-04"
            />
          </label>

          <label>
            Assigned Location
            <input
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Panel A-2"
            />
          </label>

          <label className="mg-wide">
            Operational Status
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as EquipmentItem['status'],
                })
              }
            >
              <option value="Operational">Operational</option>
              <option value="Maintenance">Maintenance Required</option>
              <option value="Down">Down / Out of Service</option>
            </select>
          </label>

          <label className="mg-wide">
            Notes / Telemetry Details
            <textarea
              rows={2}
              value={form.notes || ''}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Hydraulic pressure, teeth wear status, or maintenance tickets..."
            />
          </label>

          <div className="flex justify-end gap-3 mg-wide mt-3">
            <button
              type="button"
              className="mg-btn secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="mg-btn primary">
              Save Equipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
