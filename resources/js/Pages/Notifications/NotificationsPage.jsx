import React from 'react';
// import NotificationsHeader from './NotificationsHeader';
import Notification from './Notification';


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


const NotificationsPage = ({auth, status,  notifications=[] }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Notifications</h2>}      
    >

    <Head title="Notifications" />
    <div>
      {/* <NotificationsHeader /> */}
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
  </AuthenticatedLayout>

  );
};

export default NotificationsPage;