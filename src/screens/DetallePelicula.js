import React, { useState, useEffect } from 'react';
import {View,Text,Image,ScrollView,ActivityIndicator,TouchableOpacity,TextInput,Modal,Button,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSystemTheme from '../hooks/useSystemTheme'; // Importa el hook de sincronización del tema
import { DetalleStyles } from '../styles/DetalleStyles';
import { isLoggedInSignal } from '../services/AuthStore';

const DetallePelicula = ({ route }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [imageSize, setImageSize] = useState({ width: 200, height: 300 });
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [likedMovies, setLikedMovies] = useState([]);
  const theme = useSystemTheme(); // Obtén el tema del sistema

  // Define los colores según el tema
  const darkBackgroundColor = '#333333';
  const darkButtonColor = '#333333';
  const darkTextColor = 'white'; // Color blanco para texto en tema oscuro
  const lightBackgroundColor = 'white';
  const lightButtonColor = 'white';
  const lightTextColor = 'black';

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`https://api-w6avz2it7a-uc.a.run.app/movies/${movieId}`);
      const movieData = response.data;
      return movieData;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  };

  const loadUserName = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem('userName');
      if (storedUserName !== null) {
        setUserName(storedUserName);
      }
    } catch (error) {
      console.error('Error loading user name:', error);
    }
  };

  const loadLikedMovies = async () => {
    try {
      const likedMovieIds = await AsyncStorage.getItem('likedMovies');
      if (likedMovieIds !== null) {
        setLikedMovies(JSON.parse(likedMovieIds));
      }
    } catch (error) {
      console.error('Error loading liked movies:', error);
    }
  };

  useEffect(() => {
    loadUserName();
    loadMovieDetails();
    loadLikedMovies();
  }, []);

  useEffect(() => {
    // Verificar si la película está marcada como "like" por el usuario
    setLiked(likedMovies.includes(movieId));
  }, [likedMovies]);

  const loadMovieDetails = async () => {
    try {
      const movieData = await fetchMovieDetails(movieId); 
      if (movieData) {
        setMovieDetails(movieData);
        setLikes(movieData.likes || 0);
        
        // Verifica si existen comentarios antes de mapearlo
        const commentsWithRatings = movieData.ratings 
          ? movieData.ratings.map(rating => ({
              id: rating.userId,
              text: rating.comment,
              rating: rating.rating,
              userId: rating.userId, // Agregamos userId al objeto de comentarios
            }))
          : [];
        setComments(commentsWithRatings);
      } else {
        setError('Película no encontrada');
      }
    } catch (error) {
      console.error('Error loading movie details:', error);
      setError('Error al cargar los detalles de la película');
    } finally {
      setLoading(false);
    }
  };

  const handleImagePress = () => {
    const newImageSize = imageSize.width === 200 ? { width: 300, height: 450 } : { width: 200, height: 300 };
    setImageSize(newImageSize);
  };

  const handleAddComment = async () => {
    if (!isLoggedInSignal.isLoggedIn) {
      Alert.alert('Inicia sesión', 'Debes iniciar sesión para agregar comentarios.');
      return;
    }
  
    try {
      if (userName.trim() === '' || userRating === 0 || commentText.trim() === '') {
        console.error('Error: Usuario, puntuación o comentario no válidos');
        return;
      }
  
      const requestData = {
        userId: userName,
        rating: userRating,
        comment: commentText,
      };
  
      const rateMovieEndpoint = `https://api-w6avz2it7a-uc.a.run.app/movies/${movieId}/rate`;
      const response = await axios.put(rateMovieEndpoint, requestData);
  
      if (response.status === 200) {
        console.log('Reseña enviada exitosamente');
        const newComment = { id: comments.length + 1, userId: userName, text: commentText, rating: userRating };
        setComments([...comments, newComment]);
        setCommentText('');
        setShowCommentModal(false);
      } else {
        console.error('Error al enviar la reseña');
      }
    } catch (error) {
      console.error('Error sending rating and comment:', error);
    }
  };

  const handleLikePress = async () => {
    if (!isLoggedInSignal.isLoggedIn) {
      Alert.alert('Inicia sesión', 'Debes iniciar sesión para dar like a las películas.');
      return;
    }
  
    try {
      const likeMovieEndpoint = `https://api-w6avz2it7a-uc.a.run.app/movies/${movieId}/like`;
      const requestData = { userId: userName }; // Puedes ajustar los datos según lo necesites
      const response = await axios.put(likeMovieEndpoint, requestData);
  
      if (response.status === 200) {
        // Actualizar estado de likedMovies y liked
        setLikedMovies(prevLikedMovies => {
          if (liked) {
            // Si ya le había dado like, quitar el like
            return prevLikedMovies.filter(id => id !== movieId);
          } else {
            // Si no le había dado like, agregar el like
            return [...prevLikedMovies, movieId];
          }
        });
        setLiked(prevLiked => !prevLiked); // Cambiar el estado de liked
        setLikes(prevLikes => (liked ? prevLikes - 1 : prevLikes + 1)); // Actualizar contador de likes
        console.log('Like successful');
      } else {
        console.error('Error al dar like a la película');
      }
    } catch (error) {
      console.error('Error liking movie:', error);
    }
  };
  
  const handleRatingPress = (rating) => {
    setUserRating(rating);
    setShowCommentModal(true);
  };

  const renderRatingBar = (rating, isUserRating, handleRatingPress) => {
    const maxRating = 5;
    const filledStars = isUserRating ? rating : Math.round(rating) || 0;
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
      <View style={[styles.flexRow, styles.ratingContainer]}>
        {starsArray}
        {emptyStarsArray}
      </View>
    );
  };

  const renderComments = () => {
    return comments.length > 0 ? (
      comments.map((comment) => (
        <View key={comment.id} style={styles.commentContainer}>
          <Text
            style={[
              styles.commentText,
              { color: theme === 'dark' ? darkTextColor : lightTextColor },
            ]}
          >{`${comment.userId}: ${comment.text}`}</Text>
          <View style={[styles.flexRow, { alignItems: 'center' }]}>
            <Text style={styles.ratingText}>Rating: {comment.rating}</Text>
            {renderRatingBar(comment.rating, false)}
          </View>
        </View>
      ))
    ) : (
      <Text style={styles.commentText}>
        No hay comentarios aún.
      </Text>
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
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        { backgroundColor: theme === 'dark' ? darkBackgroundColor : lightBackgroundColor },
      ]}
    >
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={{ uri: movieDetails.pictureUrl }} style={[styles.movieImage, imageSize]} />
        </TouchableOpacity>
        <Text
          style={[
            styles.textXL,
            styles.fontBold,
            styles.mb5,
            styles.movieName,
            { color: theme === 'dark' ? darkTextColor : lightTextColor },
          ]}
        >
          {movieDetails.name}
        </Text>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme === 'dark' ? darkTextColor : lightTextColor },
          ]}
        >
          Puntuación Actual:
        </Text>
        {renderRatingBar(movieDetails.rating, false)}
        <Text
          style={[
            styles.sectionTitle,
            { color: theme === 'dark' ? darkTextColor : lightTextColor },
          ]}
        >
          Tu Puntuación:
        </Text>
        {renderRatingBar(userRating, true, handleRatingPress)}
        <Text
          style={[
            styles.movieInfo,
            { color: theme === 'dark' ? darkTextColor : lightTextColor },
          ]}
        >
          Duración: {movieDetails.duration}
        </Text>
        <Text
          style={[
            styles.movieInfo,
            { color: theme === 'dark' ? darkTextColor : lightTextColor },
          ]}
        >
          Categorías: {movieDetails.categories.join(', ')}
        </Text>
        <Text
          style={[
            styles.textLG,
            styles.mb5,
            styles.movieDescription,
            { color: theme === 'dark' ? darkTextColor : lightTextColor },
          ]}
        >
          {movieDetails.description}
        </Text>
        <Text
          style={[
            styles.movieInfo,
            { color: theme === 'dark' ? darkTextColor : lightTextColor },
          ]}
        >
          Actores: {movieDetails.actors.join(', ')}
        </Text>
  
        {/* Comentarios */}
        <View style={styles.commentsContainer}>
          <Text
            style={[
              styles.sectionTitle,
              { color: theme === 'dark' ? darkTextColor : lightTextColor },
            ]}
          >
            Comentarios:
          </Text>
          {renderComments()}
          <TextInput
            style={[
              styles.commentInput,
              { color: theme === 'dark' ? darkTextColor : lightTextColor },
            ]}
            placeholderTextColor={theme === 'dark' ? darkTextColor : lightTextColor}
            placeholder="Añadir comentario"
            value={commentText}
            onChangeText={(text) => setCommentText(text)}
          />
        </View>
  
        <Modal visible={showCommentModal} animationType="slide">
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Añadir comentario"
              value={commentText}
              onChangeText={(text) => setCommentText(text)}
            />
            <Button title="Confirmar Reseña" onPress={handleAddComment} />
            <Button title="Cancelar" onPress={() => setShowCommentModal(false)} />
          </View>
        </Modal>
  
        <TouchableOpacity
        onPress={handleLikePress}
        style={[
          styles.likeButton,
          { backgroundColor: theme === 'dark' ? darkButtonColor : lightButtonColor },
          // Agrega el estilo para eliminar el borde
          { borderWidth: 0 },
        ]}
      >
        <Icon name={liked ? 'heart' : 'heart-outline'} size={24} color={liked ? 'red' : 'gray'} />
        <Text
          style={[
            styles.likeText,
            { color: theme === 'dark' ? darkTextColor : lightTextColor },
          ]}
        >
          {likes}
        </Text>
      </TouchableOpacity>

      </View>
    </ScrollView>
  );
  
  
};  

const styles = {
  ...DetalleStyles,
};

export default DetallePelicula;