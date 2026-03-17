import { USER_SIGNIN_SUCCESS, USER_SIGNOUT } from '../constants/userConstants';
import { buildApiUrl, getAuthHeaders } from '../utils/api';

export const signInUser = (credentials) => async (dispatch) => {
  const response = await fetch(buildApiUrl('/api/v1/users/login/'), {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Unable to sign in.');
  }

  const authPayload = {
    userInfo: data.user,
    accessToken: data.access,
    refreshToken: data.refresh,
  };

  localStorage.setItem('authData', JSON.stringify(authPayload));

  dispatch({
    type: USER_SIGNIN_SUCCESS,
    payload: authPayload,
  });
};

export const signOutUser = () => (dispatch) => {
  localStorage.removeItem('authData');
  dispatch({ type: USER_SIGNOUT });
};