import { createContext } from 'react';
import { NotificationType } from '../src/types/notification';

export type NotificationContextProps = {
  notification: NotificationType | null;
  showNotification: (notificationData: NotificationType) => void;
  hideNotification: () => void;
};

const notificationContextDefaultValue: NotificationContextProps = {
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
};

const NotificationContext = createContext<NotificationContextProps>(
  notificationContextDefaultValue
);

export default NotificationContext;
