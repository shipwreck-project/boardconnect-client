import { combineReducers } from 'redux';
import countReducer from 'store/count';
import gameReducer from 'store/game';
import authReducer from 'store/auth';

export default combineReducers({
  count: countReducer,
  game: gameReducer,
  auth: authReducer,
});
