import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import EventDetails from '../components/EventDetails';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    };
    loadEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <EventDetails event={event} />
    </div>
  );
};

export default EventPage;
