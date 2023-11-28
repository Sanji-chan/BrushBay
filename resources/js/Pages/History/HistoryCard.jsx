import React from 'react';

const HistoryCard = ({ image, title, buyer, seller, tradeDate, price }) => {
  return (
    <div className="max-w-xs ml-auto mr-auto rounded overflow-hidden shadow-lg hover:scale-105 duration-300">
      <img className="w-full" src={image} alt="Trade Item" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p>Buyer: {buyer}</p>
        <p>Seller: {seller}</p>
        <p>Trade Date: {tradeDate}</p>
        <p>Price: {price}</p>
      </div>
    </div>
  );
};

export default HistoryCard;