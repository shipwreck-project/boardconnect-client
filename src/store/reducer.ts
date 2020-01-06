import { combineReducers } from 'redux';
import countReducer from 'store/count';

export default combineReducers({
  count: countReducer,
});
