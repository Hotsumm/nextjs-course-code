import { Fragment } from 'react';
import { getAllEvents, getEventById } from '../../src/api/eventApi';
import {
  EventSummary,
  EventLogistics,
  EventContent,
} from '../../src/components/eventDetail';
import { ErrorAlert } from '../../src/components/ui';
import { EventsType } from '../../src/types/event';
import MetaEvent from '../../src/components/events/MetaEvent';

type EventDetailProps = {
  event: EventsType;
};

export default function EventDetail({ event }: EventDetailProps) {
  if (!event)
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );

  return (
    <Fragment>
      <MetaEvent title={event.title} />
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const {
    params: { eventId },
  } = context;
  const data: EventsType = await getEventById(eventId);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { event: data } };
}
