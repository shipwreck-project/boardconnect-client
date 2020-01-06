import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { NextJSContext } from 'next-redux-wrapper';
import styled from '@emotion/styled';
import { increase, decrease, getRandomNumber } from 'store/count';

type Props = {
  isServer: boolean;
};
// style test
const Button = styled.button`
  width: 120px;
  line-height: 30px;
  background-color: white;
  border: 1px solid black;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const CountPage: NextPage<Props> = ({ isServer }) => {
  const { count, isLoading } = useSelector((state: StoreState) => state.count);
  const dispatch = useDispatch();
  const text = isServer ? '서버' : '클라이언트';
  return (
    <div>
      <h1>{`${text} 사이드 getInitialProps`}</h1>
      <h2>{isLoading ? '...loading' : count}</h2>
      <Button onClick={() => dispatch(increase())}>+</Button>
      <Button onClick={() => dispatch(decrease())}>-</Button>
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
