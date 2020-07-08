import undoable from './undoable';
import {
  shuffleArray,
  hearts,
  spades,
  clubs,
  diamonds,
  createEmptyPiles,
  getCardsFromDeck,
  setLastIsFaceUp,
  arrayToObject,
  createArrayWithKeys,
  cardDropHandler,
  getLastCardInPile,
} from 'utils/';

const tableauPilesKeys = createArrayWithKeys('tableau', 7);
const foundationPilesKeys = createArrayWithKeys('foundation', 4);

const createDeck = () => {
  return [clubs, diamonds, hearts, spades].map((suite, i) => {
    return suite.map((card) => ({...card, key: `${card.id}${i}`}))
  })
}

const createFoundationPiles = (pileKeys) => {
  return createEmptyPiles(pileKeys)
}

const createTableauPilesFromDeck = (deck, pileKeys) => {
  let klondikeDeal = pileKeys.map((_, i) => {
    const cards = getCardsFromDeck(deck, i + 1);
    return setLastIsFaceUp(cards);
  });

  let indexCounter = 1;
  while(deck.length > 0) {
    const dealtCard = deck.pop(); 
    klondikeDeal[indexCounter].push({...dealtCard, isFaceUp: true });
    indexCounter = (indexCounter % (klondikeDeal.length - 1)) + 1
  }

  return arrayToObject(pileKeys, klondikeDeal);
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


const allowDropTableau = (cardsToBeMoved, destinationPile) => {
  if (destinationPile.length === 0) {
    return true;
  }

  const lastCardInPile = getLastCardInPile(destinationPile);

  const firstCardToBeMoved = cardsToBeMoved[0];
  const isOppositeColor = lastCardInPile.color !== firstCardToBeMoved.color;
  const isRightValue = lastCardInPile.value === firstCardToBeMoved.value + 1;

  return lastCardInPile.isFaceUp && isOppositeColor && isRightValue;
};

const foundationDropHandler = (state, dropData, dragData) => {
  return cardDropHandler(state, dropData, dragData, allowFoundationDrop);
}

const tableauDropHandler = (state, dropData, dragData) => {
  return cardDropHandler(state, dropData, dragData, allowDropTableau);
}

const checkHasWon = (state) => {
  return {
    ...state,
    hasWon: foundationPilesKeys.reduce((mem, pileKey) => {
      const pile = state[pileKey];
      return mem && pile.length === 13;
    }, true)
  }
}

const init = () => {
  let deck = shuffleArray(createDeck().flat());
  const foundation = createFoundationPiles(foundationPilesKeys);
  const tableauPiles = createTableauPilesFromDeck(deck, tableauPilesKeys);
  return {
    ...foundation,
    ...tableauPiles,
    hasWon: false,

    tableauPilesKeys,
    foundationPilesKeys,
  };
}

const yukonReducer = (state = init(), action) => {
  switch (action.type) {
    case 'RE_DEAL':
      return init();
    case 'YUKON_DROP_FOUNDATION':
      return checkHasWon(foundationDropHandler(state, action.payload.dropData, action.payload.dragData))
    case 'YUKON_DROP_TABLEAU':
      return tableauDropHandler(state, action.payload.dropData, action.payload.dragData)
    default:
      return state;
  }
};

export default undoable(yukonReducer);