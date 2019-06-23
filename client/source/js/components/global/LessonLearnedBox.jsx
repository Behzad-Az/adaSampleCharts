import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect(state => ({
  // error: state.mtrlList.get('error'),
  // loading: state.mtrlList.get('loading'),
  // data: state.mtrlList.get('data'),
  // selectedMtrlNum: state.mtrlList.get('selectedMtrlNum')
}))

export default class Landing extends Component {
  static propTypes = {
    // error: PropTypes.string,
    // loading: PropTypes.bool,
    // data: PropTypes.object,
    // // from react-redux connect
    // dispatch: PropTypes.func,
  }

  componentWillMount() {
    // const {
    //   dispatch,
    //   data,
    // } = this.props;

    // if (!data) {
    //   dispatch(getMtrlList());
    // }
  }


  render() {
    return (

      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>
            <span className='icon' style={{ marginRight: '5px' }}><i className='fas fa-align-left fa-bullhorn' /></span><span> Reliability Alerts</span>
          </p>
        </header>
        <div className='card-content'>
          <div className='content columns is-vcentered'>
            <span className='icon' style={{ marginRight: '15px' }}><i className='fas fa-align-left fa-angle-left' /></span>
            <span className='has-text-justified is-size-7'>
              7495HF operators have reported parts incompatibility in newer and older machines.
              <br /><small><time dateTime='2019-1-15'>15 Jan 2019</time></small>
            </span>
            <span className='icon'style={{ marginLeft: '15px' }}><i className='fas fa-align-right fa-angle-right' /></span>
          </div>
        </div>
        <footer className='card-footer'>
          <a href='#' className='card-footer-item is-size-7'><span className='icon'><i className='fas fa-align-left fa-download' /></span><span>Download</span></a>
          <a href='#' className='card-footer-item is-size-7'><span className='icon'><i className='fas fa-align-left fa-check' /></span><span>Acknowledge</span></a>
        </footer>
      </div>

    );
  }
}
