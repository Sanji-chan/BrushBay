// ViewBids.jsx
import React, { useState } from 'react';
import Bid from './Bid';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const ViewBids = ({ auth, status, bids }) => {
  const [filterStatus, setFilterStatus] = useState('All'); // 'all', 'accepted', or 'rejected'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  console.log(bids);

  // Toggle dropdowns
  const toggleStatusDropdown = () => setShowStatusDropdown(!showStatusDropdown);
  const toggleSortDropdown = () => setShowSortDropdown(!showSortDropdown);

  const getFilteredBids = () => {
    return bids.filter(bid => {
      if (filterStatus === 'All') return true;
      return filterStatus === 'Accepted' ? bid.bid_status === "Accepted" : bid.bid_status === "Rejected";
    });
  };

  const getSortedAndFilteredBids = () => {
    const filteredBids = getFilteredBids();
    return filteredBids.sort((a, b) => {
      const bidA = parseInt(a.bidAmount);
      const bidB = parseInt(b.bidAmount);
      if (sortDirection === 'asc') {
        return bidA - bidB;
      } else {
        return bidB - bidA;
      }
    });
  };


  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bids</h2>}      
    >

    <Head title="Bids" />
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12 pb-32">
      {/* <BidHeader /> */}
      <div className="flex justify-end gap-2 mb-4 mt-6 mr-4">
        <div className="relative">
          <button onClick={toggleStatusDropdown} className="bg-pink-500  font-bold text-white px-4 py-2 rounded-md focus:outline-none">
            Status
          </button>
          {showStatusDropdown && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">
              <a
                href="#"
                onClick={() => setFilterStatus('Accepted')}
                className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-pink-600 hover:text-white ${filterStatus === 'Accepted' ? 'bg-pink-600 text-white' : ''}`}>
                Accepted
              </a>
              <a
                href="#"
                onClick={() => setFilterStatus('Rejected')}
                className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-pink-600 hover:text-white ${filterStatus === 'Rejected' ? 'bg-pink-600 text-white' : ''}`}>
                Rejected
              </a>
              <a
                href="#"
                onClick={() => setFilterStatus('All')}
                className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-pink-600 hover:text-white ${filterStatus === 'All' ? 'bg-pink-600 text-white' : ''}`}>
                All
              </a>
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={toggleSortDropdown} className="bg-pink-500 text-white font-bold px-4 py-2 rounded-md focus:outline-none">
            Sort
          </button>
          {showSortDropdown && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">
              <a
                href="#"
                onClick={() => setSortDirection('asc')}
                className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-pink-600 hover:text-white ${sortDirection === 'asc' ? 'bg-pink-600 text-white' : ''}`}>
                Ascending
              </a>
              <a
                href="#"
                onClick={() => setSortDirection('desc')}
                className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-pink-600 hover:text-white ${sortDirection === 'desc' ? 'bg-pink-600 text-white' : ''}`}>
                Descending
              </a>
            </div>
          )}
        </div>
      </div>
      <div>
      <div className="pt-4 pb-6 px-6 text-gray-900" 
                  style={{
                     'font-size':'20px',
                      'font-weight':'600',
                   }}>Here's a list of your bids:
                </div>
  
      { getSortedAndFilteredBids().length > 0 ?  
              <div>
                
        {/* <p>Click 'Accept' to complete transfer of painting if the current highest bid is acceptable.</p>
        <p>Click 'Reject' to remove the bid placed on this painting.</p>
        <p>Click 'Haggle' to post a higher or lower bid to increase your profit or sale.</p> */}

        {getSortedAndFilteredBids().map((bidInfo, index) => (
          <Bid key={index} buyerName={bidInfo.buyer_name} title={bidInfo.title} initialbid={bidInfo.initial_bid} name={bidInfo.buyer_id} bidAmount={bidInfo.buyer_bid} bidStatus={bidInfo.bid_status} id={bidInfo.id} />
        ))}
              </div>
              : 
          
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900">Oh no! It looks like you don't have any bids on you posts at the moment.</div>
                </div>
     }
       
      </div>
    </div>
    </AuthenticatedLayout>
  );
};

ViewBids.defaultProps = {
  bids: [],
};

export default ViewBids;