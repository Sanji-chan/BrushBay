import React from 'react';

const HistoryCard = ({ image, title, buyer, seller, tradeDate, price }) => {
  const datetimeFromDatabase1 = tradeDate; 

  // Convert the string to a Date object
  const dateObject1 = new Date(datetimeFromDatabase1);

  // Extract the date component
  const extractedDate1 = dateObject1.toISOString().split('T')[0];
  console.log(image);

  return (
    <div className="max-w-xs ml-auto mr-auto rounded overflow-hidden shadow-lg hover:scale-105 duration-300">
      {/* <img className="w-full" 
          src={"http://127.0.0.1:8000/storage/" + image } 
          alt="Trade Item" /> */}

        <img className="w-full" 
            src={"http://127.0.0.1:8000/storage/" + image } 
            alt="Trade Item" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-pink-700  mb-2">{title}</div>
        <p>Buyer: {buyer}</p>
        <p>Seller: {seller}</p>
        <p>Trade Date: {extractedDate1}</p>
        <p>Price: {price} 🪙</p>
      </div>
    </div>
  );
};

export default HistoryCard;