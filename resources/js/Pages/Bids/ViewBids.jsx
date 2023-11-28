// ViewBids.jsx
import React, { useState } from 'react';
// import BidHeader from './BidHeader';
import Bid from './Bid';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const ViewBids = ({ auth, status, bids }) => {
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', or 'notActive'
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Toggle dropdowns
  const toggleStatusDropdown = () => setShowStatusDropdown(!showStatusDropdown);
  const toggleSortDropdown = () => setShowSortDropdown(!showSortDropdown);

  const getFilteredBids = () => {
    return bids.filter(bid => {
      if (filterStatus === 'all') return true;
      return filterStatus === 'active' ? bid.bidStatus === "Active" : bid.bidStatus === "Not Active";
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
    <div className="max-w-8xl mx-auto sm:px-6 lg:px-0 pt-12 pb-32 max-w-screen-lg">
      {/* <BidHeader /> */}
      <div className="flex justify-end gap-2 mb-4 mt-6 mr-4">
        <div className="relative">
          <button onClick={toggleStatusDropdown} className="bg-pink-500 text-white px-4 py-2 rounded-md focus:outline-none">
            Status
          </button>
          {showStatusDropdown && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">
              <a
                href="#"
                onClick={() => setFilterStatus('active')}
                className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-pink-600 hover:text-white ${filterStatus === 'active' ? 'bg-pink-600 text-white' : ''}`}>
                Active
              </a>
              <a
                href="#"
                onClick={() => setFilterStatus('notActive')}
                className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-pink-600 hover:text-white ${filterStatus === 'notActive' ? 'bg-pink-600 text-white' : ''}`}>
                Not Active
              </a>
              <a
                href="#"
                onClick={() => setFilterStatus('all')}
                className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-pink-600 hover:text-white ${filterStatus === 'all' ? 'bg-pink-600 text-white' : ''}`}>
                All
              </a>
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={toggleSortDropdown} className="bg-pink-500 text-white px-4 py-2 rounded-md focus:outline-none">
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
        {getSortedAndFilteredBids().map((bidInfo, index) => (
          <Bid key={index} name={bidInfo.name} bidAmount={bidInfo.bidAmount} bidStatus={bidInfo.bidStatus} />
        ))}
      </div>
    </div>
    </AuthenticatedLayout>
  );
};

ViewBids.defaultProps = {
  bids: [],
};

export default ViewBids;