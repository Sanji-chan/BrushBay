import Card from './Card';
import Card2 from './Card2';

function CardSection({ cards, auth }) {

    return (
      <>
            <div className="pt-2 pb-6 px-6 text-gray-900" 
                  style={{
                     'font-size':'20px',
                      'font-weight':'600',
                   }}>NFT arts you own:
                </div>

    {cards.length == 0 ? 
    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
    <div className="p-6 text-gray-900">Oh no! It looks like you do don't own any paintings. Bid for new paintings or add one above.</div>
    </div>
      :
      <div className='container mx-auto'>
          <div className=" max-w-screen-lg grid grid-cols-1 md:grid-cols-3 gap-4  mx-auto">
            {cards.map(card => (
              <Card2 key={card.id} id={card.id} title={card.title} description={card.description}
                    img={card.paintingimg_link} auth={auth}
                    highestBid={card.highest_bid}
                    currentBid={card.initial_bid}
                    tags={card.tag} market_state={card.post_status}/>
            ))}
          </div>
      </div>
 } </>
    );
  }

  export default CardSection;