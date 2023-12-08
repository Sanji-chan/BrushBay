import React, { useState, useEffect } from 'react';
import HistoryHeader from './HistoryHeader';
import HistoryCard from './HistoryCard';

const TradeHistory = ({ tradeData }) => {
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
    <div>
      <HistoryHeader />
      <div className="flex justify-between p-4 items-center">
        {/* <div className="ml-auto">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="bg-pink-500 text-white px-4 py-2 rounded-md focus:outline-none"
            style={{ border: none}}
            
          >
            <option value="">Select period</option>
            <option value="week">Past week</option>
            <option value="month">Past Month</option>
            <option value="year">Past Year</option>
          </select>
        </div> */}

<div className="relative">
          <button onClick={toggleStatusDropdown} className="bg-pink-500 text-white px-4 py-2 rounded-md focus:outline-none">
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
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredData.map((trade, index) => (
            <HistoryCard key={index} {...trade} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradeHistory;
