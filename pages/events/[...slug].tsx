import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../src/components/events/EventList';
import ResultsTitle from '../../src/components/events/ResultsTitle';
import Button from '../../src/components/ui/Button';
import ErrorAlert from '../../src/components/ui/ErrorAlert';

function FilteredEvents() {
  const router = useRouter();
  const filterData = router.query.slug as string[];

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }
  const [filteredYear, filteredMonth] = filterData;

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

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  const isFilteredEvents = !(!filteredEvents || filteredEvents.length === 0);

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {isValidFilter ? (
        isFilteredEvents ? (
          <Fragment>
            <ResultsTitle date={date} />
            <EventList events={filteredEvents} />
          </Fragment>
        ) : (
          <ErrorAlert>
            <p>No events found for the chosen filter!</p>
          </ErrorAlert>
        )
      ) : (
        <ErrorAlert>
          <p>Invalid filter. please adjust your values</p>
          <div className="center">
            <Button link="/events">Show All Events</Button>
          </div>
        </ErrorAlert>
      )}
    </Fragment>
  );
}

export default FilteredEvents;
