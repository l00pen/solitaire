import undoable from 'reducers/undoable';
import {
  shuffleArray,
  setLastIsFaceUp,
  clubs,
  diamonds,
  hearts,
  spades,
  cardDropHandler,
  moveCardsBetweenPilesInState,
  getLastCardInPile,
  createArrayWithKeys,
  createEmptyPiles,
  getCardsFromDeck,
  arrayToObject,
} from 'utils/';

const tableauPilesKeys = createArrayWithKeys('tableau', 7);
const foundationPilesKeys = createArrayWithKeys('foundation', 4);

const createDeck = () => {
  return [clubs, diamonds, hearts, spades].map((suite, i) => {
    return suite.map((card) => ({...card, key: `${card.id}${i}`}))
  }).flat()
}

const createFoundationPiles = (pileKeys) => {
  return createEmptyPiles(pileKeys)
}

const createTableauPilesFromDeck = (deck, pileKeys) => {
  const pilesWithCards = pileKeys.map((_, i) => {
    const cards = getCardsFromDeck(deck, i + 1);
    return setLastIsFaceUp(cards);
  });

  return arrayToObject(pileKeys, pilesWithCards);
}

const initSettings = {
  stockTakes: '3',
  tableauEmptyAny: true,
  reRunDeck: false,
}

const init = () => {
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

    gameConditions: initSettings,
  };
}

const stockClickHandler = (state, { card }) => {
  return moveCardsBetweenPilesInState(state, {
    cardIndexAtSource: state.stock.length - parseInt(state.gameConditions.stockTakes),
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

const tableauClickHandler = (state, { card, cardIndexInPile, sourcePile }) => {
  const isLastCard = cardIndexInPile === (state[sourcePile].length - 1)
  const allowedFoundationPiles = isLastCard ? state.foundationPilesKeys.filter((pile) => {
    return allowFoundationDrop([card], state[pile]);
  }) : [];

  const allowedTableauPiles = state.tableauPilesKeys.filter((pile) => {
    return allowDropTableau([card], state[pile], state.gameConditions);
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


const allowDropTableau = (cardsToBeMoved, destinationPile, conditions) => {
  const firstCardToBeMoved = cardsToBeMoved[0];

  if (destinationPile.length === 0) {
    return conditions.tableauEmptyAny || firstCardToBeMoved.value === 13;
  }

  const lastCardInPile = getLastCardInPile(destinationPile);

  const isOppositeColor = lastCardInPile.color !== firstCardToBeMoved.color;
  const isRightValue = lastCardInPile.value === firstCardToBeMoved.value + 1;

  return lastCardInPile.isFaceUp && isOppositeColor && isRightValue;
};

const foundationDropHandler = (game, dropData, dragData) => {
  return cardDropHandler(game, dropData, dragData, allowFoundationDrop);
}

const tableauDropHandler = (state, dropData, dragData) => {
  return cardDropHandler(state, dropData, dragData, allowDropTableau, state.gameConditions);
}

const initialState = init();

const klondikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RE_DEAL':
      return init();
    case 'RE_RUN_DECK':
      if (state.gameConditions.reRunDeck) {
        const newStock = [...state.waste].reverse();
        return {
          ...state,
          waste: [],
          stock: newStock,
        }
      }
      return state;
    case 'CLICK_STOCK':
      return stockClickHandler(state, action.payload)
    case 'CLICK_TABLEAU':
      return checkHasWon(tableauClickHandler(state, action.payload))
    case 'CLICK_WASTE':
      return checkHasWon(tableauClickHandler(state, action.payload))
    case 'DROP_FOUNDATION':
      return checkHasWon(foundationDropHandler(state, action.payload.dropData, action.payload.dragData))
    case 'DROP_TABLEAU':
      return tableauDropHandler(state, action.payload.dropData, action.payload.dragData)
    case 'SETTINGS_ON_CHANGE':
      const { name, value } =action.payload;
      console.log({name, value})
      return {
        ...state,
        gameConditions: {
          ...state.gameConditions,
          [name]: value,
        }
      };
    default:
      return state;
  }
};

export default undoable(klondikeReducer);