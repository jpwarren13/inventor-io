/*
 *
 * Restaurant actions
 *
 */

import {
  UPDATE_ADDRESS,
  UPDATE_NAME,
  UPDATE_NUMBER,
  SEND_RESTAURANT,
} from './constants';

export function updateAddress(address) {
  return {
    type: UPDATE_ADDRESS,
    address,
  };
}

export function updateName(name) {
  return {
    type: UPDATE_NAME,
    name,
  };
}

export function updateNumber(number) {
  return {
    type: UPDATE_NUMBER,
    number,
  };
}

export function sendRestaurant() {
  return {
    type: SEND_RESTAURANT,
  };
}
