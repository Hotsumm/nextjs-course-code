import EventItem from './EventItem';
import { dummyEventsType } from '../../types/event';

type EventListProps = {
  events: dummyEventsType[];
};

export default function EventList({ events }: EventListProps) {
  return (
    <ul>
      {events.map((event) => (
        <EventItem
          key={event.id}
          title={event.title}
          image={event.image}
          date={event.date}
          location={event.location}
          id={event.id}
        />
      ))}
    </ul>
  );
}
