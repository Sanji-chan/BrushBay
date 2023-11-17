import Card from './Card';
// import card1 from '../../images/card1.jpg';
// import card2 from '../../images/card2.jpg';
function CardSection({ cards }) {
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
      <div className="grid grid-cols-3 gap-4 mx-4 my-8 max-w-screen-lg mx-auto">
        {cards.map(card => (
          <Card id={card.id} title={card.title} description={card.description} img={card.paintingimg_link} />
        ))}
      </div>
    );
  }

  export default CardSection;