import React, { useEffect, useState } from 'react';
import api from '../api';
import EventCard from './EventCard';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [department, setDepartment] = useState('');
  const [search, setSearch] = useState('');

  const fetchEvents = async () => {
    const params = {};
    if (department) params.department = department;
    if (search) params.search = search;
    const res = await api.get('/events', { params });
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div>
      <form className="filter-form" onSubmit={handleFilter}>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>
        <button type="submit" className="btn">
          Apply
        </button>
      </form>

      <div className="event-grid">
        {events.map((ev) => (
          <EventCard key={ev.id} event={ev} />
        ))}
        {events.length === 0 && <p>No events found.</p>}
      </div>
    </div>
  );
};

export default EventList;
