import createDataContext from './createDataContext';
import appApi from '../api/appApi';

const favouriteReducer = (state, action) => {
  switch (action.type) {
    case 'dblist':
      return {dbList: action.payload};
    default:
      return state;
  }
};

const addToFav = dispatch => async (ocmid) => {
    const response = await appApi.post('/evplug/addFav',{ocmid: ocmid});
    if (response !== null) {
      dispatch({type: 'dblist', payload: response.data.fav});
    }
};

const removeFromFav = dispatch => async (ocmid) => {
    const response = await appApi.post('/evplug/remove',{ocmid: ocmid});
    if (response !== null) {
      dispatch({type: 'dblist', payload: response.data.fav});
    }
};



export const {Context, Provider} = createDataContext(
  favouriteReducer,
  {addToFav, removeFromFav},
  {dbList: []},
);
