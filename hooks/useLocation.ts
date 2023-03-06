import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useLocation() {
  const [location, setLocation] = useState<any | null>(null);

  useEffect(() => {
    (async () => {        
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }        
      
      let{ coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
      setLocation({ latitude, longitude });      
    })();
  }, []);
  
  return location;
}
  