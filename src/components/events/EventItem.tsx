import Link from 'next/link';

type EventItemProps = {
  title: string;
  image: string;
  date: string;
  location: string;
  id: string;
};

export default function EventItem({
  title,
  image,
  date,
  location,
  id,
}: EventItemProps) {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li>
      <img src={'/' + image} alt="" />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div>
            <time>{formattedAddress}</time>
          </div>
        </div>
        <div>
          <Link href={exploreLink}>
            <a>Explore Event</a>
          </Link>
        </div>
      </div>
    </li>
  );
}
