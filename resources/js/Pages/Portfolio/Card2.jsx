import React, { useState, useRef  } from "react";
import { Link } from '@inertiajs/react';
import Axios from 'axios';
import Modal from 'react-modal';
import PostForm from './PostForm'; 


const Card2 = ({ id, img, title, description, highestBid, currentBid, price, tags, auth, market_state }) => {
    //Sanjida and Namirul part
     const [modalIsOpen, setModalIsOpen] = useState(false);

      function openModal() {
          setModalIsOpen(true);
      }

      function closeModal() {
          setModalIsOpen(false);
      }
      
      const deletePainting = (e) => {
        e.preventDefault();
        Axios.delete(`http://127.0.0.1:8000/api/paintings/${id}`);
      }


  // Nahin part
  const [showModal, setShowModal] = useState(false);


  const [isAddedToMarket, setIsAddedToMarket] = useState(market_state==='active');
  
  const [initialBid, setInitialBid] = useState(currentBid);
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const modalRef = useRef();
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    
    if (!initialBid || Number(initialBid) < 0 || !endDate || endDate < today) {
      setErrorMessage("Invalid Bid or End Date");
    } else {
      console.log("Initial Bid:", initialBid, "End Date:", endDate);
      e.preventDefault();
      const parsedUserId = parseInt(id, 10); // Parse painting_id as an integer
      Axios.post(`http://127.0.0.1:8000/api/paintings/addPost/${parsedUserId}`, [initialBid, endDate])

     .then(res => {
        console.log('Response', res.data);
      })
     .catch(e => {
        console.error('Failure', e.response.data);
      });
      setIsAddedToMarket(true);
      setErrorMessage("");
      setShowModal(false);
    }
  };

  const handleMarketAction = (e) => {
 
    if (isAddedToMarket) {
      e.preventDefault();
      const parsedUserId = parseInt(id, 10); // Parse painting_id as an integer
      Axios.get(`http://127.0.0.1:8000/api/paintings/removePost/${parsedUserId}`)

     .then(res => {
        console.log('Response', res.data);
      })
     .catch(e => {
        console.error('Failure', e.response.data);
      });
      console.log("Removed from Market");
      setIsAddedToMarket(false);
    } else {
      setShowModal(true);
    }
  };


  const handleInitialBidChange = (e) => {
    setInitialBid(e.target.value);
  };

  const handleCloseModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
      setErrorMessage("");
    }
  };


  // Split the description into an array of words
  const words = description.split(/\s+/);

  // Extract the first 10 words
  const firstTenWords = words.slice(0, 10);

  // Join the first ten words back into a string
  const truncatedDescription = firstTenWords.join(' ');


  
  const buttonStyle = {
    marginRight: '10px', // Add margin to create space between buttons
  };

  return (
    <>
      <style>{`
        /* Global Styles */
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f3f4f6;  
          margin: 0; 
          padding: 0; 
        }

        /* Main Layout */
        // .profile-container {
        //   min-height: 100vh;
        //   display: flex;
        //   align-items: center;
        //   justify-content: center;
        // }

        /* Card Styling */
        .card {
          display: flex;
          flex-direction: column;
          // align-items: center;
          // padding: 40px;
          // width: 30%; 
          height: 70vh; 
          border-radius: 12px; 
          background-color: #ffffff; 
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); 
          transition: transform 0.3s;
        }

        .card:hover {
          transform: scale(1.03); 
        }

        /* Profile Image */
        .profile-image {
          width: 100%; 
          height: auto; 
          border-radius: 1px; 
          margin-bottom: 0px; 
          flex-grow: 0.3; 
        }

        /* Profile Actions (Buttons) */
        .profile-button {
          background-color: #4b5563; 
          color: white;
          font-weight: bold;
          padding: 10px 30px;
          border-radius: 20px; 
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;
          margin-top: 10px; 
          font-size: 1rem;
          flex-shrink: 0; 
        }

        .profile-button:hover {
          background-color: #374151; /* Slightly darker on hover */
          transform: scale(1.02);
        }

        /* Modal Styles */
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6); 
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000; 
        }

        .modal-content {
          background: #f8fafc;
          padding: 30px;
          border-radius: 15px; 
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15); 
          width: 25%; 
          animation: modalFadeIn 0.3s; 
        }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: 1px solid #d1d5db; 
          font-size: 1rem; 
          color: #374151; 
        }

        .modal-input:focus {
          outline: none;
          border-color: #4b5563; 
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); 
        }

        .modal-button {
          background-color: #4b5563; 
          color: white;
          font-weight: bold;
          padding: 10px 30px;
          border-radius: 20px; 
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;
          margin-top: 20px;
          font-size: 1rem;
          width: 100%; 
        }

        .modal-button:hover {
          background-color: #374151; 
        }

        /* Error Message Styles */
        .error-message {
          color: #dc2626; 
          font-size: 0.9rem; 
          margin-top: 10px; 
          margin-bottom: 20px; 
          text-align: center; 
          width: 100%; 
        }
        
      `}</style>

      <div className="profile-container">
        <div className="card border rounded overflow-hidden shadow-lg max-w-sm mx-auto my-4 mx-2">
        <img className="w-full h-full object-cover" src={"http://127.0.0.1:8000/storage/" + img} alt={title} />
        <div className="px-4">
          <div className="font-bold text-pink-700 text-xl my-2">{title}</div>
          <p className="text-gray-700 text-base">{words.length <= 10 ? description : truncatedDescription}....</p>
          <p className="text-gray-700 text-base"><span className="font-bold">Highest Bid: </span>{ highestBid===null ? "N/A" : highestBid }</p>
          <p className="text-gray-700 text-base mb-2"><span className="font-bold">Your start Bid: </span>{ initialBid===null ? "N/A" : initialBid }</p>
          {/* <p className="text-gray-700 text-base"><span className="font-bold">Price: </span>{price}</p> */}
        </div>
        <div className="px-2 pb-2 mb-2">
          <button style={buttonStyle} 
                  className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded" 
                  onClick={handleMarketAction}>
            {isAddedToMarket? "-" : "+"}
          </button>

          <button 
              style={buttonStyle}
              onClick={openModal}
              className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded mb-2"
              >
            Update Painting
          </button>          

          <button 
          style={buttonStyle}
            onClick={deletePainting}
            className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded mb-2"
            >
              <Link href={route('dashboard')}>
                Delete Painting
              </Link>  
          </button> 
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
          </div>
      </div>

      {showModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" ref={modalRef}>
            <label className="modal-label">Initial Bid</label>
            <input
              type="number"
              className="modal-input"
              value={initialBid}
              onChange={handleInitialBidChange}
              min="0"
            />

            <label className="modal-label">End Date</label>
            <input
              type="date"
              className="modal-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={today}
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="modal-button" onClick={handleSubmit}>
              Add to Market
            </button>


           
          </div>


      </div>
      )}
    </>
  );
};

export default Card2;
