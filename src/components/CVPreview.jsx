import '../styles/CVPreview.css';

// Format "2022-06" → "June 2022"
function formatDate(value) {
  if (!value) return '';
  const [year, month] = value.split('-');
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function DateRange({ startDate, endDate }) {
  const start = formatDate(startDate) || '—';
  const end = endDate ? formatDate(endDate) : 'Present';
  return (
    <span className="preview-date">
      {start} – {end}
    </span>
  );
}

export default function CVPreview({ general, educationList, experienceList }) {
  const isEmpty =
    !general.name &&
    educationList.length === 0 &&
    experienceList.length === 0;

  if (isEmpty) {
    return (
      <div className="preview-empty">
        <p>Fill in your details on the left to see your CV preview here.</p>
      </div>
    );
  }

  return (
    <div className="preview">
      {/* ── Header ── */}
      {general.name && (
        <div className="preview-header">
          <h1 className="preview-name">{general.name}</h1>
          <div className="preview-contact">
            {general.email && <span>{general.email}</span>}
            {general.email && general.phone && <span className="dot">·</span>}
            {general.phone && <span>{general.phone}</span>}
          </div>
        </div>
      )}

      {/* ── Education ── */}
      {educationList.length > 0 && (
        <section className="preview-section">
          <h2 className="preview-section-title">Education</h2>
          {educationList.map((entry) => (
            <div key={entry.id} className="preview-entry">
              <div className="preview-entry-top">
                <span className="preview-entry-main">{entry.school}</span>
                <DateRange startDate={entry.startDate} endDate={entry.endDate} />
              </div>
              <div className="preview-entry-sub">{entry.degree}</div>
            </div>
          ))}
        </section>
      )}

      {/* ── Experience ── */}
      {experienceList.length > 0 && (
        <section className="preview-section">
          <h2 className="preview-section-title">Work Experience</h2>
          {experienceList.map((entry) => (
            <div key={entry.id} className="preview-entry">
              <div className="preview-entry-top">
                <span className="preview-entry-main">{entry.company}</span>
                <DateRange startDate={entry.startDate} endDate={entry.endDate} />
              </div>
              <div className="preview-entry-sub">{entry.position}</div>
              {entry.responsibilities && (
                <p className="preview-responsibilities">
                  {entry.responsibilities}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
