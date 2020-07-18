import { combineReducers } from 'redux';

import dices from './dices';
import protocol from './protocol';
import highScore from './highscore';

const initialState = {
  availableRolls: 2,
};

const yatzy = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_USER':
    case 'YATZY_NEW_GAME':
      return {
        ...initialState,
      }
    case 'YATZY_ROLL_DICES':
      return {
        ...state,
        availableRolls: state.availableRolls - 1,
      }
    case 'YATZY_SET_PROTOCOL_ITEM_SUM':
      return {
        ...state,
        availableRolls: initialState.availableRolls,
      }
    case 'YATZY_GAME_FINISHED':
      return {

      }
    default:
      return state;
  }
};

export default combineReducers({
  yatzy,
  dices,
  protocol,
  highScore,
});
