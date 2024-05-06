
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// login action creator
export const login = (email, password) => {
  // console.log(email,password)
  return (dispatch) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'admin1234') {
        dispatch({ type: LOGIN_SUCCESS });
        sessionStorage.setItem('isLoggedIn', 'true');
      } else {
        dispatch({ type: LOGIN_FAILURE });
        sessionStorage.setItem('isLoggedIn', 'false');
      }
    }, 1000);
  };
};

// logout action creator
export const logout = () => {
  return { type: LOGOUT };
};
