import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const RestfulApp = () => {
  const [pets, setPets] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://petstore-demo-endpoint.execute-api.com/petstore/pets');
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortById = () => {
    const sortedPets = [...pets].sort((a, b) => a.id - b.id);
    setPets(sortedPets);
  };

  const sortByType = () => {
    const sortedPets = [...pets].sort((a, b) => a.type.localeCompare(b.type));
    setPets(sortedPets);
  };

  const sortByPrice = () => {
    const sortedPets = [...pets].sort((a, b) => a.price - b.price);
    setPets(sortedPets);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pet Store App</Text>
      <View style={styles.buttonContainer}>
        <Button title="Ordenar por ID" onPress={sortById} />
        <Button title="Ordenar por tipo" onPress={sortByType} />
        <Button title="Ordenar por preço" onPress={sortByPrice} />
      </View>
      <ScrollView style={styles.scrollView}>
        {pets.map((pet) => (
          <View key={pet.id} style={styles.petCard}>
            <Text style={styles.petText}>{`ID: ${pet.id}`}</Text>
            <Text style={styles.petText}>{`Type: ${pet.type}`}</Text>
            <Text style={styles.petText}>{`Price: $${pet.price}`}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-betwen',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  petCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  petText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default RestfulApp;
