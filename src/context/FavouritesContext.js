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

const getDBList = dispatch => async () => {
  try {
    const token = await EncryptedStorage.getItem('token');
    await auth
      .get('/evplug/getFav', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(response => {
        if (response !== null) {
          console.log('Reached here');
          console.log(response);
          dispatch({type: 'dblist', payload: response.data[0].fav});
        }
      })
      .catch(err => {
        console.log('in error');
      });
  } catch (err) {}
};

const addToFav = dispatch => async ocmid => {
  try {
    const response = await auth.get('/evplug/addFav');
  } catch (err) {
    console.log('error');
  }
};

const removeFromFav = dispatch => async ocmid => {
  try {
    const token = await EncryptedStorage.getItem('token');
    await auth
      .post(
        '/evplug/remove',
        {ocmid: ocmid},
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(response => {
        if (response !== null) {
          console.log('Reached here');
          console.log(response);
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
  {addToFav, removeFromFav, getDBList},
  {dbList: []},
);
