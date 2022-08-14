import { useState, useEffect } from 'react';
import { getFeaturedEvents } from '../src/api/eventApi';
import EventList from '../src/components/events/EventList';
import { transformEventsData } from '../src/utils/transformEvents';

export default function HomePage() {
  const [featureEvents, setFeatureEvents] = useState(null);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      const data = await getFeaturedEvents();
      setFeatureEvents(data);
    };
    fetchFeaturedEvents();
  }, []);

  return <div>{featureEvents && <EventList events={featureEvents} />}</div>;
}
