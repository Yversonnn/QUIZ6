import { USER_SIGNIN_SUCCESS, USER_SIGNOUT } from '../constants/userConstants';

const savedAuthData = localStorage.getItem('authData')
  ? JSON.parse(localStorage.getItem('authData'))
  : null;

const initialState = {
  isAuthenticated: Boolean(savedAuthData?.accessToken),
  userInfo: savedAuthData?.userInfo || null,
  accessToken: savedAuthData?.accessToken || null,
  refreshToken: savedAuthData?.refreshToken || null,
};

export const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload.userInfo,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case USER_SIGNOUT:
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};