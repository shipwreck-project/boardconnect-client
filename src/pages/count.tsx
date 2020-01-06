import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease, getRandomNumber } from 'store/count';
import { NextPage } from 'next';
import { NextJSContext } from 'next-redux-wrapper';

type Props = {
  isServer: boolean;
};

const CountPage: NextPage<Props> = ({ isServer }) => {
  const { count, isLoading } = useSelector((state: StoreState) => state.count);
  const dispatch = useDispatch();
  const text = isServer ? '서버' : '클라이언트';
  return (
    <div>
      <h1>{`${text} 사이드 getInitialProps`}</h1>
      <h2>{isLoading ? '...loading' : count}</h2>
      <button onClick={() => dispatch(increase())}>+</button>
      <button onClick={() => dispatch(decrease())}>-</button>
    </div>
  );
};

CountPage.getInitialProps = async (context: NextJSContext) => {
  const { store, isServer } = context;
  store.dispatch(getRandomNumber());

  return {
    isServer,
  };
};

export default CountPage;
