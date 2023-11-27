import React, { useState } from 'react';

const Bid = ({ name, bidAmount }) => {
  const [isHaggling, setIsHaggling] = useState(false);
  const [hagglePrice, setHagglePrice] = useState('');

  const openHaggleModal = () => {
    setIsHaggling(true);
  };

  const closeHaggleModal = () => {
    setIsHaggling(false);
  };

  const handleHaggleSubmit = (e) => {
    e.preventDefault();
    // Handle the haggle submit action here
    closeHaggleModal();
  };
  return (
    <div className="flex items-center p-4 border-b shadow-sm">
      <div className="w-1/4 min-w-0">
        <p className="font-semibold truncate">{name}</p>
      </div>
      <div className="w-1/4 min-w-0">
        <p className="font-semibold">Bid: {bidAmount}</p>
      </div>
      <div className="flex space-x-2  ml-auto">
        <button className="bg-green-700 hover:bg-green-500 text-white px-4 py-2 rounded-md">Accept</button>
        <button className="bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded-md">Reject</button>
        <button className="bg-pink-700 hover:bg-pink-500 text-white px-4 py-2 rounded-md" onClick={openHaggleModal}>Haggle</button>
      </div>
      {isHaggling && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded relative">
          <button className="absolute top-0 right-0 m-2 text-gray-800 hover:text-red-600 w-2 h-2" onClick={closeHaggleModal}>
              &times; 
            </button>
            <h2 className="text-xl font-bold mb-2 text-center text-pink-500">Haggle</h2>
            <p className="mb-4"><span className='font-bold'>Original Bid: </span>{bidAmount}</p>
            <form onSubmit={handleHaggleSubmit}>
              <input
                type="text"
                value={hagglePrice}
                onChange={(e) => setHagglePrice(e.target.value)}
                className="border-2 border-gray-300 rounded py-2 px-4 mb-4 w-full"
                placeholder="Enter your bid"
              />
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded-md w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bid;
