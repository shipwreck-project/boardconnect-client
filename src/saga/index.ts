import { all, fork } from 'redux-saga/effects';
import countSaga from 'saga/count';
import gameSaga from 'saga/game';
import authSaga from 'saga/auth';

export default function* rootSaga() {
  yield all([fork(countSaga), fork(gameSaga), fork(authSaga)]);
}
