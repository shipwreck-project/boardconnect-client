import { NextApiRequest, NextApiResponse } from 'next';
import qs from 'query-string';
import fetcher from 'utils/fetcher';

/*
TODO: 서버 배포되면 삭제.
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, skip, limit } = req.query;
  const { data } = await fetcher.get(
    `https://www.boardgameatlas.com/api/search?${qs.stringify({
      name,
      skip,
      limit,
      order_by: 'popularity',
      ascending: false,
      client_id: process.env.BOARDGAME_API_KEY,
    })}`,
  );
  return res.json({
    games: data.games,
  });
};
