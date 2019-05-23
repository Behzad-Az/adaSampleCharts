import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_GOOGLECHART_START,
  GET_GOOGLECHART_ERROR,
  GET_GOOGLECHART_SUCCESS,
} from 'actions/googleChart';
import api from 'api/googleChart';

// -------- Get Chart

function createGetGoogleChart(isServer = false) {
  return function* (options) { // eslint-disable-line consistent-return
    try {
      const data = yield call(() => api.getGoogleChart(options.id));
      const action = { type: GET_GOOGLECHART_SUCCESS, data };

      if (isServer) {
        return action;
      }

      yield put(action);
    } catch (error) {
      const action = { type: GET_GOOGLECHART_ERROR, error };

      if (isServer) {
        return action;
      }

      yield put(action);
    }
  };
}

export const getGoogleChart = createGetGoogleChart();
export const getCGoogleChartServer = createGetGoogleChart(true);


export function* getGoogleChartWatcher() {
  yield takeLatest(GET_GOOGLECHART_START, getGoogleChart);
}


export default [
  getGoogleChartWatcher(),
];
