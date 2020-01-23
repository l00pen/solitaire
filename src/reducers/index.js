import { combineReducers } from 'redux'
import klondikeReducer from './klondikeReducer';

const solitaireApp = combineReducers({
  klondike: klondikeReducer,
});

export default solitaireApp