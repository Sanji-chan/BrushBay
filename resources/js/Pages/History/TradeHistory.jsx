import React, { useState, useEffect } from 'react';
// import HistoryHeader from './HistoryHeader';
import HistoryCard from './HistoryCard';


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const TradeHistory = ({ auth, status, tradeData=[] }) => {
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState(tradeData);

  useEffect(() => {
    const now = new Date();
    const filtered = tradeData.filter((trade) => {
      const tradeDate = new Date(trade.tradeDate);
      switch (filter) {
        case 'week':
          const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
          return tradeDate >= oneWeekAgo;
        case 'month':
          const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          return tradeDate >= oneMonthAgo;
        case 'year':
          const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          return tradeDate >= oneYearAgo;
        default:
          // If no filter is selected or the filter is 'all', return true for all trades.
          return true;
      }
    });
    setFilteredData(filtered);
  }, [filter, tradeData]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Trade History</h2>}      
    >

    <Head title="Trade History" />
    <div className="max-w-8xl mx-auto sm:px-6 lg:px-0 pt-12 pb-32 max-w-screen-lg">
      {/* <HistoryHeader /> */}
      <div className="flex justify-between p-6 items-center">
        <div className="ml-auto">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="bg-pink-500 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            <option value="" >Select period</option>
            <option value="week">Past week</option>
            <option value="month">Past Month</option>
            <option value="year">Past Year</option>
          </select>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredData.map((trade, index) => (
            <HistoryCard key={index} {...trade} />
          ))}
        </div>
      </div>
    </div>
    </AuthenticatedLayout>

  );
};

export default TradeHistory;
