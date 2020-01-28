import undoable from './undoable';
import {
  shuffleArray,
  setLastIsFaceUp,
  hearts,
  spades,
  moveToPile,
  moveFromPile,
  grabCardsToBeMoved,
  setFaceIsUp,
  createArrayWithKeys,
} from '../utils/';

const createDeck = () => {
  return [
    spades, hearts, hearts, spades,
    spades, hearts, hearts, spades,
  ].map((suite, i) => {
    return suite.map((card) => ({...card, key: `${card.id}${i}`}))
  })
}

export const tableauPilesKeys = createArrayWithKeys('tableau', 10);
export const foundationPilesKeys = createArrayWithKeys('foundation', 8);

const init = () => {
  const deck = shuffleArray(createDeck().flat());
  const foundation = foundationPilesKeys.reduce((mem, key) => {
    return {
      ...mem,
      [key]: [],
    }
  }, {})
  return {
    ...foundation,
    tableau0: setLastIsFaceUp(deck.slice(0, 6)),
    tableau1: setLastIsFaceUp(deck.slice(6, 12)),
    tableau2: setLastIsFaceUp(deck.slice(12, 18)),
    tableau3: setLastIsFaceUp(deck.slice(18, 24)),
    tableau4: setLastIsFaceUp(deck.slice(24, 29)),
    tableau5: setLastIsFaceUp(deck.slice(29, 34)),
    tableau6: setLastIsFaceUp(deck.slice(34, 39)),
    tableau7: setLastIsFaceUp(deck.slice(39, 44)),
    tableau8: setLastIsFaceUp(deck.slice(44, 49)),
    tableau9: setLastIsFaceUp(deck.slice(49, 54)),
    stock: deck.slice(54),

    tableauPilesKeys,
    foundationPilesKeys,
  };
}

const stockClickHandler = (state) => {
  const numberOfcards = Math.min(tableauPilesKeys.length, state.stock.length);
  const cardsAtIndex = state.stock.length - numberOfcards;
  const cardsToBeMoved = grabCardsToBeMoved(cardsAtIndex, state.stock);

  const newTableau = tableauPilesKeys.reduce((mem, tableauId, i) => {
    return {
      ...mem,
      [tableauId]: moveToPile([setFaceIsUp(cardsToBeMoved[i])], state[tableauId])
    }
  }, {})

  const newSource = moveFromPile(cardsAtIndex, state.stock);

  return {
    ...state,
    stock: newSource,
    ...newTableau,
  };
}

const everyCardIsSameSuite = (cards, suite) => {
  return cards.every(card => card.suite === suite);
}

const findFirstAvailableFoundation = (state) => {
  const index = foundationPilesKeys.findIndex((key) => {
    return state[key].length === 0;
  });

  return foundationPilesKeys[index];
}

const allowDropTableau = (cardsToBeMoved, destCardIndex, destinationPile, destCard) => {
  if (destinationPile.length === 0) {
    return true;
  }

  const allIsSpades = everyCardIsSameSuite(cardsToBeMoved, 'spades');
  const allIsHearts = everyCardIsSameSuite(cardsToBeMoved, 'hearts');

  // TODO, check that its an allowed sequence
  if (allIsHearts || allIsSpades) {
    const firstCardToBeMoved = cardsToBeMoved[0];
    const lastCardInDestPile = destCardIndex === destinationPile.length - 1;
    const isRightValue = destCard.value === firstCardToBeMoved.value + 1;

    return lastCardInDestPile && isRightValue;
  }

  return false;
};

const moveToFoundationPile = (state, pile) => {
  const newPile = state[pile].reduce((mem, obj, i) => {
    if (obj.value === 13 && obj.isFaceUp) {
      return [obj];
    }
    
    if (mem.length > 0) {
      const prevCard = mem[mem.length-1];
      if ((prevCard.value === obj.value + 1 || (prevCard.value === 2 && obj.value === 14)) && prevCard.suite === obj.suite) {
        mem.push(obj)
        return mem;
      }
      return [];
    }
    return mem;
  }, []);

  if (newPile.length === 13) {
    const cardsAtIndex = state[pile].findIndex((card) => {
      return card.key === newPile[0].key
    })
    const cardsToBeMoved = grabCardsToBeMoved(cardsAtIndex, state[pile]);

    const newSourcePile = moveFromPile(cardsAtIndex, state[pile]);
    const foundationToMoveTo = findFirstAvailableFoundation(state);
    return {
      ...state,
      [foundationToMoveTo]: moveToPile(cardsToBeMoved, state[foundationToMoveTo]),
      [pile]: newSourcePile,
    }
  }

  return state;
}

const tableauDropHandler = (state, { dropData, dragData }) => {
  const {card: destCard, cardIndex: destCardIndex, destinationPile} = dropData;
  const {cardIndexInPile, sourcePile} = dragData;
  const stateSourcePile = state[sourcePile];
  const stateDestinationPile = state[destinationPile];

  const cardsToBeMoved = grabCardsToBeMoved(cardIndexInPile, stateSourcePile);

  if (allowDropTableau(cardsToBeMoved, destCardIndex, stateDestinationPile, destCard)) {
    const newDestination = moveToPile(cardsToBeMoved, stateDestinationPile);
    const newSource = moveFromPile(cardIndexInPile, stateSourcePile);

    return {
      ...state,
      [destinationPile]: newDestination,
      [sourcePile]: newSource,
    }
  }

  return state;
}

const spiderReducer = (state = init(), action) => {
  switch (action.type) {
    case 'RE_DEAL':
      return init();
    case 'SPIDER_CLICK_STOCK':
      console.log(state.stock)
      return stockClickHandler(state);
    case 'SPIDER_DROP_TABLEAU':
      const afterDropState = tableauDropHandler(
        state,
        action.payload,
      )
      return moveToFoundationPile(afterDropState, action.payload.dropData.destinationPile)
    default:
      return state;
  }
};

export default undoable(spiderReducer);