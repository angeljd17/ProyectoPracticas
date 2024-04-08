import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const DetallePelicula = ({ route }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [userRating, setUserRating] = useState(0); // Estado para la calificación del usuario
  const token = 'Tu token aquí';

  useEffect(() => {
    loadMovieDetails();
  }, []);

  const loadMovieDetails = async () => {
    try {
      const response = await axios.get(`https://api-w6avz2it7a-uc.a.run.app/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovieDetails(response.data);
    } catch (error) {
      console.error('Error fetching movie details: ', error);
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

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles de la película...</Text>
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default DetallePelicula;
