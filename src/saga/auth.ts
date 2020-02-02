import { takeEvery } from 'redux-saga/effects';
import { fetchEntity } from 'utils/saga';
import { LOGIN, entity } from 'store/auth';

export default function* root() {
  yield takeEvery(LOGIN, fetchEntity(entity));
}
