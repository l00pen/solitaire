import { combineReducers } from 'redux'
import klondikeReducer from './klondikeReducer';
import spiderReducer from './spiderReducer';
import yukonReducer from './yukonReducer';

const solitaireApp = combineReducers({
  klondike: klondikeReducer,
  spider: spiderReducer,
  yukon: yukonReducer,
});

export default solitaireApp