import { EventsType } from '../types/event';
import { transformEventsData } from '../utils/transformEvents';

const BASE_URL = 'https://next-js-course-58583-default-rtdb.firebaseio.com';

export async function getAllEvents() {
  const response = await fetch(`${BASE_URL}/events.json`);
  const data = await response.json();
  const transformEvents: EventsType[] = transformEventsData(data);
  return transformEvents;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter: any) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return filteredEvents;
}

export async function getEventById(id: string) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
