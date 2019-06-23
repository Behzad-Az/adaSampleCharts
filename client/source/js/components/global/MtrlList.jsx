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
    const { mtrlNum, header } = mtrl;
    const active = mtrlNum === this.props.selectedMtrlNum ? 'list-item is-link is-active' : 'list-item has-text-dark';
    const randomGenerator = Math.floor(Math.random() * 4);
    let icon;
    if (Number(mtrlNum) === 11931348) {
      icon = 'fas fa-search-dollar';
    } else {
      switch(randomGenerator) {
      case 0:
        icon = 'fas fa-search-dollar';
        break;
      case 1:
        icon = 'fas fa-chart-line';
        break;
      case 2:
        icon = 'far fa-clock';
        break;
      default:
        icon = 'fas fa-exclamation-circle';
        break;
      }
    }
    return (
      <a className={active} key={mtrlNum} onClick={() => this.selectMtrl(mtrlNum)}>
        <p className='has-text-weight-bold'><span className='icon is-left'><i className={icon} /></span> {` Part No. ${mtrl.mtrlNum}`}</p>
        <p className='is-size-7'>{header}</p>
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
