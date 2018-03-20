import { userConstants } from '../_constants';

export function transaction(state = {}, action) {
  switch (action.type) {
    case 'ACCOUNTRANSACTION':
  return {
        transaction: action.data
         };
    default:
      return state
  }
}
