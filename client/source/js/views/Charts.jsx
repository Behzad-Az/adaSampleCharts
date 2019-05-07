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

    const { rawMtrlMoveData, mtrlNums } = charts;
    let indexedMoveData = {};

    rawMtrlMoveData.map(entry => {
      const { mtrlNum, date, qntyMoved } = entry;
      if (indexedMoveData[`${mtrlNum}`]){
        indexedMoveData[`${mtrlNum}`][`${date}`] = { qntyMoved };
      } else {
        indexedMoveData[`${mtrlNum}`] = {};
        indexedMoveData[`${mtrlNum}`][`${date}`] = { qntyMoved };
      }
    });

    return mtrlNums.map(num => {
      let chartDataArr = [['date', 'Qnty', 'min', 'max']];
      defaultChartData.forEach((dataPoint, index) => {
        let qnty = 0;
        if (indexedMoveData[num]) {
          if (index === 0) {
            qnty = indexedMoveData[num][`${dataPoint.date}`] ?
              Number(indexedMoveData[num][`${dataPoint.date}`].qntyMoved) : 0;
          } else {
            qnty = indexedMoveData[num][`${dataPoint.date}`] ?
              chartDataArr[index][1] + Number(indexedMoveData[num][`${dataPoint.date}`].qntyMoved) :
              chartDataArr[index][1];
          }
        }
        chartDataArr.push([ new Date(dataPoint.date), qnty, 5, 15 ]);
      });

      return (
        <div className='my-pretty-chart-container' key={num}>
          { num }
          <Chart
            width={'600px'}
            height={'400px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={chartDataArr}
            options={{
              legend: 'none',
              hAxis: {
                format: 'MMM-yy',
                viewWindow: {
                  min: new Date(2015, 1),
                  max: new Date(2019, 5)
                }
              },
              vAxis: {
                title: 'Quantity',
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
