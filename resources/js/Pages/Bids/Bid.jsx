import React, { useState } from 'react';
import Axios from 'axios';
import { router } from '@inertiajs/react';

const Bid = ({ initialbid, bidAmount, bidStatus, id , title, buyerName}) => {
  const [isHaggling, setIsHaggling] = useState(false);
  const [hagglePrice, setHagglePrice] = useState(initialbid);

  const [isbidStatus, setbidStatus] = useState(bidStatus);

  const [isBidClosed, setBidClosed] = useState(bidStatus === 'Accepted' || bidStatus === 'Rejected');

  //console.log(isBidClosed);
  const openHaggleModal = () => {
    setIsHaggling(true);
  };

  const closeHaggleModal = () => {
    setIsHaggling(false);
  };
  const handleAccept = (e) => {
    e.preventDefault();
    const parsedUserId = parseInt(id, 10); // Parse painting_id as an integer
    Axios.post(`http://127.0.0.1:8000/api/bids/accept/${parsedUserId}`)
    
    .catch(e => {
      console.error('Failure', e.response.data);
    });

    setbidStatus('Accepted'); 
    setBidClosed(true);
 
  };
  const handleReject = (e) => {
    e.preventDefault();
    const parsedUserId = parseInt(id, 10); // Parse painting_id as an integer
    Axios.post(`http://127.0.0.1:8000/api/bids/reject/${parsedUserId}`)

    .catch(e => {
      console.error('Failure', e.response.data);
    });

    setbidStatus('Rejected');
    setBidClosed(true);
    
  
  };

  const handleHaggleSubmit = (e) => {
    e.preventDefault();
    const parsedUserId = parseInt(id, 10); // Parse painting_id as an integer
    const fData =new FormData();
    fData.append('seller_haggle_bid', hagglePrice);

    Axios.post(`http://127.0.0.1:8000/api/bids/haggle/${parsedUserId}`, fData)

    .catch(e => {
      console.error('Failure', e.response.data);
    });
    // console.log([`http://127.0.0.1:8000/api/bids/haggle/${parsedUserId}`, hagglePrice]);

    closeHaggleModal();
  };

  return (
    <div className="px-8"> 
    <p className="font-semibold pt-4 text-pink-700"> Bid placed on "{title}"</p>
    <div className="flex items-center p-4 border-b shadow-sm">
          <div className="w-1/4 min-w-0">
            <p className="font-semibold truncate">User: {buyerName}</p>
          </div>
          <div className="w-1/4 min-w-0">
            <p className="font-semibold">Bid: {bidAmount} 🪙</p>
          </div>
          <div className="w-1/4 min-w-0">
            <p className="font-semibold">Status: {isbidStatus}</p>
          </div>
          <div >
            {isBidClosed==true ?  "Bid for this painting closed. Thank you for your participation."
            :
            <div className="flex space-x-2  ml-auto">
                <button className="bg-green-700 hover:bg-green-500 text-white px-4 py-2 rounded-md" 
                          onClick={handleAccept}>Accept</button>
                <button className="bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded-md"
                          onClick={handleReject}>Reject</button>
                <button className="bg-pink-700 hover:bg-pink-500 text-white px-4 py-2 rounded-md" 
                          onClick={openHaggleModal}>Haggle</button>
            </div> 
            
            }
                
          </div>
     
     
   {isHaggling && (
     <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
       <div className="bg-white p-4 rounded relative">
       <button className="absolute top-0 right-0 m-2 text-gray-800 hover:text-red-600 w-2 h-2" onClick={closeHaggleModal}>
           &times; 
         </button>
         <h2 className="text-xl font-bold mb-2 text-center text-pink-500">Haggle</h2>
         <p className="mb-4"><span className='font-bold'>Original Bid: </span>{bidAmount} 🪙</p>
         <form onSubmit={handleHaggleSubmit}>
           <input
             type="number"
             value={hagglePrice}
             onChange={(e) => setHagglePrice(e.target.value)}
             min= { bidAmount===null ? 0 : bidAmount+1 }
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

  </div>
    
  );
};

export default Bid;