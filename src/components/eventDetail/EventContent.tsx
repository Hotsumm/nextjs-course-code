import React from 'react';
import classes from './EventContent.module.css';

type EventContentProps = {
  children: React.ReactNode;
};

function EventContent({ children }: EventContentProps) {
  return <section className={classes.content}>{children}</section>;
}

export default EventContent;
