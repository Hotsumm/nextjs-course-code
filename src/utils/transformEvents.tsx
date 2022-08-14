export const transformEventsData = (data) => {
  const transformEvents = [];
  for (const key in data) {
    transformEvents.push({
      id: key,
      title: data[key].title,
      description: data[key].description,
      location: data[key].location,
      date: data[key].date,
      image: data[key].image,
      isFeatured: data[key].isFeatured,
    });
  }
  return transformEvents;
};
