import { getFeaturedEvents } from '../dummy-data';
import EventList from '../src/components/events/EventList';

export default function HomePage() {
  const featureEvents = getFeaturedEvents();
  return (
    <div>
      <EventList events={featureEvents} />
    </div>
  );
}
