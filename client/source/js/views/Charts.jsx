import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCharts } from 'actions/charts';
import { Chart } from "react-google-charts";

@connect(state => ({
  error: state.charts.get('error'),
  loading: state.charts.get('loading'),
  charts: state.charts.get('charts'),
}))

export default class Charts extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    charts: PropTypes.object,
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  componentWillMount() {
    const {
      dispatch,
      charts,
    } = this.props;

    if (!charts) {
      dispatch(getCharts());
    }
  }

  renderCharts() {
    const {
      charts,
    } = this.props;

    console.log("i'm here 1: ", charts);

    return charts.results.map(chart => {
      return (
        <div className='my-pretty-chart-container'>
          <Chart
            chartType='ScatterChart'
            data={[['Age', 'Weight'], [4, 5.5], [8, 12]]}
            width='100%'
            height='400px'
            legendToggle
          />
        </div>
      );
    });
  }

  render() {
    const {
      loading,
      error,
      charts,
    } = this.props;

    return (
      <div className='charts'>
        <h1>Charts</h1>
        { loading && <div>Loading charts...</div> }
        { error && error.toString() }
        <div className='charts-list'>
          { charts && this.renderCharts() }
        </div>
      </div>
    );
  }
}
