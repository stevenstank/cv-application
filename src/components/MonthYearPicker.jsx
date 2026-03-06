import { useState } from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Parses "YYYY-MM" into { month: "06", year: "2022" }
function parse(value) {
  if (!value) return { month: '', year: '' };
  const [y, m] = value.split('-');
  return { month: m || '', year: y || '' };
}

// label     – field label text
// value     – "YYYY-MM" string (or "")
// onChange  – called with "YYYY-MM" when both parts are set, or "" when cleared
export default function MonthYearPicker({ label, value, onChange }) {
  const [local, setLocal] = useState(parse(value));

  const update = (next) => {
    setLocal(next);
    if (next.month && next.year && next.year.length === 4) {
      onChange(`${next.year}-${next.month}`);
    } else if (!next.month && !next.year) {
      onChange('');
    }
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="month-year-picker">
        <select
          value={local.month}
          onChange={(e) => update({ ...local, month: e.target.value })}
        >
          <option value="">Month</option>
          {MONTHS.map((name, i) => (
            <option key={name} value={String(i + 1).padStart(2, '0')}>
              {name}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1950"
          max="2100"
          placeholder="Year"
          value={local.year}
          onChange={(e) => update({ ...local, year: e.target.value })}
        />
      </div>
    </div>
  );
}
