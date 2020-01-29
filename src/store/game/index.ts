import { createReducer, createAction } from '@reduxjs/toolkit';
import { Game } from 'model/game';
import { createEntity } from 'utils/redux';
import * as gameApi from 'api/game';

export type GameState = {
  search: {
    isInit: boolean;
    games: Game[];
    status: Status;
  };
};

const initialState: GameState = {
  search: {
    isInit: true,
    games: [],
    status: 'INIT',
  },
};

export const SEARCH_GAME = 'SEARCH_GAME';

export const [SearchGameActions, SearchGameEntity] = createEntity(
  SEARCH_GAME,
  gameApi.searchGame,
);
export const searchGame = createAction(
  SEARCH_GAME,
  ({ name = '', skip = 0, limit = 10 }: Partial<gameApi.SearchGameQuery>) => ({
    payload: {
      name,
      skip,
      limit,
    },
  }),
);

export default createReducer(initialState, builder => {
  builder
    .addCase(SearchGameEntity.request, (state, action) => {
      state.search.status = 'FETCHING';
      state.search.isInit = action.payload[0].skip === 0;
    })
    .addCase(SearchGameEntity.success, (state, action) => {
      state.search.status = 'SUCCESS';
      state.search.games = state.search.isInit
        ? action.payload.games
        : [...state.search.games, ...action.payload.games];
    })
    .addCase(SearchGameEntity.failure, state => {
      state.search.status = 'FAILURE';
    });
});
