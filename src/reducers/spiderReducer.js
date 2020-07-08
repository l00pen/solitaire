import undoable from './undoable';
import {
  shuffleArray,
  setLastIsFaceUp,
  hearts,
  spades,
  moveToPile,
  moveFromPile,
  moveCardsBetweenPilesInState,
  cardDropHandler,
  createArrayWithKeys,
  createEmptyPiles,
  getCardsFromDeck,
  everyCardIsSameSuite,
  arrayToObject,
  getLastCardInPile,
} from 'utils/';

const createDeck = () => {
  return [
    spades, hearts, hearts, spades,
    spades, hearts, hearts, spades,
  ].map((suite, i) => {
    return suite.map((card) => ({...card, key: `${card.id}${i}`}))
  })
}

const tableauPilesKeys = createArrayWithKeys('tableau', 10);
const foundationPilesKeys = createArrayWithKeys('foundation', 8);

const createFoundationPiles = (pileKeys) => {
  return createEmptyPiles(pileKeys)
}

const createTableauPilesFromDeck = (deck, pileKeys) => {
  const splitAtNr = 4;
  const pilesWithCards = pileKeys.map((_, i) => {
    const nrOfCards = i < splitAtNr ? 6 : 5;
    const cards = getCardsFromDeck(deck, nrOfCards);
    return setLastIsFaceUp(cards)
  });
  return arrayToObject(pileKeys, pilesWithCards);
}

const init = () => {
  let deck = shuffleArray(createDeck().flat());
  const foundation = createFoundationPiles(foundationPilesKeys);
  const tableauPiles = createTableauPilesFromDeck(deck, tableauPilesKeys);
  return {
    ...foundation,
    ...tableauPiles,
    stock: deck,
    hasWon: false,

    tableauPilesKeys,
    foundationPilesKeys,
  };
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

const stockClickHandler = (state) => {
  const numberOfcards = Math.min(tableauPilesKeys.length, state.stock.length);
  const cardsAtIndex = state.stock.length - numberOfcards;
  const { moved, remain: newStock } = moveFromPile(cardsAtIndex, state.stock);

  const newTableau = tableauPilesKeys.reduce((mem, tableauId) => {
    if (moved.length) {
      return {
        ...mem,
        [tableauId]: moveToPile([moved.pop()], state[tableauId])
      }
    }
    return mem;
  }, {})

  return {
    ...state,
    stock: newStock,
    ...newTableau,
  };
}

const findFirstAvailableFoundation = (state) => {
  const index = foundationPilesKeys.findIndex((key) => {
    return state[key].length === 0;
  });

  return foundationPilesKeys[index];
}

const allowDropTableau = (cardsToBeMoved, destinationPile) => {
  if (destinationPile.length === 0) {
    return true;
  }

  const allIsSpades = everyCardIsSameSuite(cardsToBeMoved, 'spades');
  const allIsHearts = everyCardIsSameSuite(cardsToBeMoved, 'hearts');

  // TODO, check that its an allowed sequence
  if (allIsHearts || allIsSpades) {

    const lastCardInPile = getLastCardInPile(destinationPile);
    const firstCardToBeMoved = cardsToBeMoved[0];
    const isRightValue = lastCardInPile.value === firstCardToBeMoved.value + 1;

    return isRightValue;
  }

  return false;
};

const moveToFoundationPile = (state, sourcePileKey) => {
  // TODO rewrite this to something readable
  const sourcePile = [...state[sourcePileKey]];
  const potentialMove = sourcePile.reduce((mem, obj, i) => {
    if (mem.length === 13) {
      return mem;
    }

    if (obj.value === 13 && obj.isFaceUp) {
      return [obj];
    }
    
    if (mem.length > 0) {
      const prevCard = mem[mem.length-1];
      if ((prevCard.value === obj.value + 1) && (prevCard.suite === obj.suite)) {
        mem.push(obj)
        return mem;
      }
      return [];
    }
    return mem;
  }, []);

  if (potentialMove.length === 13) {
    const cardsAtIndex = state[sourcePileKey].findIndex((card) => {
      // TODO fix key's and id's
      return card.key === potentialMove[0].key
    })

    const foundationToMoveTo = findFirstAvailableFoundation(state);
    return moveCardsBetweenPilesInState(state, {
      cardIndexAtSource: cardsAtIndex,
      sourcePileKey,
      destPileKey: foundationToMoveTo,
    });
  }

  return state;
}

const tableauDropHandler = (state, { dropData, dragData }) => {
  return cardDropHandler(state, dropData, dragData, allowDropTableau);
}

const tableauClickHandler = (state, clickData) => {
  const { card, cardIndexInPile, sourcePile } = clickData;

  const allowedTableauPiles = state.tableauPilesKeys.filter((pile) => {
    return allowDropTableau([card], state[pile]);
  })

  if (allowedTableauPiles.length) {
    const allowedPile = allowedTableauPiles[0];
    const afterClickState = cardDropHandler(state, { destinationPile: allowedPile }, clickData, allowDropTableau);
    return moveToFoundationPile(afterClickState, allowedPile)
  }

  return state;
}

const spiderReducer = (state = init(), action) => {
  switch (action.type) {
    case 'RE_DEAL':
      return init();
    case 'SPIDER_CLICK_STOCK':
      return stockClickHandler(state);
    case 'SPIDER_CLICK_TABLEAU':
      const afterClickState = tableauClickHandler(state, action.payload);
      return checkHasWon(afterClickState)
    case 'SPIDER_DROP_TABLEAU':
      const afterDropState = tableauDropHandler(
        state,
        action.payload,
      )
      return checkHasWon(moveToFoundationPile(afterDropState, action.payload.dropData.destinationPile))
    default:
      return state;
  }
};

export default undoable(spiderReducer);