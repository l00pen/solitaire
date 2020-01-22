import { shuffleArray, clubs, diamonds, hearts, spades } from './index';

const deck = shuffleArray([clubs, diamonds, hearts, spades].flat());

const setLastIsFaceUp = (cards) => {
  if (cards.length === 0) {
    return cards;
  }

  const reverseCards = [...cards];
  const [last, ...allCards] = reverseCards.reverse();

  return [
    ...allCards,
    {
      ...last,
      isFaceUp: true,
    }
  ];
}

const getLastCardInPile = (cards) => {
  const reverseCards = [...cards];
  const [last, ] = reverseCards.reverse();
  return last;
}

const grabCardsToBeMoved = (cardSourceIndex, pile) => {
  return pile.slice(cardSourceIndex, pile.length);
}

const moveToPile = (cards, pile) => {
  const newPile = [...pile].concat(cards);
  return newPile;
}

const moveFromPile = (cardSourceIndex, pile) => {
  const newPile = [...pile];
  newPile.splice(cardSourceIndex, newPile.length);
  if (newPile.length > 0 && newPile[cardSourceIndex - 1].isFaceUp) {
    return newPile;
  }
  return setLastIsFaceUp(newPile);
}

const allowFoundationDrop = (cardsToBeMoved, destPile) => {
  const cardToBeMoved = cardsToBeMoved[0];

  if (cardsToBeMoved.length > 1) {
    return false;
  }

  if(cardToBeMoved.value === 1 && !destPile.length) {
    return true;
  }

  if (destPile.length) {
    const lastCardInPile = getLastCardInPile(destPile);

    const isSameSuite = lastCardInPile.suite === cardToBeMoved.suite;
    const isRightValue = lastCardInPile.value === (cardToBeMoved.value - 1);

    if(isSameSuite && isRightValue ) {
      return true;
    };
  }


  return false;
}

const foundationDropHandler = (game, {
    destinationPile
  }, {
    cardIndexInPile,
    sourcePile,
  }) => {
  const destPile = game[destinationPile];

  const cardsToBeMoved = grabCardsToBeMoved(cardIndexInPile, game[sourcePile]);
  
  if (allowFoundationDrop(cardsToBeMoved, destPile)) {
    const newDestination = moveToPile(cardsToBeMoved, game[destinationPile]);
    const newSource = moveFromPile(cardIndexInPile, game[sourcePile]);
    return {
      ...game,
      [destinationPile]: newDestination,
      [sourcePile]: newSource,
    };
  }

  return game;
}

const allowDropTableau = (cardsToBeMoved, destCardIndex, destinationPile, destCard) => {
  if (destinationPile.length === 0) {
    return true;
  }

  const firstCardToBeMoved = cardsToBeMoved[0];
  const lastCardInPile = destCardIndex === destinationPile.length - 1;
  const isOppositeColor = destCard.color !== firstCardToBeMoved.color;
  const isRightValue = destCard.value === firstCardToBeMoved.value + 1;

  return destCard.isFaceUp && lastCardInPile && isOppositeColor && isRightValue;
};

const tableauDropHandler = (game, {
  card: destCard,
  cardIndex: destCardIndex,
  destinationPile,
},{
  cardIndexInPile,
  sourcePile,
}) => {

  const cardsToBeMoved = grabCardsToBeMoved(cardIndexInPile, game[sourcePile]);

  if (allowDropTableau(cardsToBeMoved, destCardIndex, game[destinationPile], destCard)) {
    const newDestination = moveToPile(cardsToBeMoved, game[destinationPile]);
    const newSource = moveFromPile(cardIndexInPile, game[sourcePile]);
    return {
      ...game,
      [destinationPile]: newDestination,
      [sourcePile]: newSource,
    }
  }

  return game;
}


const stockClickHandler = (ev, game, { card }) => {
  const newCard = { ...card, isFaceUp: true };
  const newDestination = moveToPile([newCard], game['waste']);
  const newSource = moveFromPile(game.stock.length - 1, game['stock']);

  return {
    ...game,
    waste: newDestination,
    stock: newSource,
  };
}

const klondike = {
  foundation0: [],
  foundation1: [],
  foundation2: [],
  foundation3: [],
  tableau0: setLastIsFaceUp(deck.slice(0, 1)),
  tableau1: setLastIsFaceUp(deck.slice(1, 3)),
  tableau2: setLastIsFaceUp(deck.slice(3, 6)),
  tableau3: setLastIsFaceUp(deck.slice(6, 10)),
  tableau4: setLastIsFaceUp(deck.slice(10, 15)),
  tableau5: setLastIsFaceUp(deck.slice(15, 21)),
  tableau6: setLastIsFaceUp(deck.slice(21, 28)),
  stock: deck.slice(28),
  waste: [],

  tableauPilesKeys: [
    'tableau0',
    'tableau1',
    'tableau2',
    'tableau3',
    'tableau4',
    'tableau5',
    'tableau6',
  ],
  foundationPilesKeys: [
    'foundation0',
    'foundation1',
    'foundation2',
    'foundation3',
  ],
}

export {
  klondike,
  foundationDropHandler,
  tableauDropHandler,
  stockClickHandler,
}