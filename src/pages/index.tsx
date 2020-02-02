import React from 'react';
import Link from 'next/link';
import { Typography } from 'antd';

const { Title } = Typography;

const HomePage = () => {
  return (
    <div data-testid="HomePage">
      <Title>난파선</Title>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link href="/count">
          <a>count</a>
        </Link>
        <Link href="/game">
          <a>game</a>
        </Link>
        <Link href="/login">
          <a>login</a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
