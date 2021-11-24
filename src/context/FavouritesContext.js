import createDataContext from './createDataContext';
import auth from '../api/auth';
import OCMApi from '../api/OCMApi';
import EncryptedStorage from 'react-native-encrypted-storage';

const favouriteReducer = (state, action) => {
  switch (action.type) {
    case 'dblist':
      return { dbList: action.payload}
    case 'favlist':
      return {...state, favList: action.payload}
    default:
      return state;
  }
};

const getDBList = dispatch = async () => {
  try {
    const token = await EncryptedStorage.getItem('token');
    await auth
      .get('/evplug/getFav',{
        headers: {
          Authorization: 'Bearer ' + token
        }})
      .then(response => {
        if (response!== null) {
          dispatch({type:'dblist', payload: response.data[0].fav})
        }
      })
      .catch(err => {
      });
  } catch (err) {

  }
};


const getFavourite = dispatch => async (list) =>{
  try {
    await OCMApi
      .get(`/poi?output=json&chargepointid=${list.join()}`)
      .then(response => {
        dispatch({type:'favlist' , payload: response.data})
      })
      .catch(err => {
        console.log('error');
      });
  } catch (err) {
    console.log('error11');
  }
}


const addToFav = dispatch => async () => {
  try {
    const response = await auth.get('/evplug/addFav');
  } catch (err) {
    console.log('error');
  }
};

const removeFromFav = dispatch => ocmid => {
  
};



export const {Context, Provider} = createDataContext(
  favouriteReducer,
  {addToFav, removeFromFav, getFavourite, getDBList},
  {favList: [], dbList:[]},
);
