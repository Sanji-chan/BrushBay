import Card from './Card';
import Card2 from './Card2';

function CardSection({ cards, auth }) {

    return (
      cards.length == 0 ? 
        <div className='px-24 pt-4 pb-20'>
          You have no paintings of your own
        </div>
         :
         <div className='container mx-auto'>
            <div className=" max-w-screen-lg grid grid-cols-1 md:grid-cols-3 gap-4">
              {cards.map(card => (
                <Card2 key={card.id} id={card.id} title={card.title} description={card.description}
                      img={card.paintingimg_link} auth={auth}
                      highestBid={card.highest_bid}
                      currentBid={card.initial_bid}
                      tags={card.tag} market_state={card.post_status}/>
              ))}
            </div>
         </div>
       
    );
  }

  export default CardSection;