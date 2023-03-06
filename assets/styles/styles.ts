import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    map: {
      justifyContent: 'center',
    },
    markers:{
      height: 50,
      width: 50,
      borderRadius: 100/2,
      borderWidth: 3,
      borderColor: "black",
      alignItems: "center",
      zIndex:1,
      elevation:1,
    },
    arrow: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: 'black',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -32,
      elevation:1,
      
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
      justifyContent: "center",
      alignSelf: 'flex-start',
    },
    squareInfo:{
      height: 30,
      width: 30,
      alignSelf: 'flex-end',
      alignItems: "center",
      justifyContent: "center",
    },
    body: {
      alignSelf: 'center',
      marginTop: -20,
      height: 50,
      width: "100%",
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: -30,
      marginBottom: -20,
      paddingHorizontal: 20,
    },
    weatherIcon: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    weatherText: {
      fontSize: 16,
    },
    separator: {
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      marginVertical: 10,
    },
    
  });

export default styles;