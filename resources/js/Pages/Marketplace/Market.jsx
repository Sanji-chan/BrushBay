import React, { useState } from 'react';
import Modal from 'react-modal';
// import Navbar from '../../components/Navbar';
// import Header from './Header';

import CardSection from '../../Components/CardSection';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function Market({ auth, paintings }) {

    return (
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Marketplace</h2>}      
      >

        <Head title="Marketplace" />

        <div>

        {/* <CardSection cards = { paintings } /> */}

      </div>

      </AuthenticatedLayout>

    );
}
