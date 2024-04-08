import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const PaginaListado = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const token = 'Tu token aquí';
  const navigation = useNavigation();

  useEffect(() => {
    loadMovies();
  }, [page]);

  const loadMovies = async () => {
    try {
      const response = await axios.get(`https://api-w6avz2it7a-uc.a.run.app/movies?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(prevData => [...prevData, ...response.data]);
    } catch (error) {
      console.error('Error fetching movies: ', error);
    }
  };

  const handleMovieDetails = (movieId) => {
    // Sumar 1 al ID para ajustar al formato de ID de la API
    navigation.navigate('Detalles', { movieId: movieId - 1 });
  };

  const renderItem = ({ item }) => (
    <View style={styles.movieContainer}>
      <TouchableOpacity onPress={() => handleMovieDetails(item.id)}>
        <Image source={{ uri: item.pictureUrl }} style={styles.movieImage} />
      </TouchableOpacity>
      <View style={styles.movieDetails}>
        <Text style={styles.movieName}>{item.name}</Text>
        <Text style={styles.movieInfo}>
          Puntuación: {item.rating} | Duración: {item.duration} 
        </Text>
        <Text style={styles.movieDescription}>{item.description}</Text>
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => handleMovieDetails(item.id)}
        >
          <Text style={styles.viewDetailsText}>Ver Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
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
    marginBottom: 10,
  },
  viewDetailsButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  viewDetailsText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaginaListado;
