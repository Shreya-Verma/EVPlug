import createDataContext from './createDataContext';
import auth from '../api/auth';
import EncryptedStorage from 'react-native-encrypted-storage';


const favouriteReducer = (state, action) => {
  switch (action.type) {
    case 'dblist':
      return {dbList: action.payload};
    default:
      return state;
  }
};


const addToFav = dispatch => async (ocmid) => {
  try {
    const authData = await EncryptedStorage.getItem("authData");
    const {token} = JSON.parse(authData);
    await auth
      .post(
        '/evplug/addFav',
        {ocmid: ocmid},
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(response => {
        if (response !== null) {
          dispatch({type: 'dblist', payload: response.data.fav});
        }
      })
      .catch(err => {
        console.log('in error');
      });
  } catch (err) {
    console.log('in error');
  }
};

const removeFromFav = dispatch => async (ocmid) => {
  try {
    const authData = await EncryptedStorage.getItem("authData");
    const {token} = JSON.parse(authData);
    await auth
      .post(
        '/evplug/remove',
        {ocmid: ocmid},
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(response => {
        if (response !== null) {
          dispatch({type: 'dblist', payload: response.data.fav});
        }
      })
      .catch(err => {
        console.log('in error');
      });
  } catch (err) {
    console.log('in error');
  }
};



export const {Context, Provider} = createDataContext(
  favouriteReducer,
  {addToFav, removeFromFav},
  {dbList: []},
);
