
interface Item {
    locations: string;
    latitude: number;
    longitude: number;
}

//-------------------------------------------------------------------------------------------
interface Sensor {
    component: string;
    sensor: string;
    location: string;
    type: string;
    componentType: string;    
}

// getAirQuality() in '../components'
type SensorInfo = {
    value: string,
    timestamp: string,
    time: number
  }
  
  type propSensor = {
    [x: string]: ReactNode;
    SensorInfo: SensorInfo[] | null;
    indice: number | null;
    color: string | null;
    description: string | null;
    quality: string | null;
  };
  
  type Sensors = {
    air_quality_co: propSensor,
    air_quality_no2: propSensor,
    air_quality_o3: propSensor,
    air_quality_so2: propSensor,

    humidity: propSensor,
    temperature: propSensor,
  };

  type Sensors_Water = {
    water_quality_pH: propSensor,
    water_quality_turbidity: propSensor,
    water_quality_conductivity: propSensor,
    water_quality_dissolvedOxygen: propSensor,
    water_quality_BOD: propSensor,
    water_quality_phosphate: propSensor,
    water_quality_fecalColiform: propSensor,

    humidity: propSensor,
    temperature: propSensor,
  };
  
  interface ObjectFormat {
    indice: number;
    color: string;
    description: string;
    type: string;
    sensors: Record<string, propSensor>;
  }
  
//-------------------------------------------------------------------------------------------






  