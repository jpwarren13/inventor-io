import { takeEvery } from 'redux-saga/effects';
// take, call, put, select,
// import request from '../../utils/request';
import axios from 'axios';
// Individual exports for testing

export function* sendRestaurant() {
  console.log('sendRestaurant CALLED');
  yield takeEvery('SEND_RESTAURANT', restaurantSaga);
}

export default function* restaurantSaga() {
  // See example in containers/HomePage/saga.js
  try {
    const response = yield axios.get('/api/restaurant');
    console.log('INSIDE SAGA!!!!', response);
  } catch (err) {
    throw err;
  }
}
