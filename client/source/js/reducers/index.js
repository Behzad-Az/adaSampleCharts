import { combineReducers } from 'redux';
import app from 'reducers/app';
import people from 'reducers/people';
import charts from 'reducers/charts';
import googleChart from 'reducers/googleChart';

export default combineReducers({
  app,
  people,
  charts,
  googleChart
});
