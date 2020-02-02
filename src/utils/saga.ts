import { call, put } from 'redux-saga/effects';

export const fetchEntity = ({
  request,
  success,
  failure,
  endPoint,
}: Entity) => {
  return function*(...args: any[]) {
    yield put(request(args));
    try {
      const response = yield call(endPoint, ...args);
      yield put(success(response));
    } catch (err) {
      // TODO: error reducer 따로 만들기.
      yield put(failure());
    }
  };
};
