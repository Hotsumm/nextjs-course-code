import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getAllEvents } from '../../src/api/eventApi';
import EventList from '../../src/components/events/EventList';
import EventsSearch from '../../src/components/events/EventSearch';
import { EventsType } from '../../src/types/event';

export default function AllEventsPage() {
  const [events, setEvents] = useState<null | EventsType[]>(null);
  const router = useRouter();

  const onSearch = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getAllEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <Fragment>
      <EventsSearch onSearch={onSearch} />
      {events && <EventList events={events} />}
    </Fragment>
  );
}
