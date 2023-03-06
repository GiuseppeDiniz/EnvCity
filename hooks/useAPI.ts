import { useState, useEffect } from 'react';
import {redirect_url, HEADERS} from '../config/index.json'

export default function useAPI() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const fetchData = async () => {
    try {
      const response = await fetch(redirect_url, {
        method: 'GET',
        headers: HEADERS
      });
      const data = await response.json() as { providers: { sensors: Sensor[] }[] };
      setSensors(data.providers[0].sensors);
    } catch (error) {
      console.error("hooks "+error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return sensors;
}