import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { getCharts } from 'actions/charts';
// import { Chart } from 'react-google-charts';
// import { defaultChartData } from 'constants/defaultChartData';

@connect(state => ({
  // error: state.charts.get('error'),
  // loading: state.charts.get('loading'),
  // charts: state.charts.get('charts'),
}))

export default class Landing extends Component {
  static propTypes = {
    // error: PropTypes.string,
    // loading: PropTypes.bool,
    // charts: PropTypes.object,
    // // from react-redux connect
    // dispatch: PropTypes.func,
  }

  componentWillMount() {
    // const {
    //   dispatch,
    //   charts,
    // } = this.props;

    // if (!charts) {
    //   dispatch(getCharts());
    // }
  }

  render() {
    // const {
    //   loading,
    //   error,
    //   charts,
    // } = this.props;

    return (
      <div className='landing-page columns'>

        <div className='column is-one-third'>
          <div className='list is-hoverable'>
            <a className='list-item'>
              Featured
            </a>
            <a className='list-item'>
              All Posts
            </a>
            <a className='list-item is-active'>
              Announcements
            </a>
            <a className='list-item'>
              Business
            </a>
            <a className='list-item'>
              Community
            </a>
            <a className='list-item'>
              Data
            </a>
            <a className='list-item'>
              Editor Tools
            </a>
            <a className='list-item'>
              Education
            </a>
            <a className='list-item'>
              Engineering
            </a>
            <a className='list-item'>
              Events
            </a>
            <a className='list-item'>
              Policy
            </a>
          </div>
        </div>

        <div className='column is-two-thirds'>
          <div className='card'>
            <div className='card-image'>
              <figure className='image is-4by3'>
                <img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image' />
              </figure>
            </div>
            <div className='card-content'>
              <div className='media'>
                <div className='media-left'>
                  <figure className='image is-48x48'>
                    <img src='https://bulma.io/images/placeholders/96x96.png' alt='Placeholder image' />
                  </figure>
                </div>
                <div className='media-content'>
                  <p className='title is-4'>John Smith</p>
                  <p className='subtitle is-6'>@johnsmith</p>
                </div>
              </div>

              <div className='content'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href='#'>#css</a> <a href='#'>#responsive</a>
                <br />
                <time dateTime='2016-1-1'>11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}
