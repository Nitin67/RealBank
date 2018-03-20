import { userConstants } from '../_constants';

export function createIdData(state = {}, action) {
  switch (action.type) {
    case 'ACCOUNTIDFOUND':
      return {
        data: action.data
      };
    default:
      return state
  }
}
