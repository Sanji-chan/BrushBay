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
        <div className="ml-auto">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-400 cursor-pointer appearance-none"
          >
            <option value="">Select period</option>
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
  );
};

export default TradeHistory;
