import { useState } from 'react';
import MonthYearPicker from './MonthYearPicker';
import '../styles/Education.css';

// Format "2022-06" → "June 2022"
function formatDate(value) {
  if (!value) return '';
  const [year, month] = value.split('-');
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

const createEntry = () => ({
  id: crypto.randomUUID(),
  school: '',
  degree: '',
  startDate: '',
  endDate: '',
  isEditing: true,
});

function EducationEntry({ entry, onUpdate, onDelete }) {
  const [form, setForm] = useState({
    school: entry.school,
    degree: entry.degree,
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
            <label>School Name</label>
            <input
              name="school"
              type="text"
              value={form.school}
              onChange={handleChange}
              placeholder="State University"
              required
            />
          </div>
          <div className="form-group">
            <label>Degree / Title of Study</label>
            <input
              name="degree"
              type="text"
              value={form.degree}
              onChange={handleChange}
              placeholder="B.Sc. Computer Science"
              required
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
            <span className="display-label">School</span>
            <span className="display-value">{entry.school}</span>
          </div>
          <div className="display-item">
            <span className="display-label">Degree</span>
            <span className="display-value">{entry.degree}</span>
          </div>
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
export default function Education({ entries, onChange }) {
  // Start with one blank entry if the list is empty
  const [localEntries, setLocalEntries] = useState(
    entries.length > 0 ? entries : [createEntry()]
  );

  const push = (next) => {
    setLocalEntries(next);
    // Only send submitted (non-editing) entries to the preview
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
    <section className="section education-section">
      <h2>Education</h2>
      {localEntries.map((entry) => (
        <EducationEntry
          key={entry.id}
          entry={entry}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
      <button className="btn btn-add" onClick={handleAdd}>
        + Add Education
      </button>
    </section>
  );
}
