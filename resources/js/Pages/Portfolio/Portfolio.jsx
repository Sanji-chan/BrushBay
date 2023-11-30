import React, { useState } from 'react';
import Modal from 'react-modal';
// import Navbar from '../../components/Navbar';
// import Header from './Header';
import CardSection from './CardSection';
import PostForm from './PostForm'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Modal.setAppElement('#root');

export default function Portfolio({ auth, paintings }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    console.log(paintings);
    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Portfolio</h2>}      
      >

        <Head title="Portfolio" />

        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 pt-12 pb-32 max-w-screen-lg">


        <div className="flex justify-end">
          <button 
            className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Create Painting
          </button>
        </div>
        <CardSection cards = { paintings } auth={auth} />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Create Post Form"
          // Custom styles
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)'
            }
          }}
        >
          <PostForm user={auth.user} modelState={setModalIsOpen} update={false}/>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div>

      </AuthenticatedLayout>

    );
}

// export default Portfolio;
