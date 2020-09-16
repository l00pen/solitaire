import { combineReducers } from 'redux'
import klondikeReducer from 'Components/Games/Klondike/reducer.js';
import spiderReducer from './spiderReducer';
import yukonReducer from './yukonReducer';
import yatzy from './yatzy/';
import napoleon from 'Components/Games/Napoleon/reducer.js';

const app = combineReducers({
  klondike: klondikeReducer,
  spider: spiderReducer,
  yukon: yukonReducer,
  yatzyReducer: yatzy,
  napoleon,
});

export default app