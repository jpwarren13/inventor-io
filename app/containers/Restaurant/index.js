/**
 *
 * Restaurant
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Input, Button } from 'semantic-ui-react';
// import axios from 'axios';
// import { POINT_CONVERSION_COMPRESSED } from 'constants';
import {
  makeSelectResAddress,
  makeSelectResName,
  makeSelectResNumber,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  updateAddress,
  updateName,
  updateNumber,
  sendRestaurant,
} from './actions';

/* eslint-disable react/prefer-stateless-function */
export class Restaurant extends React.Component {
  // constructor() {
  //   super();

  //   // this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // handleSubmit() {
  //   axios.get('/api/restaurant').then(data => console.log(data));
  // }

  render() {
    // const item = state => state.resName;
    // console.log(item);
    // console.log('Restaurant store', restaurant);
    return (
      <div>
        <Input
          onChange={this.props.onChangeName}
          size="large"
          placeholder="Name"
        />
        <br />
        <Input
          onChange={this.props.onChangeAddress}
          size="large"
          placeholder="Address"
        />
        <br />
        <Input
          onChange={this.props.onChangeNumber}
          size="large"
          placeholder="Phone Number"
        />
        <Button onClick={this.props.handleSubmit} content="Submit" primary />
      </div>
    );
  }
}

Restaurant.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onChangeName: PropTypes.func,
  onChangeAddress: PropTypes.func,
  onChangeNumber: PropTypes.func,
  handleSubmit: PropTypes.func,
};

// const mapStateToProps = state => ({ restaurant: state.restaurant });
const mapStateToProps = createStructuredSelector({
  resAddress: makeSelectResAddress,
  resName: makeSelectResName,
  resNumber: makeSelectResNumber,
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeName: e => dispatch(updateName(e.target.value)),
    onChangeAddress: e => dispatch(updateAddress(e.target.value)),
    onChangeNumber: e => dispatch(updateNumber(e.target.value)),
    handleSubmit: e => {
      console.log(e);
      dispatch(sendRestaurant());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'restaurant', reducer });
const withSaga = injectSaga({ key: 'restaurant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Restaurant);
