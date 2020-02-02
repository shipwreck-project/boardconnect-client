import { all, fork } from 'redux-saga/effects';
import countSaga from 'saga/count';
import gameSaga from 'saga/game';

export default function* rootSaga() {
  yield all([fork(countSaga), fork(gameSaga)]);
}
