import Axios from 'axios';
import { useState } from "react";
import { usePage, router } from '@inertiajs/react';

// export default Modal;
const Modal = ({ isOpen, onClose, store }) => {
  if (!isOpen || !store) return null;
  const datetimeFromDatabase1 = store.created_at; // Replace this with your actual datetime value
  const datetimeFromDatabase2 = store.updated_at; // Replace this with your actual datetime value
  const [bid, setBid] = store.highest_bid == null ? useState(0) : useState(store.highest_bid+1);
  const [error, setError] = useState("");
  // Convert the string to a Date object
  const dateObject1 = new Date(datetimeFromDatabase1);
  const dateObject2 = new Date(datetimeFromDatabase2);

  // Extract the date component
  const extractedDate1 = dateObject1.toISOString().split('T')[0];
  const extractedDate2 = dateObject2.toISOString().split('T')[0];

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const rowStyle = {
    height: '50%',
  };
  const user = usePage().props.auth.user;
  // console.log(store.id, user.id, store.seller_id);
  // console.log(bid);
  const handleSubmit = (e) => {
    e.preventDefault();
    const fData = new FormData();
    fData.append("post_id", store.id);
    fData.append("buyer_id", user.id);
    fData.append("seller_id", store.seller_id);
    fData.append("buyer_bid", bid);

    Axios.post("http://127.0.0.1:8000/api/posts/", fData).then(res=>{
      console.log(res["data"]);
      if(res["data"]["results"] == null) {
        router.visit(route('marketplace.showMarket'));
      } else {
        setError(res["data"]["results"]);
      }
    }).catch((err) => {
      console.log(err);
    });
  }  

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

        {/* Image container with fixed aspect ratio */}
        <div
          className="w-full overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          <img
           src={"http://127.0.0.1:8000/storage/" + store.paintingimg_link } 
           alt={store.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text content */}
        <div className="flex-grow flex-shrink w-full px-4 py-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {store.title}
          </h2>

       <table border="1" style={tableStyle}>
          <thead>
            <tr className="w-full overflow-hidden text-left">
              <th colSpan="2">
              <p className="text-gray-600 mb-2">
                Description: {store.description} 
              </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Second Row */}
            <tr style={{ rowStyle }}>
              <td  colSpan="1">
              <p className="text-gray-600 mb-2">
                Author: { store.author_id }
              </p>
              </td>
              <td colSpan="1">
              <p className="text-gray-600 mb-2">
                Owner:  { store.seller_id}
              </p>
              </td>
            </tr>
            {/* Third Row */}
            <tr style={{ rowStyle }}>
              <td>
              <p className="text-gray-600 mb-2">
              Highest Bid:  { store.highest_bid===null ? "No bid posted yet" : store.highest_bid }
              </p>
              </td>
              <td >
              <p className="text-gray-600 mb-2">
                Inital Bid:  { store.inital_bid===null ? "N/A": store.initial_bid }
              </p>
              </td>
            </tr >
            {/* Fourth Row */}
            <tr style={{ rowStyle }}>
              <td >
              <p className="text-gray-600 mb-2">
              Date of Creation: {extractedDate1} {/* Date here */}
              </p>
              </td>
              <td >
              <p className="text-gray-600 mb-4">
              Date of Post: {extractedDate2}
              </p>
              </td>
            </tr>
          </tbody>
        </table>


          {/* Bid Now Section */}
          <div className="mb-4">
            <input
              type="number"
              placeholder="Your Bid"
              className="border-2 border-gray-300 rounded p-2 mr-2 w-full md:w-auto"
              min={ store.highest_bid===null ? 0 : store.highest_bid+1 }
              onChange={(e) => setBid(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              onClick={handleSubmit }
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
