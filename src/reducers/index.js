import { combineReducers } from 'redux'
import klondikeReducer from './klondikeReducer';
import spiderReducer from './spiderReducer';
import yukonReducer from './yukonReducer';
import yatzy from './yatzy/';

const solitaireApp = combineReducers({
  klondike: klondikeReducer,
  spider: spiderReducer,
  yukon: yukonReducer,
  yatzyReducer: yatzy,
});

export default solitaireApp