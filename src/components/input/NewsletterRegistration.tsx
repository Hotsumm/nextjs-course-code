import { ReactElement, useRef } from 'react';
import classes from './NewsletterRegistration.module.css';

export default function NewsletterRegistration() {
  const emailRef = useRef<HTMLInputElement | null>(null);

  function registrationHandler(event: any) {
    event.preventDefault();
    if (!emailRef.current) return;
    const email = emailRef.current.value;

    if (!isValidateEmail(email))
      return alert('이메일을 정확하게 입력해주세요.');

    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.message))
      .catch((error) => console.log(error));
  }

  function isValidateEmail(email: string): boolean {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    return emailRegEx.test(email);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
