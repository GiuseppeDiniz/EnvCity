import { StyleSheet, Image, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import { useState } from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { SearchBar } from './SearchBar';

interface Item {
    locations: string;
    latitude: number;
    longitude: number;
  }

interface Props {
    onSelectedItem: (item: Item) => void;
}

const TopBar: React.FC<Props> = ({ onSelectedItem }) => {
  const colorScheme = useColorScheme();
  const [showInput, setShowInput] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  return (
    <View style={styles.containerTop}>
      <View style={styles.TopLeft}>
        <Image
          source={require('../assets/images/logo-color-complete.png')}
          style={{ width: 100, height: 40 }}
        />
      </View>

      <View style={styles.TopMid}>
        <SearchBar showInput={showInput} onSelectedItem={item => {
            setSelectedItem(item);
            onSelectedItem(item);
        }}/>
      </View>

      <View style={styles.TopRight}>
        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        >
          {!showInput ? (
            <FontAwesome
              name="search"
              size={24}
              color={Colors[colorScheme].text}
              style={styles.icon}
              onPress={() => setShowInput(true)}
            />
          ) : (
            <Ionicons
              name="ios-close"
              size={24}
              color={Colors[colorScheme].text}
              style={styles.icon}
              onPress={() => setShowInput(false)}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTop: {
    height: 55,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#F5F5F5',
    justifyContent: 'center',
  },
  TopLeft: {
    flex: 1,
    marginTop: 5,
    marginLeft: 5,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  TopMid: {
    flex: 2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginLeft: 10,
  },
  TopRight: {
    flex: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row-reverse',
  },
  icon: {
    marginRight: 10,
  },
});

export default TopBar;
