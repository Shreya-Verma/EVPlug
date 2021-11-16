import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import OCMApi from '../api/OCMApi';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'current_location':
        return { ...state };
    case 'changed_location':
        return { ...state };
    case 'search_query' :
        return {...state}
    default:
        return state;
  }
};

const changeName = dispatch => name => {
  dispatch({ type: 'change_name', payload: name });
};
const startRecording = dispatch => () => {
  dispatch({ type: 'start_recording' });
};
const stopRecording = dispatch => () => {
  dispatch({ type: 'stop_recording' });
};
const addLocation = dispatch => (location, recording) => {
  dispatch({ type: 'add_current_location', payload: location });
  if (recording) {
    dispatch({ type: 'add_location', payload: location });
  }
};
const reset = dispatch => () => {
  dispatch({ type: 'reset' });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, reset },
  { name: '', recording: false, locations: [], currentLocation: null }
);
