import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from 'store/reducer';
import rootSaga from 'saga';

const cs = (initialState: StoreState) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  );

  (store as any).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default cs;
