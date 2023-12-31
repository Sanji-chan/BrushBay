import React from 'react';
// import NotificationsHeader from './NotificationsHeader';
import Notification from './Notification';


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


const NotificationsPage = ({auth, status,  userName, notifications=[] }) => {
  console.log(notifications);

  

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Notifications</h2>}      
    >

    <Head title="Notifications" />
    <div className="max-w-8xl mx-auto sm:px-6 lg:px-0 pt-12 pb-32 max-w-screen-lg">

      {/* <NotificationsHeader /> */}
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      { notifications.length > 0 ?  
            <div>
                  {notifications.map((notification, index) => (
                  <Notification
                    key={index}
                    PaintingTitle={notification.PaintingTitle} 
                    userName={userName}
                    notificationText={notification.message}
                    datetime = {notification.created_at}
                  />
                ))}
            </div>
              :   
            <div className="bg-white mt-12 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">Oh no! It looks like you don't have any notifications.</div>
            </div>
     }

       
      </div>
    </div>
  </AuthenticatedLayout>

  );
};

export default NotificationsPage;