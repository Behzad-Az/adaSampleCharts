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
      const {
        mtrlNum,
        postingDate,
        qntyMoved,
        reorderQnty,
        maxQnty,
        chartLowerBound,
        currentQnty,
        header,
        movingPrice
      } = entry;
      if (indexedMoveData[`${mtrlNum}`]) {
        indexedMoveData[`${mtrlNum}`][`${postingDate}`] = { qntyMoved };
      } else {
        indexedMoveData[`${mtrlNum}`] = {
          reorderQnty,
          maxQnty,
          chartLowerBound,
          currentQnty,
          header,
          movingPrice
        };
        indexedMoveData[`${mtrlNum}`][`${postingDate}`] = { qntyMoved };
      }
    });

    return mtrlNums.map(num => {
      let chartDataArr = [['date', 'Qnty', 'min', 'max']];
      let reorderQnty = 0;
      let maxQnty = 0;
      let currentQnty = 0;
      let header = '';
      let movingPrice = 0;
      let chartLowerBound = new Date(2012, 1);

      defaultChartData.forEach((dataPoint, index) => {
        const { postingDate } = dataPoint;
        let qnty = 0;
        if (indexedMoveData[num]) {
          reorderQnty = Number(indexedMoveData[num].reorderQnty);
          maxQnty = Number(indexedMoveData[num].maxQnty);
          currentQnty = Number(indexedMoveData[num].currentQnty);
          header = indexedMoveData[num].header;
          movingPrice = Math.round(Number(indexedMoveData[num].movingPrice));
          chartLowerBound = new Date(indexedMoveData[num].chartLowerBound);
          if (index === 0) {
            qnty = indexedMoveData[num][`${postingDate}`] ?
              Number(indexedMoveData[num][`${postingDate}`].qntyMoved) : 0;
          } else {
            qnty = indexedMoveData[num][`${postingDate}`] ?
              chartDataArr[index][1] + Number(indexedMoveData[num][`${postingDate}`].qntyMoved) :
              chartDataArr[index][1];
          }
        }
        chartDataArr.push([ new Date(postingDate), qnty, reorderQnty, maxQnty ]);
      });

      return (
        <div className='my-pretty-chart-container' key={num}>
          { `MM ${num}, Current Qnty ${currentQnty}, ${header}, Unit Price $${movingPrice}` }
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
                  min: chartLowerBound,
                  max: new Date(2019, 5, 2)
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
