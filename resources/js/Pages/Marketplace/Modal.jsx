import React from "react";

const Modal = ({ isOpen, onClose, store }) => {
  if (!isOpen || !store) return null;

  const descriptionStyle = {
    wordWrap: "break-word",
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 transition duration-300 ease-in-out">
      <div className="bg-white w-1/2 rounded-lg shadow-2xl overflow-hidden flex flex-col transform transition-all duration-300 ease-in-out relative">
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 transition duration-300 ease-in-out text-3xl"
          aria-label="Close"
        >
          &times;
        </button>

        <div
          className="flex-grow-0 flex-shrink-0 w-full"
          style={{ flexBasis: "20%" }}
        >
           <img className="w-full h-full object-cover" 
            src={"http://127.0.0.1:8000/storage/" + store.paintingimg_link } 
            alt={store.title} />
        </div>
        <div
          className="flex-grow flex-shrink w-full p-6"
          style={{ flexBasis: "80%" }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {store.title}
          </h2>
          <p className="text-gray-600 mb-2" style={descriptionStyle}>
            Description: {store.description}
          </p>
          <p className="text-gray-600 mb-2">
             Author: { store.author_id }
          </p>
          <p className="text-gray-600 mb-2">
            Owner:  { store.seller_id}
          </p>

          <p className="text-gray-600 mb-2">
            Highest Bid:  { store.highest_bid===null ? "No bid posted yet" : store.highest_bid }
          </p>

          <p className="text-gray-600 mb-2">
            Inital Bid:  { store.inital_bid===null ? "N/A": store.initial_bid }
          </p>
          <p className="text-gray-600 mb-2">
            Date of Creation: {store.created_at}
          </p>
          <p className="text-gray-600 mb-4">Date of Post: {store.updated_at}</p>
          {/* Bid Now Section */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Bid"
              className="border-2 border-gray-300 rounded p-2 mr-2 w-full md:w-auto"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
