import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const PaginaListado = () => {
  const [data, setData] = useState([]);

  const token = 'Tu token aquí';

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const response = await axios.get('https://api-w6avz2it7a-uc.a.run.app/movies', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching movies: ', error);
    }
  };

  const showActors = (actors) => {
    Alert.alert('Actores', actors.join(', '));
  };

  const renderItem = ({ item }) => (
    <View style={styles.movieContainer}>
      <Image source={{ uri: item.pictureUrl }} style={styles.movieImage} />
      <View style={styles.movieDetails}>
        <Text style={styles.movieName}>{item.name}</Text>
        <Text style={styles.movieInfo}>
          Puntuación: {item.rating} | Duración: {item.duration} min
        </Text>
        <Text style={styles.movieDescription}>{item.description}</Text>
        <Button
          title="Ver Actores"
          onPress={() => showActors(item.actors ? item.actors : [])}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  movieImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
  },
  movieName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieInfo: {
    fontSize: 14,
    marginBottom: 5,
  },
  movieDescription: {
    fontSize: 14,
  },
});

export default PaginaListado;
