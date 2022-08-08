import React from 'react';
import Link from 'next/link';
import classes from './Button.module.css';

type ButtonProps = {
  link?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function Button({ link, children, onClick }: ButtonProps) {
  return (
    <>
      {link ? (
        <Link href={link}>
          <a className={classes.btn}>{children}</a>
        </Link>
      ) : (
        <button onClick={onClick}>{children}</button>
      )}
    </>
  );
}

export default Button;
