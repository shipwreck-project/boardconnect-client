import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { List, Card } from 'antd';
import debounce from 'lodash.debounce';
import { NextJSContext } from 'next-redux-wrapper';
import { searchGame } from 'store/game';

const { Meta } = Card;

const GamePage: NextPage = () => {
  const dispatch = useDispatch();
  const { games } = useSelector((state: StoreState) => state.game.search);
  const [input, setInput] = useState('');
  const [search] = useState(() =>
    debounce((search: string) => dispatch(searchGame({ name: search })), 500),
  );

  useEffect(() => {
    if (input) {
      search(input);
    }
  }, [input, search]);

  return (
    <>
      <h1>Games</h1>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={games}
        renderItem={item => (
          <List.Item>
            <Card
              style={{ width: 240 }}
              cover={<img alt="thumbnail" src={item.thumb_url} />}
            >
              <Meta title={item.name} />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

GamePage.getInitialProps = (context: NextJSContext) => {
  const { isServer } = context;

  return {
    isServer,
  };
};

export default GamePage;
