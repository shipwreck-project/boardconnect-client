import { all, fork, take, call } from 'redux-saga/effects';
import { SEARCH_GAME, SearchGameEntity } from 'store/game';
import { fetchEntity } from 'utils/saga';

const searchGameFetcher = fetchEntity(SearchGameEntity);

function* watchSearchGame() {
  while (true) {
    const { payload } = yield take(SEARCH_GAME);
    yield call(searchGameFetcher, payload);
  }
}

export default function* root() {
  yield all([fork(watchSearchGame)]);
}
