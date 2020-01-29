import qs from 'query-string';
import fetcher from 'utils/fetcher';
import { Game } from 'model/game';

export type SearchGameQuery = {
  name: string;
  skip: number;
  limit: number;
};

export const searchGame = async (query: SearchGameQuery) => {
  const { data } = await fetcher.get<{ games: Game[] }>(
    `/game?${qs.stringify(query)}`,
  );
  return data;
};
