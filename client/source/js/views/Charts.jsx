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

    const { allInventoryMoveData, materialNums } = charts;

    // const materialNums = allInventoryMoveData.map()
    const separatedInventoryMoveData = {};

    materialNums.forEach(num => separatedInventoryMoveData[num] = allInventoryMoveData.filter(entry => entry.materialNum === num));

    console.log("i'm here 0: ", separatedInventoryMoveData);

    return materialNums.map(num => {
      return (
        <div className='my-pretty-chart-container' key={num}>
          { num }


          <Chart
            width={'600px'}
            height={'400px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['x', 'dogs', 'cats'],
              [0, 0, 0],
              [1, 10, 5],
              [2, 23, 15],
              [3, 17, 9],
              [4, 18, 10],
              [5, 9, 5],
              [6, 11, 3],
              [7, 27, 19],
            ]}
            options={{
              hAxis: {
                title: 'Time',
              },
              vAxis: {
                title: 'Popularity',
              },
              series: {
                1: { curveType: 'function' },
              },
            }}
            rootProps={{ 'data-testid': '2' }}
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
