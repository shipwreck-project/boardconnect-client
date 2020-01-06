import { all, fork } from 'redux-saga/effects';
import countSaga from 'saga/count';

export default function* rootSaga() {
  yield all([fork(countSaga)]);
}
