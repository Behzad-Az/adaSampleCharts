export const GET_GOOGLECHART_START = 'GET_GOOGLECHART_START';
export const GET_GOOGLECHART_ERROR = 'GET_GOOGLECHART_ERROR';
export const GET_GOOGLECHART_SUCCESS = 'GET_GOOGLECHART_SUCCESS';

export function getGoogleChart(chartId) {
  return {
    type: GET_GOOGLECHART_START,
    chartId
  };
}
