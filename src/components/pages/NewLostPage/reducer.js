import { createReducer, createActions } from 'reduxsauce';
import { fromJS } from 'immutable';

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  newLostRequest: ['data'],
  newLostSuccess: ['payload'],
  newLostFailure: ['error'],
});

/* ------------- Initial State ------------- */

export const initialState = fromJS({
  newLost: {
    isFetching: false,
    payload: null,
    error: null,
  },
});

/* ------------- Reducers ------------- */

export const newLostRequest = (state) =>
  state.mergeDeep({ newPost: { isFetching: true, error: null } });

export const newLostSuccess = (state, { payload }) =>
  state.mergeDeep({ newPost: { isFetching: false, payload, error: null } });

export const newLostFailure = (state, { error }) =>
  state.mergeDeep({ newPost: { isFetching: false, error } });

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(initialState, {
  [Types.NEW_LOST_REQUEST]: newLostRequest,
  [Types.NEW_LOST_SUCCESS]: newLostSuccess,
  [Types.NEW_LOST_FAILURE]: newLostFailure,
});
