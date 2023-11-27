import React from "react";
import image from '../img/background-placeholder.jpg';


export default function ImageSection({ title, subtitle }){
    return (
      <div className="w-1/3 p-2">
        <img
          className="mb-2 object-cover  bg-cover bg-center rounded-md"
          alt=""
          style={{
            height: '70%',
            width: '100%',
            backgroundImage: `url(${image})`, 
            border: 'None',
           }}
        />
        <p className="ml-2 font-bold">{title}</p>
        <p className="ml-2 font-medium text-sm text-gray-600">{subtitle}</p>
      </div>
    );
  };

