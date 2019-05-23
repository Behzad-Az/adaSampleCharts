import { Map } from 'immutable';

import {
  GET_GOOGLECHART_START,
  GET_GOOGLECHART_ERROR,
  GET_GOOGLECHART_SUCCESS,
} from 'actions/googleChart';

const initialState = Map({
  loading: false,
  error: null,
  data: null,
});

const actionsMap = {
  // Async action
  [GET_GOOGLECHART_START]: (state) => {
    return state.merge(Map({
      loading: true,
      error: null,
      data: null,
    }));
  },
  [GET_GOOGLECHART_ERROR]: (state, action) => {
    return state.merge(Map({
      loading: false,
      error: action.error.message,
    }));
  },
  [GET_GOOGLECHART_SUCCESS]: (state, action) => {
    return state.merge(Map({
      loading: false,
      data: action.data,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
