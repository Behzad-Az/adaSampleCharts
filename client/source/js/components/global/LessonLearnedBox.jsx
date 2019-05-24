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
            <span className='icon is-left'>
              <i className='far fa-clock' />
            </span>
            Lesson Learned
          </p>
          <a href='#' className='card-header-icon' aria-label='more options'>
            <span className='icon'>
              <i className='fas fa-angle-down' aria-hidden='true'></i>
            </span>
          </a>
        </header>
        <div className='card-content'>
          <div className='content'>
            Incompatibility of windshields on older and newer PC8000 shovels.
            <br />
            <small><time dateTime='2016-1-1'>1 Jan 2016</time></small>
          </div>
        </div>
        <footer className='card-footer'>
          <a href='#' className='card-footer-item'>Download</a>
          <a href='#' className='card-footer-item'>Acknowledge</a>
        </footer>
      </div>

    );
  }
}
