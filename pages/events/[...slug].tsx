import { Fragment, useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { getAllEvents, getFilteredEvents } from '../../src/api/eventApi';
import EventList from '../../src/components/events/EventList';
import ResultsTitle from '../../src/components/events/ResultsTitle';
import { Button, ErrorAlert } from '../../src/components/ui';
import { EventsType } from '../../src/types/event';
import { transformEventsData } from '../../src/utils/transformEvents';

// type FilteredEventsProps = {
//   filteredEvents?: EventsType[];
//   isError?: boolean;
//   dateObj?: {
//     numYear: number;
//     numMonth: number;
//   };
// };

export default function FilteredEvents() {
  const [loadedEvents, setLoadedEvents] = useState<EventsType[] | null>(null);

  const router = useRouter();
  const filterData = router.query.slug as string[];

  const { data, error } = useSWR('events', getAllEvents);

  useEffect(() => {
    if (data) {
      const transformEvents: EventsType[] = transformEventsData(data);
      setLoadedEvents(transformEvents);
    }
  }, [data]);

  if (!loadedEvents) {
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
    !checkDateMonth(numMonth) ||
    error
  );

  if (!isValidFilter) {
    return (
      <ErrorAlert>
        <p>Invalid filter. please adjust your values</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </ErrorAlert>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  const isFilteredEvents = !(!filteredEvents || filteredEvents.length === 0);

  if (!isFilteredEvents) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  // if (isError) {
  //   return (
  //     <ErrorAlert>
  //       <p>Invalid filter. please adjust your values</p>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </ErrorAlert>
  //   );
  // }

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { slug } = context.query;

//   const [filteredYear, filteredMonth] = slug;

//   const numYear = Number(filteredYear);
//   const numMonth = Number(filteredMonth);

//   const checkDateYear = (year: number): boolean => year > 2020 && year < 2031;
//   const checkDateMonth = (month: number): boolean => month > 0 && month < 13;

//   const isValidFilter = !(
//     typeof numYear !== 'number' ||
//     typeof numMonth !== 'number' ||
//     !checkDateYear(numYear) ||
//     !checkDateMonth(numMonth)
//   );

//   if (!isValidFilter) {
//     return {
//       props: { isError: true },
//     };
//   }

//   const dateObj = { numYear, numMonth };
//   const data = await getFilteredEvents({ year: numYear, month: numMonth });

//   return {
//     props: {
//       filteredEvents: data,
//       dateObj,
//     },
//   };
// }
