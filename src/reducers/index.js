import { combineReducers } from 'redux';
import { chatbotReducer } from './chatbotReducers';
import { subscriptionReducer } from './subscriptionReducers';
import { userAuthReducer } from './userReducers';

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
  chatbot: chatbotReducer,
  subscription: subscriptionReducer,
});

export default rootReducer;