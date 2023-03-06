import { useState } from 'react';
import { StyleSheet, ActivityIndicator, Text, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootTabScreenProps, RootStackScreenProps } from '../types';

import { View } from '../components/Themed';
import TopBar from '../components/TopBar';
import FabButton from '../components/FabButton';

import MapScreen from './MapScreen';
import AutocompletePlaces from '../components/__tests__/TestComponent';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTop}>
      <TopBar onSelectedItem={item => setSelectedItem(item)} />
      </View>      
      
      <MapScreen location = {selectedItem} navigation={navigation}/>
      
      <ActivityIndicator style={{marginTop: '60%'}} size="large" color="#00ff00" />
      
      <FabButton 
        style={{bottom: 70, left: 40}}
      />
      
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00213b"
  },
  containerTop:{
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  fundo:{
    backgroundColor: "black",
    flex: 1,
    width:"100%",
    height: "100%",
  }
});
