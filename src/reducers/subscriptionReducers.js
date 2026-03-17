import { SUBSCRIPTION_CREATE_TRANSACTION } from '../constants/subscriptionConstants';

const initialState = {
  transactions: [],
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIPTION_CREATE_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};