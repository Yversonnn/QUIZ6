import {
  CHATBOT_BOT_REPLY,
  CHATBOT_CLEAR_MESSAGES,
  CHATBOT_SEND_MESSAGE,
} from '../constants/chatbotConstants';
import { buildApiUrl, getAuthHeaders } from '../utils/api';

export const sendChatbotMessage = (question, accessToken) => async (dispatch) => {
  dispatch({
    type: CHATBOT_SEND_MESSAGE,
    payload: {
      id: Date.now(),
      role: 'user',
      text: question,
    },
  });

  const response = await fetch(buildApiUrl('/api/v1/chat/ask/'), {
    method: 'POST',
    headers: getAuthHeaders(accessToken),
    body: JSON.stringify({ message: question }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Unable to get chatbot response.');
  }

  dispatch({
    type: CHATBOT_BOT_REPLY,
    payload: {
      id: Date.now() + 1,
      role: 'bot',
      text: `${data.answer} Usage left: ${data.usage_left}`,
    },
  });
};

export const clearChatbotMessages = () => (dispatch) => {
  dispatch({ type: CHATBOT_CLEAR_MESSAGES });
};