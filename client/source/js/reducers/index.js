import { combineReducers } from 'redux';
import app from 'reducers/app';
import people from 'reducers/people';
import charts from 'reducers/charts';

export default combineReducers({
  app,
  people,
  charts
});
