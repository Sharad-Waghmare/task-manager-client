import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './Action';

const initialState = {
  isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true',
  loginError: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loginError: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginError: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;