import React from 'react';

const EventDetails = ({ event }) => {
  const dateStr = event.date
    ? new Date(event.date).toLocaleDateString()
    : '';

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <p className="event-meta">
        {event.department} • {dateStr} • {event.venue}
      </p>
      <p>{event.description}</p>
      <p className="event-meta">
        Organizer: {event.organizer} | Time: {event.startTime} - {event.endTime}
      </p>
      <p className="event-meta">
        Registered: {event.registeredCount || 0} / {event.capacity || 0}
      </p>
      {event.isOnline && event.registrationLink && (
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noreferrer"
          className="btn"
        >
          Registration / Meeting link
        </a>
      )}
    </div>
  );
};

export default EventDetails;
