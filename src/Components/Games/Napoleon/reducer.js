import undoable from '../../../reducers/undoable';
import {
  shuffleArray,
  setFaceIsUp,
  clubs,
  diamonds,
  hearts,
  spades,
  createArrayWithKeys,
  createEmptyPiles,
  getCardsFromDeck,
  arrayToObject,
  moveCardsBetweenPilesInState,
  getLastCardInPile,
  everyCardIsSameSuite,
} from 'utils/';

const tableauPilesKeys = createArrayWithKeys('tableau', 12);
const foundationPilesKeys = createArrayWithKeys('foundation', 8);

const createDeck = () => {
  return [clubs, diamonds, hearts, spades, clubs, diamonds, hearts, spades].map((suite, i) => {
    return suite.map((card) => ({...card, key: `${card.id}${i}`}))
  }).flat()
}

const createFoundationPiles = (pileKeys) => {
  return createEmptyPiles(pileKeys)
}

const createTableauPilesFromDeck = (deck, pileKeys) => {
  const pilesWithCards = pileKeys.map((_, i) => {
    const cards = getCardsFromDeck(deck, 4).map(setFaceIsUp);
    return cards;
  });

  return arrayToObject(pileKeys, pilesWithCards);
}

const initialState = () => {
  let deck = shuffleArray(createDeck());
  const foundation = createFoundationPiles(foundationPilesKeys);
  const tableauPiles = createTableauPilesFromDeck(deck, tableauPilesKeys);
  return {
    ...foundation,
    ...tableauPiles,
    stock: deck,
    waste: [],
    hasWon: false,

    tableauPilesKeys,
    foundationPilesKeys,
  };
}

const stockClickHandler = (game, { card }) => {
  return moveCardsBetweenPilesInState(game, {
    cardIndexAtSource: game.stock.length - 1,
    sourcePileKey: 'stock',
    destPileKey: 'waste',
  });
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

  const allIsSpades = everyCardIsSameSuite(cardsToBeMoved, 'spades');
  const allIsHearts = everyCardIsSameSuite(cardsToBeMoved, 'hearts');
  const allIsClubs = everyCardIsSameSuite(cardsToBeMoved, 'clubs');
  const allIsDiamonds = everyCardIsSameSuite(cardsToBeMoved, 'diamonds');

  // TODO, check that its an allowed sequence
  if (allIsHearts || allIsSpades || allIsClubs || allIsDiamonds) {
    const lastCardInPile = getLastCardInPile(destinationPile);
    const firstCardToBeMoved = cardsToBeMoved[0];
    const isRightValue = lastCardInPile.value === firstCardToBeMoved.value + 1;
    const isSameSuite = lastCardInPile.suite === firstCardToBeMoved.suite;
    return isRightValue && isSameSuite;
  }

  return false;
};

const tableauClickHandler = (state, { card, cardIndexInPile, sourcePile }) => {
  const isLastCard = cardIndexInPile === (state[sourcePile].length - 1)
  const allowedFoundationPiles = isLastCard ? state.foundationPilesKeys.filter((pile) => {
    return allowFoundationDrop([card], state[pile]);
  }) : [];

  const allowedTableauPiles = state.tableauPilesKeys.filter((pile) => {
    return allowDropTableau([card], state[pile]);
  })

  const allowedPiles = allowedFoundationPiles.concat(allowedTableauPiles);

  if (allowedPiles.length) {
    const allowedPile = allowedPiles[0];

    return moveCardsBetweenPilesInState(state, {
      cardIndexAtSource: cardIndexInPile,
      sourcePileKey: sourcePile,
      destPileKey: allowedPile,
    });
  }

  return state;
}

const napoleonReducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'RE_DEAL':
      return initialState();
    case 'NAPOLEON_CLICK_STOCK':
      return stockClickHandler(state, action.payload);
    case 'NAPOLEON_CLICK_WASTE':
      return checkHasWon(tableauClickHandler(state, action.payload))
    case 'NAPOLEON_CLICK_TABLEAU':
      return checkHasWon(tableauClickHandler(state, action.payload))
    default:
      return state;
  }
};

export default undoable(napoleonReducer);