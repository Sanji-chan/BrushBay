import React from 'react';

const Notification = ({ PaintingTitle, userName, notificationText, datetime }) => {

  const datetimeFromDatabase1 = datetime; // Replace this with your actual datetime value
  const dateObject1 = new Date(datetimeFromDatabase1);
  const extractedDate1 = dateObject1.toISOString().split('T')[0];
  
  return (
    <div className="flex items-center p-4 border-b hover:scale-105 duration-300 shadow-sm">
      <p className="font-semibold ml-10 mr-2 text-pink-700">
        { notificationText.includes('won') ||  notificationText.includes('sold')? 'Congratulations':'Hello'}
      </p>
      <p className="flex-grow"> {userName},</p>
      <p className="flex-grow">{notificationText}</p>
      <p className="flex-grow"> {extractedDate1}</p>
    </div>
  );
};

export default Notification;