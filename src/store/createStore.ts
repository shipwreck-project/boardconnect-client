import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from 'store/reducer';
import { MakeStoreOptions } from 'next-redux-wrapper';
import rootSaga from 'saga';

const cs = (initialState: StoreState, { isServer, req }: MakeStoreOptions) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  );

  if (req || !isServer) {
    (store as any).sagaTask = sagaMiddleware.run(rootSaga);
  }

  return store;
};

export default cs;
