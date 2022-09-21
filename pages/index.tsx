import { getFeaturedEvents } from '../src/api/eventApi';
import EventList from '../src/components/events/EventList';
import { NewsletterRegistration } from '../src/components/newsletter';
import { EventsType } from '../src/types/event';

type HomePageProps = {
  featureEvents: EventsType[];
};

export default function HomePage({ featureEvents }: HomePageProps) {
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
