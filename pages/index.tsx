import { getFeaturedEvents } from '../src/api/eventApi';
import EventList from '../src/components/events/EventList';
import { NewsletterRegistration } from '../src/components/input';

export default function HomePage({ featureEvents }) {
  return (
    <div>
      <NewsletterRegistration />
      <EventList events={featureEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const data = await getFeaturedEvents();
  return {
    props: { featureEvents: data },
  };
}
