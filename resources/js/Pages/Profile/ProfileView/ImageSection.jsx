import React from "react";

// YOU MAY WANT TO MOVE THIS TO ANOTHER FILE
const ImageSection = ({ title, subtitle, img }) => {


    return (
      <div className="w-1/3 p-2">
        {/* <img
          className="mb-2 object-cover rounded-md"
          src="/img/nahin-background.jpg"
          alt=""
        /> */}
                <img className="mb-2 object-cover rounded-md" src={"http://127.0.0.1:8000/storage/" + img} alt={title} />

        <p className="ml-2 font-bold">{title}</p>
        <p className="ml-2 font-medium text-sm text-gray-600 ">{subtitle}</p>
      </div>
    );
  };


export default ImageSection;