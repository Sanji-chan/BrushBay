import React from 'react';
import NotificationsHeader from './NotificationsHeader';
import Notification from './Notification';

const NotificationsPage = ({ notifications }) => {
  return (
    <div>
      <NotificationsHeader />
      <div>
        {notifications.map((notification, index) => (
          <Notification
            key={index}
            PaintingTitle={notification.PaintingTitle} 
            userName={notification.userName}
            notificationText={notification.notificationText}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;