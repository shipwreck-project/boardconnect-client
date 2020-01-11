import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from 'store/reducer';
import { MakeStoreOptions } from 'next-redux-wrapper';
import rootSaga from 'saga';

const cs = (initialState: StoreState, { isServer, req }: MakeStoreOptions) => {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    (!isServer && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  if (req || !isServer) {
    (store as any).sagaTask = sagaMiddleware.run(rootSaga);
  }

  return store;
};

export default cs;
