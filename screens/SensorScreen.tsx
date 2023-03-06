import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine } from 'victory-native';

import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { RootStackScreenProps } from '../types';
import { ScrollView } from 'react-native-gesture-handler';

function SensorScreen({ navigation, route }: RootStackScreenProps<'Sensor'>) {
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);
  const object = route.params as unknown as { [key: string]: any };  

  const { sensors } = object.airQualityData;
  const sensorsData = Object.keys(sensors).map((sensorKey) => {
    return {
      key: sensorKey,
      ...sensors[sensorKey],
    };
  });

  const filteredSensorsData = sensorsData.filter((sensor) => {
    //return sensor.key !== 'null';
    return sensor.key !== 'temperature' && sensor.key !== 'humidity';
  });

  const renderItem =  ({ item }: { item: propSensor }) => {
    const handlePress = () => {selectedItemKey === item.key ? setSelectedItemKey(null) : setSelectedItemKey(item.key);};

    const formatTick = (timeString: string) => {
      const [hours, minutes, seg] = timeString.split(':');
      return `${hours}h:${minutes}m`;
    }
    
    const data = item.SensorInfo ? item.SensorInfo.map(info => ({
      value: parseInt(info.value),
      timestamp: formatTick(info.timestamp.split("T")[1])
    })) : [];

      return(
        <View style={styles.container}>
            <View style={styles.titleView}>
              <View style={styles.titleViewSeparator}>
                <Text style={[styles.title, {}]}>{item.key}</Text>
                <TouchableOpacity onPress={handlePress}>
                  <Feather style={styles.icon} name="info" size={24} color="#00213b" />
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
            </View>

            <VictoryChart domainPadding={{x: 40}}>
              <VictoryAxis
                tickCount={24} // Define a quantidade de ticks no eixo x
                invertAxis
                style={{
                  ticks: { stroke: "black", size: 5 }, // Estilo dos ticks
                  tickLabels: {
                    fontSize: 8, // Tamanho da fonte dos rótulos dos ticks
                    angle: -45, // Ângulo de rotação dos rótulos dos ticks
                    textAnchor: "end", // Alinhamento horizontal dos rótulos dos ticks
                    padding: 1, // Espaçamento entre os rótulos dos ticks e o eixo
                  },
                }}
                
              />
              <VictoryAxis
                dependentAxis
                style={{
                  axis: { stroke: 'black' },
                  axisLabel: { fill: '#ccc', padding: 35 },
                  ticks: { stroke: '#ccc' },
                  tickLabels: { fill: 'black' },
                }}
                domain={item.color === 'green' ? [0, 15] : [0, 400]}
                label="(Ppb)"
              />
              <VictoryLine
                style={{
                  data: { stroke: `${item.color}`, strokeWidth: 5 },
                  parent: { border: '1px solid #ccc' },
                }}
                
                data={data}
                x="timestamp"
                y="value"
                interpolation="basis"
              />
            </VictoryChart>            

            {selectedItemKey === item.key && (
              <View style={styles.card}>
                <View style={[{ flexDirection: 'row' }]}>
                  <FontAwesome name="square" size={24} color={item.color || "#000"} />
                  <Text style={[styles.cardTitle, {color: item.color||"#000"}]}> {item.quality}</Text>
                </View>
                <Text style={[styles.cardText, { textAlign: 'justify' }]}>{item.description}</Text>
              </View>
            )}
        </View>
      );
  };
  
  return (
    <SafeAreaView style={styles.safeBody}>
      <View style={styles.body}>

          <View style={[styles.topBar, { marginBottom: 10 }]}>
            <View style={[styles.circleInfo, styles.mid, { backgroundColor: object.airQualityData.color }]}>
              <Text style={{color: 'white'}}>{Math.ceil(object.airQualityData.indice)}</Text></View>        
            <View style={styles.titleTop}><Text style={[styles.title,{color: 'white'}]}>{object.airQualityData.type}</Text></View>
            <View style={styles.mid}>
              <View style={styles.arrowBack}>
                <Feather name="log-out" size={24} color="white" onPress={() => navigation.goBack()}/>
              </View>
            </View>
          </View>

          <FlatList 
            data={filteredSensorsData}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            ListFooterComponent={<View style={{ 
              height: 100 , 
              marginTop: 20,
            }} />}
          />
      </View>
    </SafeAreaView>    
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',

    marginTop: 5,
    backgroundColor: '#F8F8FF',
    elevation: 1,
  },
  safeBody:{
    backgroundColor: "#00213b"
  },
  body:{
    backgroundColor: '#DCDCDC',
    padding: 10,
  },
  titleView: {
    paddingVertical: 10,
    paddingHorizontal: 20,    
  },
  title: {
    color: '#00213b',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    backgroundColor: '#00213b',
    height: 1,
    marginTop: 10,
  },
  titleViewSeparator: {
    flexDirection: 'row',
  },
  icon:{
    flex: 1,
    marginLeft: Dimensions.get("window").width/2.7, 
  },
  card: {
    position: 'absolute',
    top: 60,
    right: 3,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  cardTitle: {
    color: '#00213b',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    color: '#666',
    fontSize: 11,
  },



  topBar:{
    width:"100%",
    height: 50,
    backgroundColor: '#00213b',
    justifyContent:'space-evenly',
    padding: 10,
    flexDirection: 'row',

    borderRadius: 4,
    elevation: 4, // define a altura da sombra
    shadowColor: '#000', // define a cor da sombra
    shadowOffset: { width: 0, height: 2 }, // define a posição da sombra
    shadowOpacity: 0.2, // define a transparência da sombra
    shadowRadius: 4, // define a dispersão da sombra
  },
  arrowBack:{
  },
  titleTop:{
    alignItems: 'center',
    flex:2,
    
  },
  mid:{

  },
  text:{
    alignSelf: 'center',
    fontSize: 22,
  },
  viewSensor:{
    backgroundColor:'white',
    margin: 10,
  },
  titleSensor:{
    color: 'red',
  },
  circleInfo:{
    height: 30,
    width: 30,
    borderRadius: 60/2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'flex-start',

    
  },
  info:{
    flexDirection: 'row',
  }
});

export default SensorScreen;