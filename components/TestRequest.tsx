import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import useAPI from '../hooks/useAPI';

const App = () => {
  const [components, setComponents] = useState<string[]>([]);
  const sensors = useAPI();

  useEffect(() => {
    const uniqueComponents = [...new Set(sensors.map(sensor => sensor.component))];    
    setComponents(uniqueComponents);
  }, [sensors]);   

  return (
    <View style={styles.container}>
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    {components.map(component => (
      <View key={component} style={styles.componentContainer}>
        <Text style={styles.title}>Component: {component} </Text>
        {sensors
          .filter(sensor => sensor.component === component)
          .map(sensor => (
            <Text key={sensor.sensor} style={styles.sensorText}>
              Sensor: {sensor.sensor} Location: {sensor.location}
            </Text>
          ))}
      </View>
    ))}
  </ScrollView>
</View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 10,
  },
  componentContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
    margin: 5,
  },
  title: {
    color: 'blue',
    fontWeight: 'bold',
  },
  sensorText: {
    marginTop: 5
  },
  scrollViewContent: {
    paddingBottom: 100, // define um espaçamento abaixo do último item para garantir que não seja cortado
  },
});

export default App;