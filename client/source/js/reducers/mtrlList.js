import { Map } from 'immutable';

import {
  GET_MTRLLIST_START,
  GET_MTRLLIST_ERROR,
  GET_MTRLLIST_SUCCESS,
} from 'actions/mtrlList';

const initialState = Map({
  loading: false,
  error: null,
  data: null,
});

const actionsMap = {
  // Async action
  [GET_MTRLLIST_START]: (state) => {
    return state.merge(Map({
      loading: true,
      error: null,
      data: null,
    }));
  },
  [GET_MTRLLIST_ERROR]: (state, action) => {
    return state.merge(Map({
      loading: false,
      error: action.error.message,
    }));
  },
  [GET_MTRLLIST_SUCCESS]: (state, action) => {
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
