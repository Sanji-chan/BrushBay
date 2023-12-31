import Card from './Card';
// import card1 from '../../images/card1.jpg';
// import card2 from '../../images/card2.jpg';
function CardSection({ cards, auth }) {
    // const cards = [
    //     {
    //       id: 1,
    //       img: card1,
    //       title: 'Card Title 1',
    //       description: 'This is a description for card 1.',
    //       highestBid: '$500',
    //       currentBid: '$450',
    //       price: '$600'
    //     },
    //     {
    //       id: 2,
    //       img: card2,
    //       title: 'Card Title 2',
    //       description: 'This is a description for card 2.',
    //       highestBid: '$300',
    //       currentBid: '$250',
    //       price: '$350'
    //     }];
    // console.log(cards);
    return (
      cards.length == 0 ? 
        <div className='px-24 pt-4 pb-20'>
          You have no paintings of your own
        </div>
         :
        <div className="grid grid-cols-4 gap-4 mx-4 my-8 max-w-screen-lg mx-auto">
        {cards.map(card => (
          <Card key={card.id} id={card.id} title={card.title} description={card.description} img={card.paintingimg_link} auth={auth} tags={card.tag} />
        ))}
      </div>
      
      
    );
  }

  export default CardSection;