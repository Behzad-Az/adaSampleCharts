import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCharts } from 'actions/charts';
import { Chart } from "react-google-charts";
import { defaultChartData } from 'constants/defaultChartData';

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
    const separatedInventoryMoveData = {};

    materialNums.forEach(num => {
      const filteredData = allInventoryMoveData.filter(entry => entry.materialNum === num);
      separatedInventoryMoveData[num] = {};
      filteredData.forEach(dataPoint => {
        separatedInventoryMoveData[num][`${dataPoint.date}`] = { qntyMoved: dataPoint.qntyMoved };
      });
    });

    return materialNums.map(num => {

      const chartDataObj = [ ...defaultChartData ];
      chartDataObj.forEach((dataPoint, index) => {
        if (index === 0) {
          dataPoint.qnty = separatedInventoryMoveData[num][`${dataPoint.date}`] ?
            Number(separatedInventoryMoveData[num][`${dataPoint.date}`].qntyMoved) : 0;
        } else {
          dataPoint.qnty = separatedInventoryMoveData[num][`${dataPoint.date}`] ?
            chartDataObj[index - 1].qnty + Number(separatedInventoryMoveData[num][`${dataPoint.date}`].qntyMoved) :
            chartDataObj[index - 1].qnty;
        }
      });

      const chartDataArr = chartDataObj.map((dataPoint, index) => [
        new Date(dataPoint.date), dataPoint.qnty
      ]);

      return (
        <div className='my-pretty-chart-container' key={num}>
          { num }
          <Chart
            width={'600px'}
            height={'400px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['x', num],
              ...chartDataArr
            ]}
            options={{
              legend: 'none',
              hAxis: {
                title: 'Time',
                viewWindow: {
                  min: new Date(2017, 1),
                  max: new Date(2019, 5)
                }
              },
              vAxis: {
                title: 'Popularity',
                viewWindow: {
                  min: 0
                }
              },
              series: {
                0: { curveType: 'function' },
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
