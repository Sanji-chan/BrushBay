function Card({ img, title, description, highestBid, currentBid, price }) {
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
          <button className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded">
            Add to Marketplace
          </button>
        </div>
      </div>
    );
  }

  export default Card;