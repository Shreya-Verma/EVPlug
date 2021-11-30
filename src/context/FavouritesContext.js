import createDataContext from './createDataContext';
import appApi from '../api/appApi';

const favouriteReducer = (state, action) => {
  switch (action.type) {
    case 'dbFavList':
      return {dbFavList: action.payload, errorMessage: ''};
    case 'errorMessage':
      return {...state, dbFavList: [], errorMessage: action.payload};
    default:
      return state;
  }
};

const getFav = dispatch => async () => {
  try {
    const response = await appApi.get('/evplug/getFav');
    dispatch({type: 'dbFavList', payload: response.data[0].fav});
  } catch (err) {
    if(err.error){
      dispatch({type: 'errorMessage', payload: err.error});
    }else{
      dispatch({type: 'errorMessage', payload:"Something went wrong!"});
    }
  }
};

const addToFav = dispatch => async ocmid => {
  try{
    const response = await appApi.post('/evplug/addFav', {ocmid: ocmid});
    dispatch({type: 'dbFavList', payload: response.data.fav});
  }catch(err){
    if(err.error){
      dispatch({type: 'errorMessage', payload: err.error});
    }else{
      dispatch({type: 'errorMessage', payload:"Something went wrong!"});
    }
  }
  
};

const removeFromFav = dispatch => async ocmid => {
  try{
    const response = await appApi.post('/evplug/remove', {ocmid: ocmid});
    dispatch({type: 'dbFavList', payload: response.data.fav});
  }catch(err){
    if(err.error){
      dispatch({type: 'errorMessage', payload: err.error});
    }else{
      dispatch({type: 'errorMessage', payload:"Something went wrong!"});
    }
  }
  
};

export const {Context, Provider} = createDataContext(
  favouriteReducer,
  {getFav, addToFav, removeFromFav},
  {dbFavList: [], errorMessage: ''},
);
