import { useState } from 'react';
import '../styles/GeneralInfo.css';

// data & onSave come from App so the preview can react to changes
export default function GeneralInfo({ data, onSave }) {
  const [isEditing, setIsEditing] = useState(true);
  const [form, setForm] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);          // push to App state → preview updates
    setIsEditing(false);
  };

  const handleEdit = () => {
    setForm(data);         // restore last saved values into the form
    setIsEditing(true);
  };

  return (
    <section className="section general-info-section">
      <h2>General Information</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 555-555-5555"
            />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="display">
          <div className="display-item">
            <span className="display-label">Name</span>
            <span className="display-value">{data.name}</span>
          </div>
          <div className="display-item">
            <span className="display-label">Email</span>
            <span className="display-value">{data.email}</span>
          </div>
          <div className="display-item">
            <span className="display-label">Phone</span>
            <span className="display-value">{data.phone}</span>
          </div>
          <div className="btn-group">
            <button className="btn btn-secondary" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
