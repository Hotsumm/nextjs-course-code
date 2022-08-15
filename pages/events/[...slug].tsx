import { Fragment } from 'react';
import { getFilteredEvents } from '../../src/api/eventApi';
import EventList from '../../src/components/events/EventList';
import ResultsTitle from '../../src/components/events/ResultsTitle';
import { Button, ErrorAlert } from '../../src/components/ui';
import { EventsType } from '../../src/types/event';

type FilteredEventsProps = {
  filteredEvents?: EventsType[];
  isError?: boolean;
  dateObj?: {
    numYear: number;
    numMonth: number;
  };
};

export default function FilteredEvents({
  isError,
  filteredEvents,
  dateObj,
}: FilteredEventsProps) {
  //const router = useRouter();
  //const filterData = router.query.slug as string[];

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  //const [filteredYear, filteredMonth] = filterData;

  if (isError) {
    return (
      <ErrorAlert>
        <p>Invalid filter. please adjust your values</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </ErrorAlert>
    );
  }

  const isFilteredEvents = !(!filteredEvents || filteredEvents.length === 0);

  if (!isFilteredEvents) {
    return (
      <ErrorAlert>
        <p>No events found for the chosen filter!</p>
      </ErrorAlert>
    );
  }

  const date = new Date(dateObj.numYear, dateObj.numMonth - 1);

  return (
    <Fragment>
      <Fragment>
        <ResultsTitle date={date} />
        <EventList events={filteredEvents} />
      </Fragment>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const [filteredYear, filteredMonth] = slug;

  const numYear = Number(filteredYear);
  const numMonth = Number(filteredMonth);

  const checkDateYear = (year: number): boolean => year > 2020 && year < 2031;
  const checkDateMonth = (month: number): boolean => month > 0 && month < 13;

  const isValidFilter = !(
    typeof numYear !== 'number' ||
    typeof numMonth !== 'number' ||
    !checkDateYear(numYear) ||
    !checkDateMonth(numMonth)
  );

  if (!isValidFilter) {
    return {
      props: { isError: true },
    };
  }

  const dateObj = { numYear, numMonth };
  const data = await getFilteredEvents({ year: numYear, month: numMonth });

  return {
    props: {
      filteredEvents: data,
      dateObj,
    },
  };
}
