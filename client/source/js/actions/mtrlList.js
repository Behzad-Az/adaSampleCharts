export const GET_MTRLLIST_START = 'GET_MTRLLIST_START';
export const GET_MTRLLIST_ERROR = 'GET_MTRLLIST_ERROR';
export const GET_MTRLLIST_SUCCESS = 'GET_MTRLLIST_SUCCESS';

export function getMtrlList() {
  return {
    type: GET_MTRLLIST_START,
  };
}
