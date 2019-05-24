import { all } from 'redux-saga/effects';

import peopleSagas from 'sagas/people';
import chartsSagas from 'sagas/charts';
import googleChart from 'sagas/googleChart';
import mtrlList from 'sagas/mtrlList';

export default function* rootSaga() {
  yield all([
    ...peopleSagas,
    ...chartsSagas,
    ...googleChart,
    ...mtrlList
  ]);
}
