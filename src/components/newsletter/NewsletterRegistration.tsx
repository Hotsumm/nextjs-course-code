import { useRef, useContext } from 'react';
import classes from './NewsletterRegistration.module.css';
import NotificationContext from '../../../store/NotificationContext';

export default function NewsletterRegistration() {
  const { showNotification, hideNotification } =
    useContext(NotificationContext);
  const emailRef = useRef<HTMLInputElement | null>(null);

  async function registrationHandler(event: any) {
    event.preventDefault();
    if (!emailRef.current) return;
    const email = emailRef.current.value;

    if (!isValidateEmail(email))
      return alert('이메일을 정확하게 입력해주세요.');

    showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter!',
      status: 'pending',
    });
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');
      showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter!',
        status: 'success',
      });
    } catch (error: any) {
      console.log(error.message);
      showNotification({
        title: 'Error!',
        message: 'Registering newsletter failed!',
        status: 'error',
      });
    }
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
