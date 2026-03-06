import { useState } from 'react';
import MonthYearPicker from './MonthYearPicker';
import '../styles/Experience.css';

// Format "2022-06" → "June 2022"
function formatDate(value) {
  if (!value) return '';
  const [year, month] = value.split('-');
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

const createEntry = () => ({
  id: crypto.randomUUID(),
  company: '',
  position: '',
  responsibilities: '',
  startDate: '',
  endDate: '',
  isEditing: true,
});

function ExperienceEntry({ entry, onUpdate, onDelete }) {
  const [form, setForm] = useState({
    company: entry.company,
    position: entry.position,
    responsibilities: entry.responsibilities,
    startDate: entry.startDate,
    endDate: entry.endDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...entry, ...form, isEditing: false });
  };

  const handleEdit = () => {
    onUpdate({ ...entry, isEditing: true });
  };

  return (
    <div className="entry-card">
      {entry.isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company Name</label>
            <input
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              placeholder="Acme Corp"
              required
            />
          </div>
          <div className="form-group">
            <label>Position Title</label>
            <input
              name="position"
              type="text"
              value={form.position}
              onChange={handleChange}
              placeholder="Software Engineer"
              required
            />
          </div>
          <div className="form-group">
            <label>Main Responsibilities</label>
            <textarea
              name="responsibilities"
              value={form.responsibilities}
              onChange={handleChange}
              placeholder="Describe your key responsibilities..."
              rows={4}
            />
          </div>
          <div className="form-row">
            <MonthYearPicker
              label="Start Date"
              value={form.startDate}
              onChange={(v) => setForm((prev) => ({ ...prev, startDate: v }))}
            />
            <MonthYearPicker
              label="End Date"
              value={form.endDate}
              onChange={(v) => setForm((prev) => ({ ...prev, endDate: v }))}
            />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDelete(entry.id)}
            >
              Delete
            </button>
          </div>
        </form>
      ) : (
        <div className="display">
          <div className="display-item">
            <span className="display-label">Company</span>
            <span className="display-value">{entry.company}</span>
          </div>
          <div className="display-item">
            <span className="display-label">Position</span>
            <span className="display-value">{entry.position}</span>
          </div>
          {entry.responsibilities && (
            <div className="display-item">
              <span className="display-label">Responsibilities</span>
              <span className="display-value responsibilities-value">
                {entry.responsibilities}
              </span>
            </div>
          )}
          <div className="display-item">
            <span className="display-label">Period</span>
            <span className="display-value">
              {formatDate(entry.startDate) || '—'}
              {' – '}
              {entry.endDate ? formatDate(entry.endDate) : 'Present'}
            </span>
          </div>
          <div className="btn-group">
            <button className="btn btn-secondary" onClick={handleEdit}>
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(entry.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// entries & onChange come from App so the preview stays in sync
export default function Experience({ entries, onChange }) {
  const [localEntries, setLocalEntries] = useState(
    entries.length > 0 ? entries : [createEntry()]
  );

  const push = (next) => {
    setLocalEntries(next);
    onChange(next.filter((e) => !e.isEditing));
  };

  const handleUpdate = (updated) => {
    push(localEntries.map((e) => (e.id === updated.id ? updated : e)));
  };

  const handleDelete = (id) => {
    push(localEntries.filter((e) => e.id !== id));
  };

  const handleAdd = () => {
    push([...localEntries, createEntry()]);
  };

  return (
    <section className="section experience-section">
      <h2>Work Experience</h2>
      {localEntries.map((entry) => (
        <ExperienceEntry
          key={entry.id}
          entry={entry}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
      <button className="btn btn-add" onClick={handleAdd}>
        + Add Experience
      </button>
    </section>
  );
}
