import React from 'react';
// import Modal from 'react-modal';
// import Navbar from '../../components/Navbar';
// import Header from './Header';

// import CardSection from '../../Components/CardSection';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function Market({ auth, status, posts }) {

    return (
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Marketplace</h2>}      
      >

        <Head title="Marketplace" />

        <div>
        { status ? "Posts found" : "No paintings found"}
        { posts.map(post => (
          <div>
            {/* <img className="w-full h-full object-cover" src={"http://127.0.0.1:8000/storage/" + post.paintingimg_link } alt={post.title} /> */}

            {post.id}
            {/* {post.painting_id}
            {post.title}
            {post.description}
            {post.author_id}
            {post.paintingimg_link }
            {post.tag} */}
          </div>
        )) }

      </div>

      </AuthenticatedLayout>
    );
}
