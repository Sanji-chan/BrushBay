const Modal = ({ isOpen, onClose, store }) => {
  if (!isOpen || !store) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 transition duration-300 ease-in-out">
      <div className="bg-white w-1/2 rounded-lg shadow-2xl overflow-hidden flex flex-col transform transition-all duration-300 ease-in-out relative">
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 transition duration-300 ease-in-out text-3xl"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Image container with fixed aspect ratio */}
        <div
          className="w-full overflow-hidden"
          style={{ aspectRatio: "16 / 9" }}
        >
          <img
           src={"http://127.0.0.1:8000/storage/" + store.paintingimg_link } 
           alt={store.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text content */}
        <div className="flex-grow flex-shrink w-full p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {store.title}
          </h2>
          <p className="text-gray-600 mb-2">
            Description: {store.description} {/* Description here */}
          </p>
          <p className="text-gray-600 mb-2">
             Author: { store.author_id }
          </p>
          <p className="text-gray-600 mb-2">
            Owner:  { store.seller_id}
          </p>
          <p className="text-gray-600 mb-2">
          Highest Bid:  { store.highest_bid===null ? "No bid posted yet" : store.highest_bid }
 {/* Bid value here */}
          </p>
          <p className="text-gray-600 mb-2">
            Inital Bid:  { store.inital_bid===null ? "N/A": store.initial_bid }
          </p>
          <p className="text-gray-600 mb-2">
          Date of Creation: {store.created_at} {/* Date here */}
          </p>
          <p className="text-gray-600 mb-4">
          Date of Post: {store.updated_at}
{/* Date here */}</p>
          {/* Bid Now Section */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Bid"
              className="border-2 border-gray-300 rounded p-2 mr-2 w-full md:w-auto"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
