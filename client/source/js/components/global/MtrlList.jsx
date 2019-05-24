import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMtrlList } from 'actions/mtrlList';

@connect(state => ({
  error: state.mtrlList.get('error'),
  loading: state.mtrlList.get('loading'),
  data: state.mtrlList.get('data'),
}))

export default class Landing extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    data: PropTypes.object,
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  componentWillMount() {
    const {
      dispatch,
      data,
    } = this.props;

    if (!data) {
      dispatch(getMtrlList());
    }
  }

  renderMtrl(mtrl) {
    const { mtrlNum } = mtrl;
    const className = Number(mtrlNum) === 11093090 ? 'list-item is-link is-active' : 'list-item has-text-dark';
    return (
      <a className={className} key={mtrlNum}>
        <span className='icon is-left'><i className='fas fa-exclamation-circle' /></span> {` MM ${mtrl.mtrlNum}`}
      </a>
    );
  }

  renderMtrlList() {
    const {
      loading,
      error,
      data
    } = this.props;
    if (data) {
      return (
        <div className='list is-hoverable'>
          { data.mtrlList.map(mtrl => this.renderMtrl(mtrl)) }
        </div>
      );
    } else if (error) {
      return <p>Error in fetching material list</p>;
    } else {
      return <p>Loading...</p>;
    }
  }

  render() {
    return this.renderMtrlList();
  }
}
