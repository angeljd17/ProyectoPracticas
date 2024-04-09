import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchMovies } from './LlamadaApi'; // Importamos la función desde nuestro archivo api.js

const PaginaListado = () => {
  const [allMovies, setAllMovies] = useState([]); // Array para almacenar todas las películas
  const [visibleMovies, setVisibleMovies] = useState([]); // Array para mostrar las películas en la lista
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    setVisibleMovies(allMovies.slice(0, page * 6)); // Mostrar las películas de 6 en 6
  }, [allMovies, page]);

  const loadMovies = async () => {
    if (loading) return; // Evitar cargar más películas si ya se está cargando
    setLoading(true);
    try {
      const moviesData = await fetchMovies(page); // Usamos la función para obtener los datos de la API
      if (moviesData && Object.keys(moviesData).length > 0) {
        setAllMovies(prevData => [...prevData, ...Object.values(moviesData)]);
      } else {
        console.error('Error: Empty or undefined data received from API');
      }
    } catch (error) {
      console.error('Error fetching movies: ', error);
    }
    setLoading(false);
  };

  const handleMovieDetails = (movieId) => {
    navigation.navigate('Detalles', { movieId }); // Pasar el ID correctamente
  };

  const renderItem = ({ item }) => (
    <View style={styles.movieContainer}>
      <TouchableOpacity onPress={() => handleMovieDetails(item.id - 1)}>
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
    if (loading || allMovies.length === 0) {
      return; // Evitar cargar más datos si ya se está cargando o no hay datos
    }
    // Cargar más películas al hacer scroll al final de la lista
    setPage(prevPage => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleMovies}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <Text>Cargando...</Text>} // Mensaje de carga al final de la lista
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
