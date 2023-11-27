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

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* <div> */}
              { status ?  <StoreDisplay props = {posts} />: "No paintings found"}
        </div>

      </AuthenticatedLayout>
    );
}
