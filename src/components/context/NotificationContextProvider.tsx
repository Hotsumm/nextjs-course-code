import React, { useState, useContext } from 'react';
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

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}
