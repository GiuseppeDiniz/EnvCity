import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Place {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
}

export default function AutocompletePlaces({ onPlaceSelected }: { onPlaceSelected: (place: Place) => void }) {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        if (!query) {
          setPlaces([]);
          return;
        }
        const response = await fetch(
            `https://api.tomtom.com/search/2/places/autocomplete.json?key=<your-api-key>&countrySet=<your-country-code>&limit=<your-limit>&query=${encodeURIComponent(query)}`
        );
        const json = await response.json();
        const fetchedPlaces = json.results.map((result: { address: { freeformAddress: any; }; position: { lat: any; lng: any; }; }) => ({
            name: result.address.freeformAddress,
            location: {
              lat: result.position.lat,
              lng: result.position.lng,
            },
        }));
        setPlaces(fetchedPlaces);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPlaces();
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput value={query} onChangeText={setQuery} />
      {places.length > 0 && (
        <FlatList
          data={places}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPlaceSelected(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
      backgroundColor: 'white',
    },
  });
