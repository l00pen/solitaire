import undoable from './undoable';
import {
  shuffleArray,
  hearts,
  spades,
  clubs,
  diamonds,
} from '../utils/';

const tableauPilesKeys = [];
const foundationPilesKeys = [];

const createDeck = () => {
  return [clubs, diamonds, hearts, spades].map((suite, i) => {
    return suite.map((card) => ({...card, key: `${card.id}${i}`}))
  })
}

const createFoundationPiles = () => {
  return [];
}

const createTableauPilesFromDeck = () => {
  return [];
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
    default:
      return state;
  }
};

export default undoable(yukonReducer);