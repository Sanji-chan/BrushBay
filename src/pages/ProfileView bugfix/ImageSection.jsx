import React from "react";

// YOU MAY WANT TO MOVE THIS TO ANOTHER FILE
const ImageSection = ({ title, subtitle }) => {
    return (
      <div className="w-1/3 p-2">
        <img
          className="mb-2 object-cover rounded-md"
          src="/img/nahin-background.jpg"
          alt=""
        />
        <p className="ml-2 font-bold">{title}</p>
        <p className="ml-2 font-medium text-sm text-gray-600">{subtitle}</p>
      </div>
    );
  };


export default ImageSection();