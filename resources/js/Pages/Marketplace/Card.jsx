import React from "react";

const Card = ({ store }) => {
  return (
    <div
      className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out"
      style={{
        aspectRatio: "1 / 1",
      }}
    >
      {/* Image container */}
      <div className="w-full h-2/3 overflow-hidden">
       <img className="w-full h-full object-cover" 
            src={"http://127.0.0.1:8000/storage/" + store.paintingimg_link } 
            alt={store.title} />

      </div>

      {/* Text content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-pink-700 mb-2">
          {store.title}
        </h2>
        <p className="text-gray-600">
          {store.tag.charAt(0).toUpperCase() + store.tag.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default Card;
