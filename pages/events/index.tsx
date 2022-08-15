import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getAllEvents } from '../../src/api/eventApi';
import EventList from '../../src/components/events/EventList';
import EventsSearch from '../../src/components/events/EventSearch';
import { EventsType } from '../../src/types/event';

type AllEventsPageProps = {
  events: EventsType[];
};

export default function AllEventsPage({ events }: AllEventsPageProps) {
  const router = useRouter();

  const onSearch = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventsSearch onSearch={onSearch} />
      {events && <EventList events={events} />}
    </Fragment>
  );
}

export async function getStaticProps() {
  const data: EventsType[] = await getAllEvents();
  return { props: { events: data } };
}
