import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_CHARTS_START,
  GET_CHARTS_ERROR,
  GET_CHARTS_SUCCESS,
} from 'actions/charts';
import api from 'api/charts';

// -------- Get Charts

function createGetCharts(isServer = false) {
  return function* (options) { // eslint-disable-line consistent-return
    try {
      const data = yield call(() => api.getCharts(options.id));
      const action = { type: GET_CHARTS_SUCCESS, data };

      if (isServer) {
        return action;
      }

      yield put(action);
    } catch (error) {
      const action = { type: GET_CHARTS_ERROR, error };

      if (isServer) {
        return action;
      }

      yield put(action);
    }
  };
}

export const getCharts = createGetCharts();
export const getChartsServer = createGetCharts(true);


export function* getChartsWatcher() {
  yield takeLatest(GET_CHARTS_START, getCharts);
}


export default [
  getChartsWatcher(),
];
