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
    header={<h2 className="font-semi bold text-xl text-gray-800 leading-tight">Trade History</h2>}      
    >

    <Head title="Trade History" />
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-12 pb-32">
      {/* <HistoryHeader /> */}
      <div className="flex justify-between py-6 items-center">
        <div className="ml-auto">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="px-6 py-2 font-semibold border border-gray-300 text-gray-900 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            style= {{"background-image": "None"}}
          >
            <option value="" >Select period</option>
            <option value="week">Past week</option>
            <option value="month">Past Month</option>
            <option value="year">Past Year</option>
          </select>
        </div>
      </div>
      <div className="container mx-auto">

              <div className="pt-2 pb-6 px-6 text-gray-900" 
                  style={{
                     'font-size':'20px',
                      'font-weight':'600',
                   }}>Your Trade History:
                </div>
        { filteredData.length > 0 ?  
              <div>
  
          <div className="grid grid-cols-1 pt-4 md:grid-cols-3 gap-4">
              {filteredData.map((trade, index) => (
                <HistoryCard image={trade.paintingimg_link} title={trade.title} buyer={trade.buyer_id} seller={trade.seller_id} tradeDate={trade.created_at} price={trade.trade_amount} key={index} {...trade} />
              ))}
          </div> 
              </div>
              : 
          
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900">Oh no! It looks like haven't had any transaction.</div>
                </div>
     }


          
       
      </div>
    </div>
    </AuthenticatedLayout>

  );
};

export default TradeHistory;
