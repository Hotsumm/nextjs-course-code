import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getAllEvents } from '../../dummy-data';
import EventList from '../../src/components/events/EventList';
import EventsSearch from '../../src/components/events/EventSearch';

export default function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  const onSearch = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={onSearch} />
      <EventList events={events} />
    </Fragment>
  );
}
