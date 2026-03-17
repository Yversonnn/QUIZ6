import {
  CHATBOT_BOT_REPLY,
  CHATBOT_CLEAR_MESSAGES,
  CHATBOT_SEND_MESSAGE,
} from '../constants/chatbotConstants';

const initialState = {
  messages: [
    {
      id: 1,
      role: 'bot',
      text: 'Hello. I only answer questions about this Plumbing and Drain Services project.',
    },
  ],
};

export const chatbotReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATBOT_SEND_MESSAGE:
    case CHATBOT_BOT_REPLY:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case CHATBOT_CLEAR_MESSAGES:
      return {
        ...state,
        messages: initialState.messages,
      };
    default:
      return state;
  }
};