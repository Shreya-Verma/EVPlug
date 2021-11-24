import {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request} from 'react-native-permissions';

const useLocation = (callback) => {

  const [error, setError] = useState(null);

  const startWatching = async () => {
    try {
      const granted = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
      );
      if(granted !== 'granted')
      {
        setError('Please Enable Location Services');
      }
      await Geolocation.getCurrentPosition(callback, (error) => {
        setError('Error with location')
       },{
        accuracy: {
          android:'high',
          ios:'best'
        },
        distanceFilter: 10 //meters
      });
      
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
      startWatching();
  },[]);

  return [error];
};

export default useLocation;
