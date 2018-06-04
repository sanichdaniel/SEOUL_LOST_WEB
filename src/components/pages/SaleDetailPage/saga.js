import { take, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { Actions, Types } from './reducer';

export function* watchFetchSaleDetail() {
  yield takeLatest(Types.SALE_DETAIL_REQUEST, fetchSaleDetail);
}

export function* fetchSaleDetail({ id }) {
  try {
    const response = yield api.get(`transaction/sale/${id}`);
    yield put(Actions.saleDetailSuccess(response));
  } catch (error) {
    yield put(Actions.saleDetailFailure(error));
  }
}

export function* watchGetSaleCommentsRequest() {
  yield takeLatest(Types.SALE_COMMENT_REQUEST, getSaleComments);
}

export function* getSaleComments({ id }) {
  try {
    const response = yield api.get(`transaction/sale/${id}/comments`);
    yield put(Actions.saleCommentSuccess(response));
  } catch (error) {
    yield put(Actions.saleCommentFailure(error.response));
  }
}

export default [
  watchFetchSaleDetail,
  watchGetSaleCommentsRequest,
];
