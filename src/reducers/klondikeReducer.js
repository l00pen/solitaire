import undoable from './undoable';
import {
  shuffleArray,
  setLastIsFaceUp,
  clubs,
  diamonds,
  hearts,
  spades,
  moveToPile,
  moveFromPile,
  grabCardsToBeMoved,
  getLastCardInPile,
  createArrayWithKeys,
  createEmptyPiles,
  getCardsFromMutableDeck,
} from '../utils/';

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

const createTableauPilesFromDeck = (deckOrigin, pileKeys) => {
  let mutableDeck = [...deckOrigin];
  const tableauPiles = pileKeys.reduce((mem, obj, i) => {
    let { deck, cards } = getCardsFromMutableDeck(mutableDeck, i + 1);
    mutableDeck = deck;
    return {
      ...mem,
      [obj]: setLastIsFaceUp(cards)
    }
  }, {});

  return {
    deck: mutableDeck,
    tableauPiles,
  }
}

const init = () => {
  const deck = shuffleArray(createDeck().flat());
  const foundation = createFoundationPiles(foundationPilesKeys);
  const {
    deck: stock,
    tableauPiles, 
  } = createTableauPilesFromDeck(deck, tableauPilesKeys);
  return {
    ...foundation,
    ...tableauPiles,
    stock,
    waste: [],

    tableauPilesKeys,
    foundationPilesKeys,
  };
}

const stockClickHandler = (game, { card }) => {
  const newCard = { ...card, isFaceUp: true };
  const newDestination = moveToPile([newCard], game['waste']);
  const newSource = moveFromPile(game.stock.length - 1, game['stock']);

  return {
    ...game,
    waste: newDestination,
    stock: newSource,
  };
}

const tableauClickHandler = (state, { card, cardIndexInPile, sourcePile }) => {
  const allowedFoundationPiles = state.foundationPilesKeys.filter((pile) => {
    return allowFoundationDrop([card], state[pile]);
  })

  const allowedTableauPiles = state.tableauPilesKeys.filter((pile) => {
    const destinationPile = state[pile];
    const destCardIndex = destinationPile.length - 1;
    const destCard = destinationPile[destCardIndex];
    return allowDropTableau([card], destCardIndex, destinationPile, destCard);
  })

  const allowedPiles = allowedFoundationPiles.concat(allowedTableauPiles);

  if (allowedPiles.length) {
    const allowedPile = allowedPiles[0];
    const cardsToBeMoved = grabCardsToBeMoved(cardIndexInPile, state[sourcePile])
    const newDestination = moveToPile(cardsToBeMoved, state[allowedPile]);
    const newSource = moveFromPile(cardIndexInPile, state[sourcePile]);
    return {
      ...state,
      [allowedPile]: newDestination,
      [sourcePile]: newSource,
    };
  }

  return state;
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

const foundationDropHandler = (game, {destinationPile}, {cardIndexInPile, sourcePile}) => {
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

const klondikeReducer = (state = init(), action) => {
  switch (action.type) {
    case 'RE_DEAL':
      return init();
    case 'RE_RUN_DECK':
      const newStock = [...state.waste].reverse();
      return {
        ...state,
        waste: [],
        stock: newStock,
      }
    case 'CLICK_STOCK':
      return stockClickHandler(state, action.payload)
    case 'CLICK_TABLEAU':
      return tableauClickHandler(state, action.payload)
    case 'CLICK_WASTE':
      return tableauClickHandler(state, action.payload)
    case 'DROP_FOUNDATION':
      return foundationDropHandler(state, action.payload.dropData, action.payload.dragData, )
    case 'DROP_TABLEAU':
      return tableauDropHandler(state, action.payload.dropData, action.payload.dragData, )
    default:
      return state;
  }
};

export default undoable(klondikeReducer);