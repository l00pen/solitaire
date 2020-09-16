import spades from './spades';
import diamonds from './diamonds';
import hearts from './hearts';
import clubs from './clubs';

const shuffleArray = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const setLastIsFaceUp = (cards) => {
  if (cards.length === 0) {
    return cards;
  }

  const reverseCards = [...cards];
  const [last, ...allCards] = reverseCards.reverse();

  return [
    ...allCards,
    setFaceIsUp(last),
  ];
}

const setFaceIsUp = (card) => {
  return {
    ...card,
    isFaceUp: true,
  }
}

const moveToPile = (cards, pile) => {
  const newPile = [...pile].concat(cards);
  return newPile;
}

const moveFromPile = (cardSourceIndex, pile) => {
  var p1 = pile.slice(0, cardSourceIndex);
  var p2 = grabCardsToBeMoved(cardSourceIndex, pile);

  return {
    moved: p2.map(card => ({...card, isFaceUp: true })),
    remain: p1.map((card, i) => {
      if(i === p1.length - 1) {
        return {
          ...card,
          isFaceUp: true,
        }
      }
      return card;
    }),
  };
}

const moveCardsBetweenPilesInState = (state, { cardIndexAtSource, sourcePileKey, destPileKey }) => {
  const { moved, remain } = moveFromPile(cardIndexAtSource, state[sourcePileKey]);
  const newDestination = moveToPile(moved, state[destPileKey]);

  return {
    ...state,
    [destPileKey]: newDestination,
    [sourcePileKey]: remain,
  }
}

const cardDropHandler = (state, {destinationPile}, {cardIndexInPile, sourcePile}, allowDropHandler, dropConditions = {}) => {
  const { moved, remain } = moveFromPile(cardIndexInPile, state[sourcePile])
  if (allowDropHandler(moved, state[destinationPile], dropConditions)) {
    return {
      ...state,
      [sourcePile]: remain,
      [destinationPile]: moveToPile(moved, state[destinationPile]),
    };
  }

  return state;
}

const grabCardsToBeMoved = (cardSourceIndex, pile) => {
  return pile.slice(cardSourceIndex);
}

const getLastCardInPile = (cards) => {
  const reverseCards = [...cards];
  const [last, ] = reverseCards.reverse();
  return last;
}

const createArrayWithKeys = (keyName, nr) => {
  const foundationKeys = Array(nr).fill(keyName).map((value, i) => `${value}${i}`)
  return foundationKeys;
}

const createEmptyPiles = (piles) => {
  return piles.reduce((mem, key) => {
    return {
      ...mem,
      [key]: [],
    }
  }, {})
}

const getCardsFromDeck = (deck, nrOfCards) => {
  const cards = [];
  let counter = Math.min(nrOfCards, deck.length - 1);
  while(counter > 0) {
    cards.push(deck.pop());
    counter--;
  }
  return cards;
}

const everyCardIsSameSuite = (cards, suite) => {
  return cards.every(card => card.suite === suite);
}

const arrayToObject = (keys, values) => {
  const object = values.reduce((mem, obj, i) => {
    const key = keys[i]
    return {
      ...mem,
      [key]: obj
    }
  }, {});
  return object;
}

export {
  shuffleArray,
  clubs,
  spades,
  diamonds,
  hearts,
  setLastIsFaceUp,
  moveToPile,
  moveFromPile,
  moveCardsBetweenPilesInState,
  cardDropHandler,
  grabCardsToBeMoved,
  getLastCardInPile,
  setFaceIsUp,

  createArrayWithKeys,
  createEmptyPiles,
  getCardsFromDeck,
  everyCardIsSameSuite,
  arrayToObject,
};
