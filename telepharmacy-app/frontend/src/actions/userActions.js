import axios from 'axios';
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userUpdateProfileRequest,
  userUpdateProfileSuccess,
  userUpdateProfileFail,
} from '../reducers/authReducer';

export const userLogin = (userData) => async (dispatch) => {
  try {
    dispatch(userLoginRequest());
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    // Updated to use the correct endpoint
    const { data } = await axios.post('/api/auth/login', userData, config);
    
    dispatch(userLoginSuccess(data));
    return data; // Return data for better error handling
  } catch (error) {
    const errorMessage = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
      
    dispatch(userLoginFail(errorMessage));
    throw error; // Re-throw error for better error handling
  }
};

export const userRegister = (userData) => async (dispatch) => {
  try {
    dispatch(userRegisterRequest());
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    // Updated to use the correct endpoint
    const { data } = await axios.post('/api/auth/register', userData, config);
    
    dispatch(userRegisterSuccess(data));
    return data; // Return data for better error handling
  } catch (error) {
    const errorMessage = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
      
    dispatch(userRegisterFail(errorMessage));
    throw error; // Re-throw error for better error handling
  }
};

export const logout = () => (dispatch) => {
  dispatch(userLogout());
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailsRequest());
    
    const {
      auth: { userInfo },
    } = getState();
    
    // For profile requests, use the profile endpoint
    if (id === 'profile') {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
      const { data } = await axios.get('/api/users/profile', config);
      
      dispatch(userDetailsSuccess(data));
      return data; // Return data for better error handling
    } else {
      // For other user requests, use the user ID endpoint
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
      const { data } = await axios.get(`/api/users/${id}`, config);
      
      dispatch(userDetailsSuccess(data));
      return data; // Return data for better error handling
    }
  } catch (error) {
    const errorMessage = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
      
    dispatch(userDetailsFail(errorMessage));
    throw error; // Re-throw error for better error handling
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateProfileRequest());
    
    const {
      auth: { userInfo },
    } = getState();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.put('/api/users/profile', user, config);
    
    dispatch(userUpdateProfileSuccess(data));
    return data; // Return data for better error handling
  } catch (error) {
    const errorMessage = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
      
    dispatch(userUpdateProfileFail(errorMessage));
    throw error; // Re-throw error for better error handling
  }
};