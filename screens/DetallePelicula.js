import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchMovies } from '../services/LlamadaApi'; // Importa la función para obtener todas las películas
import Icon from 'react-native-vector-icons/Ionicons';

const DetallePelicula = ({ route }) => {
  const { movieId } = route.params; // Obtener el ID de la película desde los parámetros de la ruta
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    loadMovieDetails();
  }, []);

  const loadMovieDetails = async () => {
    try {
      const moviesData = await fetchMovies(); // Obtener todas las películas
      if (moviesData && Object.keys(moviesData).length > 0) {
        const selectedMovie = moviesData[movieId]; // Obtener la película por su ID
        if (selectedMovie) {
          setMovieDetails(selectedMovie); // Establecer los detalles de la película seleccionada
        } else {
          setError('Película no encontrada');
        }
      } else {
        console.error('Error: Empty or undefined data received from API');
      }
    } catch (error) {
      console.error('Error fetching movies: ', error);
      setError('Error al cargar los detalles de la película');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingPress = (rating) => {
    setUserRating(rating);
  };

  const renderRatingBar = (rating, isUserRating) => {
    const maxRating = 5;
    const filledStars = isUserRating ? userRating : Math.round(rating) || 0;
    const emptyStars = maxRating - filledStars;

    const starsArray = [...Array(filledStars)].map((_, index) => (
      <TouchableOpacity key={index} onPress={() => handleRatingPress(index + 1)}>
        <Icon name="star" size={24} color="gold" />
      </TouchableOpacity>
    ));
    const emptyStarsArray = [...Array(emptyStars)].map((_, index) => (
      <TouchableOpacity key={index + filledStars} onPress={() => handleRatingPress(filledStars + index + 1)}>
        <Icon name="star-outline" size={24} color="gold" />
      </TouchableOpacity>
    ));

    return (
      <View style={styles.ratingContainer}>
        {starsArray}
        {emptyStarsArray}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text>No se encontraron detalles de la película</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Image source={{ uri: movieDetails.pictureUrl }} style={styles.movieImage} />
        <Text style={styles.movieName}>{movieDetails.name}</Text>
        <Text style={styles.sectionTitle}>Puntuación Actual:</Text>
        {renderRatingBar(movieDetails.rating, false)}
        <Text style={styles.sectionTitle}>Tu Puntuación:</Text>
        {renderRatingBar(userRating, true)}
        <Text style={styles.movieInfo}>Duración: {movieDetails.duration}</Text>
        <Text style={styles.movieInfo}>Categorías: {movieDetails.categories.join(', ')}</Text>
        <Text style={styles.movieDescription}>{movieDetails.description}</Text>
        <Text style={styles.movieInfo}>Actores: {movieDetails.actors.join(', ')}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  movieImage: {
    width: '100%',
    aspectRatio: 3 / 2,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  movieName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieInfo: {
    fontSize: 18,
    marginBottom: 5,
  },
  movieDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DetallePelicula;
