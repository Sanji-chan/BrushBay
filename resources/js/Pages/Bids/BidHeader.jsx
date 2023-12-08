import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const BidHeader = () => {
  return (
    <div className="bg-pink-500 text-white text-6xl font-bold p-8 flex items-center">
      <button className="p-2">
        <ArrowLeftIcon className="h-5 w-5" />
      </button>
      <h1 className="flex-grow text-center">BIDS</h1>
    </div>
  );
};

export default BidHeader;
