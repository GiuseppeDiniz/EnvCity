import { Button, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TestRequest from '../components/TestRequest';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}><Text style={styles.text}>About</Text></View>
      <TestRequest/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00213b"
  },
  topBar:{
    width:"100%",
    height: 50,
    backgroundColor: 'white',
    justifyContent:'space-evenly',
  },
  text:{
    fontSize: 16,
    alignSelf: 'center',    
    fontWeight:'bold',
  }
});
