import { createReducer } from '@reduxjs/toolkit';
import { User } from 'models';
import * as AuthApi from 'api/auth';
import { createEntity } from 'utils/redux';

/* states */
export type AuthState = {
  status: Status;
  response?: {
    user: User;
  };
  error?: any;
};

const initialState: AuthState = {
  status: 'INIT',
  response: undefined,
};

/* actions */
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

/* entity */
export const [actions, entity] = createEntity(LOGIN, AuthApi.login);

/* reducer */
export default createReducer(initialState, builder => {
  builder
    .addCase(entity.request, state => {
      state.status = 'FETCHING';
    })
    .addCase(entity.success, (state, action) => {
      state.status = 'SUCCESS';
      state.response = action.payload;
    })
    .addCase(entity.failure, state => {
      state.status = 'FAILURE';
      // state.error = action.payload
    });
});
