import { take, call, put, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import { Types, Creators as Actions } from './reducer';
import api from 'services/api';

export function* watchNewLostRequest() {
  yield takeLatest(Types.NEW_LOST_REQUEST, newLost);
}

export function* newLost({ data }) {
  try {
    const response = yield api.post(`transaction/losts}`, data);
    yield put(Actions.newLostSuccess(response));
    //window.location.replace('/');
  } catch (error) {
    yield put(Actions.newLostFailure(error.response));
  }
}

export default [
  watchNewLostRequest,
];
