import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getEventById } from '../../src/api/eventApi';
import {
  EventSummary,
  EventLogistics,
  EventContent,
} from '../../src/components/eventDetail';
import { ErrorAlert } from '../../src/components/ui';
import { EventsType } from '../../src/types/event';

export default function EventDetail() {
  const [event, setEvent] = useState<EventsType | null>(null);
  const router = useRouter();
  const { eventId } = router.query as { eventId: string };

  useEffect(() => {
    const fetchEventById = async () => {
      const data = await getEventById(eventId);
      setEvent(data);
    };
    fetchEventById();
  }, []);

  if (!event)
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );

  return (
    <Fragment>
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
