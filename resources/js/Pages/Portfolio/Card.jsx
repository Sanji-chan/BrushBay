import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Axios from 'axios';
import Modal from 'react-modal';
import PostForm from './PostForm'; 

function Card({ id, img, title, description, highestBid, currentBid, price, tags, auth }) {
      const [modalIsOpen, setModalIsOpen] = useState(false);

      function openModal() {
          setModalIsOpen(true);
      }

      function closeModal() {
          setModalIsOpen(false);
      }

      const submitdata = (e) => {
          e.preventDefault();
          const parsedUserId = parseInt(id, 10); // Parse painting_id as an integer
          Axios.post(`http://127.0.0.1:8000/api/paintings/addPost/${parsedUserId}`)

          .then(res => {
              console.log('Response', res.data);
          })
          .catch(e => {
              console.error('Failure', e.response.data);
          });
      };

      const deletePainting = (e) => {
        e.preventDefault();
        Axios.delete(`http://127.0.0.1:8000/api/paintings/${id}`);
      }

      

    return (
        <div className="border rounded overflow-hidden shadow-lg max-w-sm mx-auto my-4 mx-2">
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
        <img className="w-full h-full object-cover" src={"http://127.0.0.1:8000/storage/" + img} alt={title} />
      </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
          <p className="text-gray-700 text-base"><span className="font-bold">Highest Bid: </span>{highestBid}</p>
          <p className="text-gray-700 text-base"><span className="font-bold">Current Bid: </span>{currentBid}</p>
          <p className="text-gray-700 text-base"><span className="font-bold">Price: </span>{price}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button 
          onClick={submitdata}
          className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded"
          >
            Add to Marketplace
          </button>
        </div>
        <div className="px-6 pb-2">
        <button 
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
          >
            Update Painting
          </button>          
        </div>
        <div className="px-6 pb-2">
        <button 
          onClick={deletePainting}
          className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
          >
            <Link href={route('dashboard')}>
              Delete Painting
            </Link>
            
          </button>          
        </div>
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
          <PostForm user={auth.user} modelState={setModalIsOpen} update={true} data={ {'id': id, 'title': title, 'desc': description, 'tags': tags} }/>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div>
    );
  }

  export default Card;