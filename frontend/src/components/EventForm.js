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
      <input
        required
        name="title"
        placeholder="Event title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        required
        name="description"
        placeholder="Event description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        required
        name="venue"
        placeholder="Venue (Auditorium, Seminar Hall...)"
        value={formData.venue}
        onChange={handleChange}
      />
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
      </select>
      <input
        type="date"
        required
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="time"
        required
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
      />
      <input
        type="time"
        required
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
      />
      <input
        required
        name="organizer"
        placeholder="Organizer (Club/Faculty)"
        value={formData.organizer}
        onChange={handleChange}
      />
      <input
        type="number"
        name="capacity"
        min="0"
        placeholder="Capacity"
        value={formData.capacity}
        onChange={handleChange}
      />
      <label className="checkbox-row">
        <input
          type="checkbox"
          name="isOnline"
          checked={formData.isOnline}
          onChange={handleChange}
        />
        Online event
      </label>
      {formData.isOnline && (
        <input
          name="registrationLink"
          placeholder="Registration / meeting link"
          value={formData.registrationLink}
          onChange={handleChange}
        />
      )}
      <button className="btn" type="submit">
        {editingEvent ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default EventForm;
