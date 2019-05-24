import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMtrlList, setSelectedMtrl } from 'actions/mtrlList';
import { getGoogleChart } from 'actions/googleChart';

@connect(state => ({
  error: state.mtrlList.get('error'),
  loading: state.mtrlList.get('loading'),
  data: state.mtrlList.get('data'),
  selectedMtrlNum: state.mtrlList.get('selectedMtrlNum')
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

  selectMtrl(newSelection) {
    const { dispatch, selectedMtrlNum } = this.props;
    if (newSelection && newSelection !== selectedMtrlNum) {
      dispatch(getGoogleChart(Number(newSelection)));
      dispatch(setSelectedMtrl(newSelection));
    }
  }

  renderMtrl(mtrl) {
    const { mtrlNum } = mtrl;
    const className = mtrlNum === this.props.selectedMtrlNum ? 'list-item is-link is-active' : 'list-item has-text-dark';
    return (
      <a className={className} key={mtrlNum} onClick={() => this.selectMtrl(mtrlNum)}>
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
        <div className='mtrl-list list is-hoverable'>
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
