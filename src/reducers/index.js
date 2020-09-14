import { combineReducers } from 'redux'
import klondikeReducer from './klondikeReducer';
import spiderReducer from './spiderReducer';
import yukonReducer from './yukonReducer';
import yatzy from './yatzy/';
import napoleon from 'Components/Games/Napoleon/reducer.js';

const solitaireApp = combineReducers({
  klondike: klondikeReducer,
  spider: spiderReducer,
  yukon: yukonReducer,
  yatzyReducer: yatzy,
  napoleon,
});

export default solitaireApp