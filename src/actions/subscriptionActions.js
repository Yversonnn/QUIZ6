import { SUBSCRIPTION_CREATE_TRANSACTION } from '../constants/subscriptionConstants';
import { buildApiUrl, getAuthHeaders } from '../utils/api';

export const createSubscriptionTransaction = (subscriptionPayload) => (dispatch) => {
  dispatch({
    type: SUBSCRIPTION_CREATE_TRANSACTION,
    payload: subscriptionPayload,
  });
};

export const subscribeToTier = (tierId, accessToken) => async (dispatch) => {
  const response = await fetch(buildApiUrl('/api/v1/subscription/subscribe/'), {
    method: 'POST',
    headers: getAuthHeaders(accessToken),
    body: JSON.stringify({ tier_id: tierId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Unable to create subscription.');
  }

  dispatch(
    createSubscriptionTransaction({
      id: data.id,
      user: data.user,
      tier: data.tier.name,
      createdAt: data.subscribed_at,
    })
  );

  return data;
};