import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GoogleChart from 'components/global/GoogleChart';
import { defaultChartData } from 'constants/defaultChartData';

@connect(state => ({
  // error: state.chart.get('error'),
  // loading: state.chart.get('loading'),
  // charts: state.chart.get('charts'),
}))

export default class Landing extends Component {
  static propTypes = {
    // error: PropTypes.string,
    // loading: PropTypes.bool,
    // chart: PropTypes.object,
    // // from react-redux connect
    // dispatch: PropTypes.func,
  }

  componentWillMount() {
    // const {
    //   dispatch,
    //   chart,
    // } = this.props;

    // if (!chart) {
    //   dispatch(getChart());
    // }
  }

  render() {
    // const {
    //   loading,
    //   error,
    //   charts,
    // } = this.props;

    return (
      <div className='landing-page container'>
        <br />
        <div className='columns'>
          <div className='column is-one-third'>

            <div className='field has-addons'>
              <div className='control has-icons-left is-expanded'>
                <input className='input' type='text' placeholder='Find a part #' />
                <span className='icon is-left'>
                  <i className='fas fa-search'></i>
                </span>
              </div>
              <div className='control'>
                <a className='button is-info'>
                  Search
                </a>
              </div>
            </div>

            <div className='list is-hoverable'>
              <a className='list-item is-light'>
                <span className='icon is-left'><i className='fas fa-exclamation-circle' /></span> MM# xyzxyzxyz
              </a>
              <a className='list-item'>
                <span className='icon is-left'><i className='fas fa-exclamation-circle' /></span> MM# xyzxyzxyz
              </a>
              <a className='list-item is-active'>
                <span className='icon is-left'><i className='fas fa-exclamation-circle' /></span> MM# 11093090
              </a>
              <a className='list-item'>
                <span className='icon is-left'><i className='fas fa-exclamation-circle' /></span> MM# xyzxyzxyz
              </a>
              <a className='list-item'>
                <span className='icon is-left'><i className='fas fa-exclamation-circle' /></span> MM# xyzxyzxyz
              </a>
              <a className='list-item'>
                <span className='icon is-left'><i className='fas fa-exclamation-circle' /></span> MM# xyzxyzxyz
              </a>
              <a className='list-item'>
                <span className='icon is-left'><i className='fas fa-exclamation-circle' /></span> MM# xyzxyzxyz
              </a>
              <a className='list-item'>
                <span className='icon is-left'><i className='fas fa-exclamation-circle' /></span> MM# xyzxyzxyz
              </a>
              <a className='list-item'>
                <span className='icon is-left'><i className='fas fa-exclamation-circle' /></span> MM# xyzxyzxyz
              </a>
              <a className='list-item'>
                <span className='icon is-left'><i className='fas fa-exclamation-circle' /></span> MM# xyzxyzxyz
              </a>
              <a className='list-item'>
                <span className='icon is-left'><i className='fas fa-exclamation-circle' /></span> MM# xyzxyzxyz
              </a>
            </div>
          </div>

          <GoogleChart />

        </div>
      </div>
    );
  }
}
