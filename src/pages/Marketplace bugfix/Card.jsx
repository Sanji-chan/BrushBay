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
        <img
          src={store.imageUrl}
          alt={store.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {store.name}
        </h2>
        <p className="text-gray-600">
          {store.category.charAt(0).toUpperCase() + store.category.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default Card;
