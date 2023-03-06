import React, { useEffect, useState } from 'react';
import MapView, { Marker, Region, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { Dimensions, View, Text } from 'react-native';

import useLocation from '../hooks/useLocation';
import { mapStyle } from '../config/index.json';
import useAPI from '../hooks/useAPI';

import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { getAirQualityIndex, getWaterQualityIndex } from '../components/getAirQualityIndex';
import styles from '../assets/styles/styles';

import { RootStackParamList, RootStackScreenProps } from "../types";
import { heatIndexWithColor } from '../components/generateIndex';

function getCoordinate(location: string): import("react-native-maps").LatLng {
  const [latitude, longitude] = location.split(" ").map(Number);

  return { latitude, longitude };
}

const MapScreen: React.FC<{ location: any } & RootStackParamList<"Map">> = ({ location, navigation }) => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const userLocation = useLocation();
  const data = useAPI();
  
  useEffect(() => setSensors(data), [data]);

  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  useEffect(() => {
    const latitude = location?.latitude || (userLocation?.latitude || 0);
    const longitude = location?.longitude || (userLocation?.longitude || 0);
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, [location, userLocation]);

  const [components, setComponents] = useState<string[]>([]);

  useEffect(() => {
    const uniqueComponents = [...new Set(sensors.map(sensor => sensor.component))];
    setComponents(uniqueComponents);
  }, [sensors]);

//-------------------------------------------------------------------------

  const [airQualityData, setAirQualityData] = useState<{ [key: string]: ObjectFormat }>({});

  useEffect(() => {
    const airQualityComponents = components.filter(component => component.startsWith('air_quality'));

    const fetchData = async () => {
      const data: { [key: string]: ObjectFormat } = {};
      for (const component of airQualityComponents) {
        const componentData = await getAirQualityIndex(component, sensors);
        data[component] = componentData;
      }
      setAirQualityData(data);
    };
    fetchData();
  }, [components, sensors]);

  //-------------------------------------------------------------------------

  const [waterQualityData, setWaterQualityData] = useState<{ [key: string]: ObjectFormat }>({});

  useEffect(() => {
    const waterQualityComponents = components.filter(component => component.startsWith('water_quality'));

    const fetchData = async () => {
      const data: { [key: string]: ObjectFormat } = {};
      for (const component of waterQualityComponents) {
        const componentData = await getWaterQualityIndex(component, sensors);
        data[component] = componentData;
      }
      setWaterQualityData(data);
    };
    fetchData();
  }, [components, sensors]);

  //------------------------------------------------------------------------- 


  const markers = components.map((component, index) => {

    if(component.startsWith('air_quality')){    
      if (!airQualityData[component]) return null;
      const filteredSensors = sensors.filter(sensor => sensor.component === component);
      const firstSensor = filteredSensors[0];
      const coordinate = getCoordinate(firstSensor.location);  

      const temperature = airQualityData[`${component}`].sensors.temperature.indice;
      const humidity = airQualityData[`${component}`].sensors.humidity.indice;
      
      let textColor = 'white';
      if (airQualityData[`${component}`].color === 'yellow') {
        textColor = 'black';
      }

      
      if (temperature !== null && humidity !== null) {
        let {heatIndex, color} = heatIndexWithColor(temperature, humidity);
      

      return (      
        <Marker key={component} coordinate={coordinate}>
          <View style={[styles.markers, { backgroundColor: airQualityData[`${component}`].color}]}>
                <Feather name="wind" size={40} color="white" style={{ marginTop: 2 }} />
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
        
              <Callout tooltip onPress={() => navigation.navigate('Sensor', { airQualityData: airQualityData[`${component}`] })}>
                <View style={styles.bubble}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.circleInfo, { backgroundColor: airQualityData[`${component}`].color }]}>
                      <Text style={{ color: textColor}}>{Math.ceil(airQualityData[`${component}`].indice)}</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={[styles.squareInfo, { backgroundColor: color }]}>
                      <Text style={{ color: 'white' }}>{Math.ceil(heatIndex)}</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'blue' }}>IQAr</Text>
                    <View style={{ flex: 1 }} />   
                    <Text style={{ color: 'blue' }}>IH  </Text>     
                  </View>

                <View style={styles.separator} />

                <View style={styles.body}>
                  <View style={styles.weatherIcon}>
                    <FontAwesome5 name="temperature-low" size={10} color="black" />
                    <Text style={styles.weatherText}> {temperature}°C    </Text>
                  </View>
                  <View style={styles.weatherIcon}>
                    <Entypo name="water" size={10} color="blue" />
                    <Text style={styles.weatherText}> {humidity}%</Text>
                  </View>                
                </View>

                <View style={styles.separator} />
                <Text style={{ marginTop: -5, color: 'gray', fontSize: 8, alignSelf: 'center', textAlign:'center' }}>Atualizado em{'\n'} 27/02/2023</Text>

                </View>
              </Callout>
        </Marker>      
      );
    }
    }else{
      if (!waterQualityData[component]) return null;
      const filteredSensors = sensors.filter(sensor => sensor.component === component);
      const firstSensor = filteredSensors[0];
      const coordinate = getCoordinate(firstSensor.location);  

      return (  
            
        <Marker key={component} coordinate={coordinate}>
          <View style={[styles.markers, { backgroundColor: waterQualityData[`${component}`].color}]}>
                <Ionicons name="water-outline" size={40} color="white" style={{ marginTop: 2 }} />
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
        
              <Callout tooltip onPress={() => navigation.navigate('Sensor', { airQualityData: waterQualityData[`${component}`] })}>
                <View style={styles.bubble}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.circleInfo, { backgroundColor: waterQualityData[`${component}`].color}]}>
                      <Text style={{ color: 'white'}}>{Math.ceil(waterQualityData[`${component}`].indice)}</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={[styles.squareInfo, { backgroundColor: '#ccc' }]}>
                      <Text style={{ color: 'white' }}>?</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'blue' }}>IQA</Text>
                    <View style={{ flex: 1 }} />   
                    <Text style={{ color: 'blue' }}>IH  </Text>     
                  </View>

                <View style={styles.separator} />

                <View style={styles.body}>
                  <View style={styles.weatherIcon}>
                    <FontAwesome5 name="temperature-low" size={10} color="black" />
                    <Text style={styles.weatherText}> ?°C    </Text>
                  </View>
                  <View style={styles.weatherIcon}>
                    <Entypo name="water" size={10} color="blue" />
                    <Text style={styles.weatherText}> ?%</Text>
                  </View>                
                </View>

                <View style={styles.separator} />
                <Text style={{ marginTop: -5, color: 'gray', fontSize: 8, alignSelf: 'center', textAlign:'center' }}>Atualizado em{'\n'} 27/02/2023</Text>

                </View>
              </Callout>
        </Marker>        
      );
    }

  });
  return (
    <MapView
      style={{
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      }}
      provider={PROVIDER_GOOGLE}
      region={region}
      customMapStyle={mapStyle}
      showsUserLocation
    >
      {markers}
    </MapView>
  );
};

export default MapScreen;