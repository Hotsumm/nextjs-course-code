import { useRef } from 'react';
import Button from '../ui/Button';
import classes from './EventSearch.module.css';

type EventsSearchProps = {
  onSearch: (year: string, month: string) => void;
};

function EventsSearch({ onSearch }: EventsSearchProps) {
  const yearRef = useRef<null | HTMLSelectElement>(null);
  const monthRef = useRef<null | HTMLSelectElement>(null);

  const onSubmit = (event: any) => {
    event.preventDefault();
    const year = yearRef.current.value;
    const month = monthRef.current.value;
    onSearch(year, month);
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="2">March</option>
            <option value="2">April</option>
            <option value="2">May</option>
            <option value="2">June</option>
            <option value="2">July</option>
            <option value="2">August</option>
            <option value="2">September</option>
            <option value="2">October</option>
            <option value="2">November</option>
            <option value="2">December</option>
          </select>
        </div>
      </div>
      <Button>Find events</Button>
    </form>
  );
}

export default EventsSearch;
