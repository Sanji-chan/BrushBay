// ViewBids.jsx
import React from 'react';
// import BidHeader from './BidHeader';
import Bid from './Bid';


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const ViewBids = ({ auth, status, bids }) => {

  return (
      <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bids</h2>}      
      >

      <Head title="Bids" />


          <div className="pt-12 pb-64">
              {/* <BidHeader /> */}
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="p-6 text-gray-900" 
                                 style={{
                                  'font-size':'20px',
                                  'font-weight':'600',
                                 }}> Bids made on your posts</div>

                {bids.length > 0 ? 
                <div> 
                    {bids.map((bidInfo, index) => (
                      <Bid key={index} name={bidInfo.name} bidAmount={bidInfo.bidAmount} />
                    ))}
                </div> 
                  
              : 
                <div  className="bg-white overflow-hidden shadow-sm sm:rounded-lg" >
                <div className="p-6 text-gray-900">No bids available 😔</div>
               </div>
              
              }
              </div>
          </div>

      </AuthenticatedLayout>
        
  
  );
};

// Providing default props in case bids is not passed
ViewBids.defaultProps = {
  bids: [],
};

export default ViewBids;
