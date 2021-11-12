import AsyncStorage from '@react-native-async-storage/async-storage';

import createDataContext from './createDataContext';
import EVPlugApi from '../api/EVPlugApi';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return {...state, errorMessage: action.payload};
    case 'SIGN_IN':
      return {errorMessage:'', token: action.payload}
    default:
      return state;
  }
};

const signup = dispatch => {
  return async ({email, password}) => {
    try {
      const response = await EVPlugApi.post('/evplug/signup', {email, password});
      await AsyncStorage.setItem('token', response.data.token);
      
      //navigate to Home Screen
        
    } catch (err) {
      dispatch({type:'ADD_ERROR', payload: 'Something went wrong with sign up'})
    }
  };
};

const signin = dispatch => {
  return ({email, password}) => {
    //make api request to sign up
  };
};

const signout = dispatch => {
  return () => {
    //make api request to sign up
  };
};

export const {Context, Provider} = createDataContext(
  authReducer,
  {signup, signin, signout},
  {token: null, errorMessage: ''},
);
