import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>난파선</h1>
      <Link href="/count">
        <a>example</a>
      </Link>
    </div>
  );
};

export default HomePage;
