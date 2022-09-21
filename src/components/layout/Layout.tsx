import React, { useContext } from 'react';
import Header from './Header';
import { Notification } from '../ui';
import NotificationContext from '../../../store/NotificationContext';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const { notification } = useContext(NotificationContext);
  return (
    <>
      <Header />
      <main>{children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  );
}

export default Layout;
