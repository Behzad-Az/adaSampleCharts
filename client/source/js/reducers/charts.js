import { Map } from 'immutable';

import {
  GET_CHARTS_START,
  GET_CHARTS_ERROR,
  GET_CHARTS_SUCCESS,
} from 'actions/charts';

const initialState = Map({
  loading: false,
  error: null,
  charts: null,
});

const actionsMap = {
  // Async action
  [GET_CHARTS_START]: (state) => {
    return state.merge(Map({
      loading: true,
      error: null,
      charts: null,
    }));
  },
  [GET_CHARTS_ERROR]: (state, action) => {
    return state.merge(Map({
      loading: false,
      error: action.error.message,
    }));
  },
  [GET_CHARTS_SUCCESS]: (state, action) => {
    return state.merge(Map({
      loading: false,
      charts: action.data,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
