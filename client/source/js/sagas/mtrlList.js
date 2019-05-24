import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_MTRLLIST_START,
  GET_MTRLLIST_ERROR,
  GET_MTRLLIST_SUCCESS,
} from 'actions/mtrlList';
import api from 'api/mtrlList';

// -------- Get Material List

function createGetMtrlList(isServer = false) {
  return function* (options) { // eslint-disable-line consistent-return
    try {
      const data = yield call(() => api.getMtrlList(options.id));
      const action = { type: GET_MTRLLIST_SUCCESS, data };

      if (isServer) {
        return action;
      }

      yield put(action);
    } catch (error) {
      const action = { type: GET_MTRLLIST_ERROR, error };

      if (isServer) {
        return action;
      }

      yield put(action);
    }
  };
}

export const getMtrlList = createGetMtrlList();
export const getMtrlListServer = createGetMtrlList(true);


export function* getMtrlListWatcher() {
  yield takeLatest(GET_MTRLLIST_START, getMtrlList);
}


export default [
  getMtrlListWatcher(),
];
