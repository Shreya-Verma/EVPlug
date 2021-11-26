import createDataContext from './createDataContext';
import auth from '../api/auth';
import EncryptedStorage from 'react-native-encrypted-storage';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return {
        errorMessage: '',
        authData : { token: action.payload.token, email: action.payload.email}
      };
    case 'signout':
      return {
        authData : { token: null, email: ''},
        errorMessage: '',
      };
    case 'add_error':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'clear_error_message':
      return {
        ...state,
        errorMessage: '',
      };
    default:
      return state;
  }
};

const signup =
  dispatch =>
  async ({email, password}) => {
    try {
      const response = await auth.post('/evplug/signup', {
        email,
        password,
      });
      await EncryptedStorage.setItem('token',JSON.stringify(response.data));
      dispatch({type: 'signin', payload: response.data});
    } catch (err) {
      if (err.error === 'auth/operation-not-allowed') {
        dispatch({
          type: 'add_error', 
          payload: 'Empty email or password!'
        });
      } else if (err.error === 'auth/email-already-in-use') {
        dispatch({
          type: 'add_error', 
          payload: 'Email already in use!'
        });
      } else if (err.error === 'auth/invalid-email') {
        dispatch({
          type: 'add_error', 
          payload: 'Invalid email!'
        });
      } else if (err.error === 'auth/weak-password') {
        dispatch({
          type: 'add_error',
          payload: 'Password should be at least 6 characters',
        });
      } else {
        dispatch({
          type: 'add_error',
          payload: 'Something went wrong with sign up!',
        });
      }
    }
  };



const signin =
  dispatch =>
  async ({email, password}) => {
    try {
      const response = await auth.post('/evplug/signin', {
        email,
        password,
      });
      console.log(response);
      await EncryptedStorage.setItem('authData',JSON.stringify(response.data));
      dispatch({type: 'signin', payload: response.data});
    } catch (err) {
      if (err.error === 'auth/operation-not-allowed') {
        dispatch({
          type: 'add_error', 
          payload: 'Empty email or password!'
        });
      } else if (err.error === 'auth/user-not-found') {
        dispatch({
          type: 'add_error', 
          payload: 'No user registred with given email id!'
        });
      } else if (err.error === 'auth/invalid-email') {
        dispatch({
          type: 'add_error', 
          payload: 'Invalid email!'
        });
      } else if (err.error === 'auth/wrong-password') {
        dispatch({
          type: 'add_error',
          payload: 'Invalid password!',
        });
      } else {
        dispatch({
          type: 'add_error',
          payload: 'Something went wrong with sign in!',
        });
      }
    }
  };




const signout = dispatch => async () => {
  try {
      await EncryptedStorage.removeItem("authData");
      dispatch({type: 'signout'});
  } catch (error) {
    console.log("native",error);
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({type: 'clear_error_message'});
};

const restoreToken = dispatch => (data) => {
  dispatch({type: 'signin', payload: data});
};

export const {Context, Provider} = createDataContext(
  authReducer,
  {signup, signin, signout, clearErrorMessage, restoreToken},
  {
    authData: { token: null, email: ''}, 
    errorMessage: ''
  },
);
