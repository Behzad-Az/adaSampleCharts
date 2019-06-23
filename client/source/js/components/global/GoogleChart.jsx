import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getGoogleChart } from 'actions/googleChart';
import { Chart } from 'react-google-charts';
import { defaultChartData } from 'constants/defaultChartData';
import logo from 'img/adaLogoLarge.png';

@connect(state => ({
  error: state.googleChart.get('error'),
  loading: state.googleChart.get('loading'),
  data: state.googleChart.get('data'),
}))

export default class GoogleChart extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    data: PropTypes.object,
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  componentWillMount() {
    // const {
    //   dispatch,
    //   data,
    // } = this.props;

    // if (!data) {
    //   dispatch(getGoogleChart(11828311));
    // }
  }

  renderMtrlComments() {

    const {
      loading,
      error,
      data
    } = this.props;

    if (data) {
      const { rawMtrlComments } = data;
      return rawMtrlComments.map(comment => {
        const { postingDate, createdBy, content, acknowledgeable, acknowledged, id } = comment;
        return (
          <article className='media' key={id}>
            <div className='media-content'>
              <div className='content'>
                <p className='is-size-7'>
                  <strong>{createdBy}</strong><small> on {postingDate.slice(0,10)}</small>
                  <br />
                  {content}
                </p>
                { acknowledgeable && !acknowledged && <p className='has-text-right'><a className='is-size-7'><span className='icon'><i className='fas fa-align-left fa-check' /></span><span>Acknowledge</span></a></p> }
              </div>
            </div>
          </article>
        );
      })
    } else if (loading) {
      return (
        <article className='media'>
          <div className='media-content'>
            <div className='content'>
              <p className='is-size-7'>Loading comments...</p>
            </div>
          </div>
        </article>
      );
    } else if (error) {
      return (
        <article className='media'>
          <div className='media-content'>
            <div className='content'>
              <p className='is-size-7'>Encountered error while loading comments.</p>
            </div>
          </div>
        </article>
      );
    } else {
      return (
        <article className='media'>
          <div className='media-content'>
            <div className='content'>
              <p className='is-size-7'>No comment could be found.</p>
            </div>
          </div>
        </article>
      );
    }
  }

  renderGoogleChart() {

    const {
      loading,
      error,
      data
    } = this.props;

    if (data) {
      const { rawMtrlMoveData, mtrlNum } = data;
      let chartDataArr = [['Date', 'Quantity', 'Reorder Line', 'Maximum Line']];
      let currentQnty = 0;
      const reorderQnty = Number(rawMtrlMoveData[0].reorderQnty);
      const maxQnty = Number(rawMtrlMoveData[0].maxQnty);
      const header = rawMtrlMoveData[0].header;
      const movingPrice = Number(rawMtrlMoveData[0].movingPrice);
      const plannedDelivTime = Number(rawMtrlMoveData[0].plannedDelivTime);
      const chartLowerBound = new Date(rawMtrlMoveData[0].chartLowerBound);

      defaultChartData.map((dataPoint, index) => {
        if (index === 0) {
          currentQnty = Number(dataPoint.qnty);
        }
        else {
          const movedData = rawMtrlMoveData.find(move => move.postingDate === dataPoint.postingDate);
          currentQnty = movedData ? currentQnty + Number(movedData.qntyMoved) : currentQnty;
        }
        chartDataArr.push([
          new Date(dataPoint.postingDate),
          currentQnty,
          reorderQnty,
          maxQnty
        ]);

      });

      return (
        <div>
          <div className='card-content'>
            <article className='media'>
              <div className='media-content'>
                <div className='content'>
                  <p className='is-size-6'>
                    <strong>{`Part No. ${mtrlNum} | ${header}`} | Est. $385,000 in Savings</strong>
                    <br />
                    <small>
                    {
                      `Qnty ${currentQnty} | Unit Price $${Math.round(movingPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')},
                      Total Inventory Value $${(Math.round(movingPrice) * currentQnty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} | Planned Deliv. Time ${plannedDelivTime} Days`
                    }
                    </small>
                  </p>
                </div>
              </div>
            </article>
            <Chart
              width={'100%'}
              height={'320px'}
              chartType='LineChart'
              loader={<div>Loading chart data...</div>}
              data={chartDataArr}
              options={{
                legend: {
                  position: 'top',
                  alignment: 'center'
                },
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
                  1: { curveType: 'function' },
                },
              }}
              rootProps={{ 'data-testid': '2' }}
            />
            { this.renderMtrlComments() }
          </div>

          <div className='field is-grouped' style={{'justifyContent': 'center'}}>
            <p className='control'>
              <a className='button is-small is-dark'>
                <span className='icon'><i className='fas fa-align-left fa-check-double' /></span><span>Acknowledge All</span>
              </a>
            </p>
            <p className='control'>
              <a className='button is-small is-dark'>
                <span className='icon'><i className='fas fa-align-left fa-history' /></span><span>See All History</span>
              </a>
            </p>
            <p className='control'>
              <a className='button is-small is-dark'>
                <span className='icon'><i className='fas fa-align-left fa-file-alt' /></span><span>See Documentation</span>
              </a>
            </p>
            <p className='control'>
              <a className='button is-small is-dark'>
                <span className='icon'><i className='far fa-align-left fa-list-alt' /></span><span>See Long Description</span>
              </a>
            </p>
            <p className='control'>
              <a className='button is-small is-dark'>
                <span className='icon'><i className='fas fa-align-left fa-comment' /></span><span>Add Comment</span>
              </a>
            </p>
          </div>
          <br />

        </div>
      );
    } else if (loading) {
      return <p>Loading chart data...</p>;
    } else if (error) {
      return <p>Encountered error while loading chart</p>;
    } else {
      return (
        <figure className='image is-1by1 is-marginless'>
          <img src={logo} alt='Placeholder image' />
        </figure>
      );
    }
  }

  render() {
    return (
      <div className='google-chart card'>
        <div className='card-image'>
          { this.renderGoogleChart() }
        </div>
      </div>
    );
  }
}
