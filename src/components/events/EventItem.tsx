import Link from 'next/link';
import classes from './EventItem.module.css';

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
    <li className={classes.item}>
      <img src={'/' + image} alt="" />
      <div>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <time>{formattedAddress}</time>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={exploreLink}>
            <a>Explore Event</a>
          </Link>
        </div>
      </div>
    </li>
  );
}
