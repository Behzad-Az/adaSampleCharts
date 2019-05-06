export const GET_CHARTS_START = 'GET_CHARTS_START';
export const GET_CHARTS_ERROR = 'GET_CHARTS_ERROR';
export const GET_CHARTS_SUCCESS = 'GET_CHARTS_SUCCESS';

export function getCharts() {
  return {
    type: GET_CHARTS_START,
  };
}
