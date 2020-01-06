import { createAction, createReducer } from '@reduxjs/toolkit';

export type CountState = {
  count: number;
  isLoading: boolean;
};

const intialState: CountState = {
  count: 0,
  isLoading: false,
};

export const INCREASE = 'INCREASE' as const;
export const DECREASE = 'DECREASE' as const;

// Async test 용
export const GET_RANDOM_NUMBER = 'GET_RANDOM_NUMBER' as const;
export const GET_RANDOM_NUMBER_SUCCESS = 'GET_RANDOM_NUMBER_SUCCESS' as const;

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

export const getRandomNumber = createAction(GET_RANDOM_NUMBER);
export const getRandomNumberSuccess = createAction(
  GET_RANDOM_NUMBER_SUCCESS,
  (payload: number) => ({
    payload,
  }),
);

export default createReducer(intialState, builder => {
  builder
    .addCase(increase, state => {
      state.count++;
    })
    .addCase(decrease, state => {
      state.count--;
    })
    .addCase(getRandomNumber, state => {
      state.isLoading = true;
    })
    .addCase(getRandomNumberSuccess, (state, action) => {
      state.count = action.payload;
      state.isLoading = false;
    });
});
