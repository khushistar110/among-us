import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { ProductionEntry } from '../../types/mineguard';

interface ProductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<ProductionEntry, 'id'>) => void;
}

export const ProductionModal: React.FC<ProductionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<Omit<ProductionEntry, 'id'>>({
    shift_name: 'Day',
    section_name: 'Panel A-2',
    output: 400,
    target_tonnes: 450,
    recorded_by: 'Shift supervisor',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      output: Number(form.output),
      target_tonnes: Number(form.target_tonnes),
    });
  };

  return (
    <div
      className="mg-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mg-modal">
        <div className="mg-modal-head">
          <h3>Add Production Entry</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form className="mg-form-grid" onSubmit={handleSubmit}>
          <label>
            Shift Roster
            <select
              value={form.shift_name}
              onChange={(e) => setForm({ ...form, shift_name: e.target.value })}
            >
              <option value="Day">Day Shift (06:00 - 14:00)</option>
              <option value="Evening">Evening Shift (14:00 - 22:00)</option>
              <option value="Night">Night Shift (22:00 - 06:00)</option>
            </select>
          </label>

          <label>
            Section / Face
            <input
              required
              value={form.section_name}
              onChange={(e) => setForm({ ...form, section_name: e.target.value })}
              placeholder="e.g. Panel A-2"
            />
          </label>

          <label>
            Output (Tonnes)
            <input
              required
              type="number"
              min="0"
              step="0.1"
              value={form.output}
              onChange={(e) =>
                setForm({ ...form, output: parseFloat(e.target.value) || 0 })
              }
            />
          </label>

          <label>
            Target (Tonnes)
            <input
              required
              type="number"
              min="1"
              step="0.1"
              value={form.target_tonnes}
              onChange={(e) =>
                setForm({ ...form, target_tonnes: parseFloat(e.target.value) || 0 })
              }
            />
          </label>

          <label className="mg-wide">
            Recorded By
            <input
              required
              value={form.recorded_by}
              onChange={(e) => setForm({ ...form, recorded_by: e.target.value })}
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
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
