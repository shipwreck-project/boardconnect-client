import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { NextJSContext } from 'next-redux-wrapper';
import { Button, Typography, Icon, message } from 'antd';
import { increase, decrease, getRandomNumber } from 'store/count';
import Link from 'next/link';

type Props = {
  isServer: boolean;
};

const { Title } = Typography;

const CountPage: NextPage<Props> = ({ isServer }) => {
  const { count, isLoading } = useSelector((state: StoreState) => state.count);
  const dispatch = useDispatch();
  const text = isServer ? '서버' : '클라이언트';

  const handleClick = (type: 'increase' | 'decrease') => () => {
    dispatch(type === 'increase' ? increase() : decrease());
    message.info(type);
  };

  return (
    <div>
      <div>
        <Title>{`${text} 사이드 getInitialProps`}</Title>
        <Title level={3}>{isLoading ? '...loading' : count}</Title>
        <Button.Group size="large">
          <Button type="primary" onClick={handleClick('increase')}>
            Increase <Icon type="up" />
          </Button>
          <Button type="danger" onClick={handleClick('decrease')}>
            Decrease <Icon type="down" />
          </Button>
        </Button.Group>
      </div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
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
