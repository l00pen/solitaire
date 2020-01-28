import { combineReducers } from 'redux'
import klondikeReducer from './klondikeReducer';
import spiderReducer from './spiderReducer';

const solitaireApp = combineReducers({
  klondike: klondikeReducer,
  spider: spiderReducer,
});

export default solitaireApp