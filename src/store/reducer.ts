import { combineReducers } from 'redux';
import countReducer from 'store/count';
import gameReducer from 'store/game';

export default combineReducers({
  count: countReducer,
  game: gameReducer,
});
