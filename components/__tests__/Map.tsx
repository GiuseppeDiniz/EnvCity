  import React, { useEffect, useState } from 'react';
  import MapView, { Marker, Region, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
  import { StyleSheet, Dimensions, View, Text } from 'react-native';

  import useLocation from '../../hooks/useLocation';
  import { mapStyle } from '../../config/index.json';
  import useAPI from '../../hooks/useAPI';
  import { Feather } from '@expo/vector-icons';

  interface MapProps {
    location?: {
      latitude: number;
      longitude: number;
    };
  }

  interface Sensor {
    component: string;
    sensor: string;
    location: string;
    type: string;    
  }

  function parse(location: string, index: number) {
    var string = location + '';
    var locations = string.split(" ");
    
    return locations[index];
  }

  const Map: React.FC<MapProps> = ({ location }) => {
    const [sensors, setSensors] =  useState<Sensor[]>([]);
    const userLocation = useLocation();
    const  data  = useAPI();

    useEffect(() => setSensors(data), [data]);

    const [region, setRegion] = useState<Region>({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    });

    useEffect(() => {
      const setInitialRegion = () => {
        let latitude = 0;
        let longitude = 0;

        if (location) {
          latitude = location.latitude;
          longitude = location.longitude;
        } else if (userLocation) {
          latitude = userLocation.latitude;
          longitude = userLocation.longitude;
        }

        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      };

      setInitialRegion();
    }, [location, userLocation]);

    const groupedSensors = sensors.reduce((acc: { [key: string]: { component: string; locations: string[]; type: string; } }, { component, location, type }) => {
      if (!acc[component]) {
        acc[component] = {
          component,
          locations: [location],
          type,
        };
      } else {
        acc[component].locations.push(location);
      }
    
      return acc;
    }, {});

  const markers = Object.values(groupedSensors).map(({ component, locations, type }) => {
    const [firstLocation] = locations;
    const coordinate = {
      latitude: Number(parse(firstLocation, 0)),
      longitude: Number(parse(firstLocation, 1)),
    };
  
    return (
      <Marker key={component} coordinate={coordinate}>
        <View style={[styles.markers, { backgroundColor: 'green' }]}>
          <Feather name="wind" size={40} color="white" style={{ marginTop: 2 }} />
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
        <Callout tooltip>
          <View style={styles.bubble}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.circleInfo} />
              <View style={{ flex: 1 }} />
              <View style={styles.squareInfo} />
            </View>
            <View style={styles.body}>
              <Text style={{ color: 'white' }}>{type}</Text>
            </View>
          </View>
        </Callout>
      </Marker>
    );
  });

    return (
      <>
        {userLocation && (
          <MapView
            style={[
              styles.map,
              { height: Dimensions.get("window").height, width: Dimensions.get("window").width },
            ]}
            provider={PROVIDER_GOOGLE}
            region={region}
            customMapStyle={mapStyle}
            showsUserLocation
          >
            {markers}
          </MapView>
        )}
      </>
    );
  };

  const styles = StyleSheet.create({
    map: {
      justifyContent: 'center',
    },
    markers:{
      height: 50,
      width: 50,
      borderRadius: 100/2,
      borderWidth: 3,
      borderColor: "white",
      alignItems: "center",
      zIndex:1.
    },
    arrow: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: 'white',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -32,
    },
    arrowBorder: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#F5F5F5',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -5,
      // marginBottom: -15
    },

    bubble: {    
      flexDirection: 'column',
      alignSelf: 'flex-start',
      backgroundColor: '#FFFAFA',
      borderRadius: 6,
      borderColor: '#ccc',
      borderWidth: 0.5,
      padding: 5,
      height:130,
      width: 130,
    },
    circleInfo:{
      height: 30,
      width: 30,
      borderRadius: 60/2,
      alignItems: "center",
      alignSelf: 'flex-start',
      backgroundColor: 'green',
    },
    squareInfo:{
      height: 30,
      width: 30,
      alignSelf: 'flex-end',
      alignItems: "center",
      backgroundColor: 'green',
    },
    body:{
      alignSelf: 'center',
      marginTop: 5,
      backgroundColor: 'black',
      height: "70%",
      width: "100%",
    }
    
  });

  export default Map;