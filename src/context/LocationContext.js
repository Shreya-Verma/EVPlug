import createDataContext from './createDataContext';
import OCMApi from '../api/OCMApi';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_poi':
        return {...state, evdetails: action.payload, searchedLocation : null};
    case 'current_location':
      return {...state ,currentLocation: action.payload};
    case 'searched_location':
      return {...state, searchedLocation: action.payload};
    default:
        return state;
  }
};

const fetchCurrentLocation = dispatch => (location) => {
  dispatch({ type: 'current_location', payload: location });
};

const fetchSearchedLocation = dispatch => (location) => {
  dispatch({ type: 'searched_location', payload: location });
};


const fetchPoiData = dispatch => async ({latitude,longitude}) => {
  //make api call to get location
  try{
    const result =  OCMApi.get(`/poi?distance=30&distanceunit=miles&latitude=${latitude}&longitude=${longitude}&maxresults=20&output=json&compact=true&verbose=false`);
    result.then((response)=>{
        dispatch({type:'fetch_poi', payload: response.data})
    }).catch((err) => {
       //error
    });
  }catch(err){
    console.log('error')
  }
};


export const { Context, Provider } = createDataContext(
  locationReducer,
  { fetchCurrentLocation, fetchPoiData , fetchSearchedLocation },
  { evdetails: [], currentLocation: null, searchedLocation: null }
);
