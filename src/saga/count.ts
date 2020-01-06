import { all, fork, take, select, put, delay } from 'redux-saga/effects';
import {
  INCREASE,
  DECREASE,
  GET_RANDOM_NUMBER,
  getRandomNumberSuccess,
} from 'store/count';

function* watchIncrease() {
  while (true) {
    yield take(INCREASE);
    const { count } = yield select((state: StoreState) => state.count);
    console.log(`increase ${count - 1} to ${count}`);
  }
}

function* watchDecrease() {
  while (true) {
    yield take(DECREASE);
    const { count } = yield select((state: StoreState) => state.count);
    console.log(`decrease ${count + 1} to ${count}`);
  }
}

function* watchRandomNumber() {
  while (true) {
    yield take(GET_RANDOM_NUMBER);
    yield delay(1000);
    const randomNumber = Math.floor(Math.random() * 100 + 1);
    yield put(getRandomNumberSuccess(randomNumber));
  }
}

export default function* root() {
  yield all([
    fork(watchIncrease),
    fork(watchDecrease),
    fork(watchRandomNumber),
  ]);
}
