// ViewBids.jsx
import React from 'react';
import BidHeader from './BidHeader';
import Bid from './Bid';

const ViewBids = ({ bids }) => {
  // Check if bids is defined and is an array
  if (!Array.isArray(bids)) {
    return <div>No bids available 😔</div>;
  }

  return (
    <div>
      <BidHeader />
      <div>
        {bids.map((bidInfo, index) => (
          <Bid key={index} name={bidInfo.name} bidAmount={bidInfo.bidAmount} />
        ))}
      </div>
    </div>
  );
};

// Providing default props in case bids is not passed
ViewBids.defaultProps = {
  bids: [],
};

export default ViewBids;
