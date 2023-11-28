import React, { useState, useRef } from "react";

const Portfolio = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAddedToMarket, setIsAddedToMarket] = useState(false);
  const [initialBid, setInitialBid] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const modalRef = useRef();
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = () => {
    if (!initialBid || Number(initialBid) < 0 || !endDate || endDate < today) {
      setErrorMessage("Invalid Bid or End Date");
    } else {
      console.log("Initial Bid:", initialBid, "End Date:", endDate);
      setIsAddedToMarket(true);
      setErrorMessage("");
      setShowModal(false);
    }
  };

  const handleMarketAction = () => {
    if (isAddedToMarket) {
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
        .profile-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Card Styling */
        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
          width: 30%; 
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
        <div className="card">
          <img
            src="/nahin-background.jpg"
            alt="Profile"
            className="profile-image"
          />

          <button className="profile-button" onClick={handleMarketAction}>
            {isAddedToMarket ? "Remove from Market" : "Add to Marketplace"}
          </button>
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

export default Portfolio;
