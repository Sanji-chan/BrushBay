import React from 'react';

const Notification = ({ PaintingTitle, userName, notificationText }) => {
  return (
    <div className="flex items-center p-4 border-b hover:scale-105 duration-300 shadow-sm">
      <p className="font-semibold ml-10 mr-6 text-pink-700">{PaintingTitle}</p>
      <p className="flex-grow">{userName}</p>
      <p className="flex-grow">{notificationText}</p>
    </div>
  );
};

export default Notification;