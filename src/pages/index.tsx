import React from 'react';
import Link from 'next/link';
import { Typography } from 'antd';

const { Title } = Typography;

const HomePage = () => {
  return (
    <div data-testid="HomePage">
      <Title>난파선</Title>
      <Link href="/count">
        <a>count</a>
      </Link>
    </div>
  );
};

export default HomePage;
