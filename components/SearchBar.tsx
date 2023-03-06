import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface Item {
  locations: string;
  latitude: number;
  longitude: number;
}

const items: Item[] = [
  { locations: 'Londrina-PR', latitude: -23.305814706494843, longitude: -51.1769235340792},
  { locations: 'Bauru-SP', latitude: -22.32337213077297, longitude: -49.07373617604416},
  { locations: 'Toledo-PR', latitude: -24.740909130669724, longitude: -53.73262725547237},
  { locations: 'Cascavel-PR', latitude: -23.305814706494843, longitude: -51.1769235340792},
  // ...
];

interface Props {
  showInput: boolean;
  onSelectedItem: (item: Item) => void;
}

export const SearchBar: React.FC<Props> = ({ showInput, onSelectedItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  useEffect(() => {
    const results = items.filter(item => item.locations.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredItems(results);
  }, [searchTerm]);
  
  return (
    <View>
      {showInput && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Localização"
              style={{ flex: 1 }}
            />            
          </View>
          {searchTerm !== '' && (
            <FlatList style={styles.list}
              data={filteredItems}
              keyExtractor={item => item.locations}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => [setSearchTerm(''), onSelectedItem(item)]}>
                  <Text style={styles.text}>{item.locations}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: 200,          
    backgroundColor: 'white',                                    
    position: 'absolute',
    marginTop: 30,
    padding: 10,
    
    borderColor: '#000',
    borderTopWidth:0,
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderStyle: 'solid',
  },
  text: {
    marginTop: 5,
    color: 'black',
    padding: 5,

    borderTopWidth: 1,
    borderColor: 'black',

  },
}); 