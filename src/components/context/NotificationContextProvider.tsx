import React, { useState, useEffect } from 'react';
import NotificationContext from '../../../store/NotificationContext';
import { NotificationType } from '../../types/notification';

type NotificationContextProviderProps = {
  children: React.ReactNode;
};

export default function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationType | null>(null);

  function handleShowNotification(notificationData: NotificationType) {
    setActiveNotification(notificationData);
  }

  function handleHideNotification() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: handleShowNotification,
    hideNotification: handleHideNotification,
  };

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'error' ||
        activeNotification.status === 'success')
    ) {
      const timer = setTimeout(() => {
        handleHideNotification();
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}
