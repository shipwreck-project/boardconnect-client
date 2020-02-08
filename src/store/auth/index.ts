import { createReducer } from '@reduxjs/toolkit';
import { User } from 'models';
import * as AuthApi from 'api/auth';
import { createEntity } from 'utils/redux';

/* states */
export type AuthState = {
  status: Status;
  error?: any;
  user?: User;
};

const initialState: AuthState = {
  status: 'INIT',
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
      state.user = action.payload.user;
    })
    .addCase(entity.failure, state => {
      state.status = 'FAILURE';
      // state.error = action.payload
    });
});
