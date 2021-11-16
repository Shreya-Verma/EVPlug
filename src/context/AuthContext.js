import createDataContext from './createDataContext';
//import EVPlugApi from '../api/EVPlugApi';
import auth from '@react-native-firebase/auth';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {
        ...state, 
        errorMessage: action.payload
      };
    case 'signin':
      return {
        errorMessage: '', 
        token: action.payload
      };
    case 'clear_error_message':
      return {
        ...state, 
        errorMessage: ''
      };
    case 'signout':
      return {
        token: null, 
        errorMessage: ''
      };
    default:
      return state;
  }
};

// const signup =
//   dispatch =>
//   async ({email, password}) => {
//     console.log({email, password});
//     console.log(EVPlugApi);

//     try {
//       const response = await EVPlugApi.post('/signup', {
//         email,
//         password,
//       });
//       console.log(response);
//       await AsyncStorage.setItem('token', response.data.token);
//       dispatch({type: 'signin', payload: response.data.token});
//       //navigate to Home Screen
//     } catch (err) {
//       console.log(err);
//       dispatch({
//         type: 'add_error',
//         payload: 'Something went wrong with sign up!',
//       });
//     }
//   };

const signup =
  dispatch =>
  async ({email, password}) => {
    try {
      const result = await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
            console.log(response);
            const idToken = auth().currentUser.getIdToken();
            console.log(idToken);
            dispatch({type: 'signin', payload: idToken});
        })
        .catch(error => {
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
            dispatch({type: 'add_error', payload: 'Email already in use!'});
          }
          if (error.code === 'auth/invalid-email') {
            dispatch({type: 'add_error', payload: 'Invalid email!'});
          }
        });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up!',
      });
    }
  };

const signin =
  dispatch =>
  async ({email, password}) => {
    try {
      const response = await auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log(response);
          const idToken =  auth().currentUser.getIdToken();
          dispatch({type: 'signin', payload: idToken});
         
        })
        .catch(error => {
          console.log(error);
          dispatch({type: 'add_error', payload: 'Email already in use!'});
        });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign in!',
      });
    }
  };

const signout = dispatch => async () => {
  const response = await auth()
    .signOut()
    .then(resp => {
      dispatch({type: 'signout'});
    })
    .catch(err => {});
};

const clearErrorMessage = dispatch => () => {
  dispatch({type: 'clear_error_message'});
};

export const {Context, Provider} = createDataContext(
  authReducer,
  {signup, signin, signout, clearErrorMessage},
  {
    token: null,
    errorMessage:''
  }
);
