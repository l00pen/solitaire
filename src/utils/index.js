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
  const newPile = [...pile];
  newPile.splice(cardSourceIndex, newPile.length);
  if (newPile.length > 0 && newPile[cardSourceIndex - 1].isFaceUp) {
    return newPile;
  }
  return setLastIsFaceUp(newPile);
}

const grabCardsToBeMoved = (cardSourceIndex, pile) => {
  return pile.slice(cardSourceIndex, pile.length);
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
  grabCardsToBeMoved,
  getLastCardInPile,
  setFaceIsUp,

  createArrayWithKeys,
  createEmptyPiles,
  getCardsFromDeck,
  everyCardIsSameSuite,
  arrayToObject,
};
