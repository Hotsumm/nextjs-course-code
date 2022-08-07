import classes from './EventSummary.module.css';

type EventSummaryProps = {
  title: string;
};

function EventSummary({ title }: EventSummaryProps) {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;
