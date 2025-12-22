import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const dateStr = event.date
    ? new Date(event.date).toLocaleDateString()
    : '';

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p className="event-meta">
        {event.department} • {dateStr} • {event.venue}
      </p>
      <p className="event-desc">
        {event.description && event.description.length > 120
          ? event.description.slice(0, 120) + '...'
          : event.description}
      </p>
      <p className="event-meta">
        Organizer: {event.organizer} | Registered: {event.registeredCount || 0}{' '}
        / {event.capacity || 0}
      </p>
      <Link className="btn" to={`/events/${event.id}`}>
        View details
      </Link>
    </div>
  );
};

export default EventCard;
