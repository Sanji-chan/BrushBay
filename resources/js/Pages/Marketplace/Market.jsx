import React from 'react';
// import Modal from 'react-modal';

import StoreDisplay from './StoreDisplay';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function Market({ auth, status, posts }) {

    return (
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Marketplace</h2>}      
      >

        <Head title="Marketplace" />

        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 pt-12 pb-32">
              { status ?  <StoreDisplay props = {posts} />
              : 
          
              <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                <div className="p-6 text-gray-900" 
                                 style={{
                                  'font-size':'20px',
                                  'font-weight':'600',
                                 }}>Your Market
                </div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900"> No paintings available for bidding in market.</div>
                </div>
              </div>
     }
        </div>

      </AuthenticatedLayout>
    );
}
