export const GET_MTRLLIST_START = 'GET_MTRLLIST_START';
export const GET_MTRLLIST_ERROR = 'GET_MTRLLIST_ERROR';
export const GET_MTRLLIST_SUCCESS = 'GET_MTRLLIST_SUCCESS';
export const SET_SELECTED_MTRL = 'SET_SELECTED_MTRL';

export function getMtrlList() {
  return {
    type: GET_MTRLLIST_START,
  };
}

export function setSelectedMtrl(newSelection) {
  return {
    type: SET_SELECTED_MTRL,
    newSelection
  };
}
