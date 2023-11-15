import React from "react";


export default function ColumnSection({ title, options }){
    return (
      <div className="mb-5 py-3 px-5 rounded-lg border bg-white">
        <p className="font-bold mb-5">{title}</p>
        {options.map((option, id) => {
          return (
            <p
              key={id}
              className="text-sm font-medium text-gray-600 mb-2 cursor-pointer hover:text-black"
            >
              {option}
            </p>
          );
        })}
      </div>
    );
  };
