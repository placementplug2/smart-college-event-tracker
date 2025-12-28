import React, { useEffect, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  venue: '',
  department: 'CSE',
  date: '',
  startTime: '',
  endTime: '',
  organizer: '',
  capacity: 0,
  isOnline: false,
  registrationLink: ''
};

const EventForm = ({ onSubmit, editingEvent }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        ...editingEvent,
        date: editingEvent.date
          ? new Date(editingEvent.date).toISOString().split('T')[0]
          : ''
      });
    } else {
      setFormData(initialState);
    }
  }, [editingEvent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>{editingEvent ? 'Edit Event' : 'Create Event'}</h2>

      <label>
        Event title
        <input
          required
          name="title"
          placeholder="e.g. AI & Data Science Workshop"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Event description
        <textarea
          required
          name="description"
          placeholder="Brief agenda, target audience, important points..."
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Venue / Location
        <input
          required
          name="venue"
          placeholder="Auditorium, Seminar Hall – 1, Online, etc."
          value={formData.venue}
          onChange={handleChange}
        />
      </label>

      <label>
        Department / Organizing branch
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
          <option value="MBA">MBA</option>
          <option value="SCIENCE">Science</option>
          <option value="OTHERS">Others</option>
        </select>
      </label>

      <label>
        Event date
        <input
          type="date"
          required
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>

      <label>
        Start time
        <input
          type="time"
          required
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
      </label>

      <label>
        End time
        <input
          type="time"
          required
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
      </label>

      <label>
        Organizer name
        <input
          required
          name="organizer"
          placeholder="e.g. CSI Student Chapter / Dr. Kumar"
          value={formData.organizer}
          onChange={handleChange}
        />
      </label>

      <label>
        Maximum participants (capacity)
        <input
          type="number"
          name="capacity"
          min="0"
          placeholder="e.g. 100"
          value={formData.capacity}
          onChange={handleChange}
        />
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          name="isOnline"
          checked={formData.isOnline}
          onChange={handleChange}
        />
        Online event (Google Meet/Zoom etc.)
      </label>

      {formData.isOnline && (
        <label>
          Registration / meeting link
          <input
            name="registrationLink"
            placeholder="Paste the registration form or meeting URL"
            value={formData.registrationLink}
            onChange={handleChange}
          />
        </label>
      )}

      <button className="btn" type="submit">
        {editingEvent ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;
