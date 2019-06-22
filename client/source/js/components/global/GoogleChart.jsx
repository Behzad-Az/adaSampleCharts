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
    //   dispatch(getGoogleChart(11093090));
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
        const { postingDate, createdBy, content, id } = comment;
        return (
          <article className='media' key={id}>
            <div className='media-content'>
              <div className='content'>
                <p>
                  <strong>{createdBy}</strong><small> - {postingDate.slice(0,10)}</small>
                  <br />
                  {content}
                </p>
                <p className='has-text-right has-size-7'><small><a>Save</a> · <a>Comment</a> · <a>Acknowledge</a></small></p>
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
              <p>Loading comments...</p>
            </div>
          </div>
        </article>
      );
    } else if (error) {
      return (
        <article className='media'>
          <div className='media-content'>
            <div className='content'>
              <p>Encountered error while loading comments.</p>
            </div>
          </div>
        </article>
      );
    } else {
      return (
        <article className='media'>
          <div className='media-content'>
            <div className='content'>
              <p>No comment could be found.</p>
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

      let chartDataArr = [['date', 'Qnty', 'min', 'max']];
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

          <div className='card-content'>

            <article className='media'>
              <div className='media-content'>
                <div className='content'>
                  <p>
                    <strong>{`MM ${mtrlNum}, ${header}`}</strong>
                    <br />
                    {
                      `Current Qnty ${currentQnty}, Unit Price $${movingPrice},
                      Total Current Value $${movingPrice * currentQnty}, Planned Deliv Time ${plannedDelivTime} Days`
                    }
                  </p>
                </div>
              </div>
            </article>

            { this.renderMtrlComments() }

            <article className='media'>
              <div className='media-content'>
                <div className='content'>
                  <p>
                    <strong>ADA</strong><small> - 31m ago</small>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                  </p>
                  <p className='has-text-right has-size-7'><small><a>Save</a> · <a>Comment</a> · <a>Acknowledge</a></small></p>
                </div>
              </div>
            </article>

            <article className='media'>
              <div className='media-content'>
                <div className='content'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                  <a href='#'>#css</a> <a href='#'>#responsive</a>
                  <br />
                  <time dateTime='2016-1-1'>11:09 PM - 1 Jan 2016</time>
                </div>
              </div>
            </article>

          </div>
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
