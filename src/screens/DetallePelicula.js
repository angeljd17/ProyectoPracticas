import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchMovies } from '../services/LlamadaApi';
import Icon from 'react-native-vector-icons/Ionicons';

// Definir la función handleRatingPress fuera del componente
const handleRatingPress = (rating, setUserRating) => {
  setUserRating(rating);
};

const DetallePelicula = ({ route }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [imageSize, setImageSize] = useState({ width: 200, height: 300 });
  const navigation = useNavigation();

  useEffect(() => {
    loadMovieDetails();
  }, []);

  const loadMovieDetails = async () => {
    try {
      const moviesData = await fetchMovies();
      if (moviesData && Object.keys(moviesData).length > 0) {
        const selectedMovie = moviesData[movieId];
        if (selectedMovie) {
          setMovieDetails(selectedMovie);
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

  const handleImagePress = () => {
    const newImageSize = imageSize.width === 200 ? { width: 300, height: 450 } : { width: 200, height: 300 };
    setImageSize(newImageSize);
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={{ uri: movieDetails.pictureUrl }} style={[styles.movieImage, imageSize]} />
        </TouchableOpacity>
        <Text style={[styles.textXL, styles.fontBold, styles.mb5, styles.movieName]}>{movieDetails.name}</Text>
        <Text style={styles.sectionTitle}>Puntuación Actual:</Text>
        {renderRatingBar(movieDetails.rating, false)}
        <Text style={styles.sectionTitle}>Tu Puntuación:</Text>
        {renderRatingBar(userRating, true, setUserRating)}
        <Text style={styles.movieInfo}>Duración: {movieDetails.duration}</Text>
        <Text style={styles.movieInfo}>Categorías: {movieDetails.categories.join(', ')}</Text>
        <Text style={[styles.textLG, styles.mb5, styles.movieDescription]}>{movieDetails.description}</Text>
        <Text style={styles.movieInfo}>Actores: {movieDetails.actors.join(', ')}</Text>
      </View>
    </ScrollView>
  );
};

const renderRatingBar = (rating, isUserRating, setUserRating) => {
  const maxRating = 5;
  const filledStars = isUserRating ? rating : Math.round(rating) || 0;
  const emptyStars = maxRating - filledStars;

  const starsArray = [...Array(filledStars)].map((_, index) => (
    <TouchableOpacity key={index} onPress={() => handleRatingPress(index + 1, setUserRating)}>
      <Icon name="star" size={24} color="gold" />
    </TouchableOpacity>
  ));
  const emptyStarsArray = [...Array(emptyStars)].map((_, index) => (
    <TouchableOpacity key={index + filledStars} onPress={() => handleRatingPress(filledStars + index + 1, setUserRating)}>
      <Icon name="star-outline" size={24} color="gold" />
    </TouchableOpacity>
  ));

  return (
    <View style={[styles.flexRow, styles.ratingContainer]}>
      {starsArray}
      {emptyStarsArray}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  movieImage: {
    aspectRatio: 3 / 2,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  textXL: {
    fontSize: 24,
  },
  textLG: {
    fontSize: 20,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  mb5: {
    marginBottom: 5,
  },
  movieName: {
    fontSize: 24,
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
  flexRow: {
    flexDirection: 'row',
  },
  ratingContainer: {
    marginBottom: 10,
  },
});

export default DetallePelicula;
