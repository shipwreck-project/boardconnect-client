import fetcher from 'utils/fetcher';
import { Game } from 'models/game';

export type SearchGameQuery = {
  name: string;
  skip: number;
  limit: number;
};

export const searchGame = async (query: SearchGameQuery) => {
  const { data } = await fetcher.get<{ games: Game[] }>(`/game`, {
    params: query,
  });
  return data;
};
