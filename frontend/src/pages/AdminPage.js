import React, { useEffect, useState } from 'react';
import api from '../api';
import EventForm from '../components/EventForm';
import EventCard from '../components/EventCard';

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    const res = await api.get('/events');
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (data) => {
    if (editingEvent) {
      await api.put(`/events/${editingEvent._id}`, data);
    } else {
      await api.post('/events', data);
    }
    setEditingEvent(null);
    fetchEvents();
  };

  const handleEdit = (_id) => {
    const ev = events.find((e) => e._id === _id);
    setEditingEvent(ev);
  };

  const handleDelete = async (_id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await api.delete(`/events/${_id}`);
      fetchEvents();
    }
  };

  return (
    <div className="admin-page">
      <EventForm onSubmit={handleSubmit} editingEvent={editingEvent} />
      <h2>All Events</h2>
      <div className="event-grid">
        {events.map((ev) => (
          <div key={ev._id}>
            <EventCard event={ev} />
            <div className="admin-actions">
              <button className="btn" onClick={() => handleEdit(ev._id)}>
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(ev._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
