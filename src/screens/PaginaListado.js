import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text, ActivityIndicator, useColorScheme, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from '../services/axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { listadoStyles } from '../styles/ListadoStyles';
import { isLoggedInSignal } from '../services/AuthStore';

const PaginaListado = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const pageSize = 6;
  const [userName, setUserName] = useState('');
  const [likedMovies, setLikedMovies] = useState([]);
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  const fetchMovies = async (page) => {
    try {
      const response = await axios.get(`https://api-w6avz2it7a-uc.a.run.app/movies?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies: ', error);
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
    loadMovies();
    loadLikedMovies(); // Cargar los "likes" del usuario
  }, []);

  useEffect(() => {
    setVisibleMovies(allMovies.slice(0, page * pageSize));
  }, [allMovies, page]);

  const loadMovies = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const moviesData = await fetchMovies(page);
      if (moviesData && Object.keys(moviesData).length > 0) {
        const updatedMovies = Object.values(moviesData).map(movie => ({
          ...movie,
          liked: likedMovies.includes(movie.id), // Verificar si la película está marcada como "like"
        }));
        setAllMovies((prevData) => [...prevData, ...updatedMovies]);
      } else {
        console.error('Error: Empty or undefined data received from API');
      }
    } catch (error) {
      console.error('Error fetching movies: ', error);
    }
    setLoading(false);
  };

  const handleMovieDetails = (movieId) => {
    navigation.navigate('Detalles', { movieId });
  };
  
  const handleLikePress = async (movieId) => {
    const isLoggedIn = isLoggedInSignal.isLoggedIn; // Obtiene el valor actual de la señal
  
    try {
      if (!isLoggedIn) {
        Alert.alert('Inicia sesión', 'Debes iniciar sesión para dar like a las películas.');
        return;
      }
  
      const likeMovieEndpoint = `https://api-w6avz2it7a-uc.a.run.app/movies/${movieId}/like`;
  
      // Verificar si la película ya tiene "like" del usuario
      const alreadyLiked = likedMovies.includes(movieId);
  
      // Enviar la solicitud para dar/quitar like según corresponda
      const requestData = { userId: userName, alreadyLiked };
      const response = await axios.put(likeMovieEndpoint, requestData);
  
      if (response.status === 200) {
        if (alreadyLiked) {
          // Si ya le había dado like, quitar el like
          const updatedLikedMovies = likedMovies.filter((id) => id !== movieId);
          await AsyncStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
          setLikedMovies(updatedLikedMovies);
  
          setAllMovies((prevMovies) =>
            prevMovies.map((movie) =>
              movie.id === movieId
                ? {
                    ...movie,
                    liked: false,
                    likes: movie.likes - 1,
                  }
                : movie
            )
          );
          console.log('Like removed');
        } else {
          // Si no le había dado like, agregar el like
          await AsyncStorage.setItem('likedMovies', JSON.stringify([...likedMovies, movieId]));
          setLikedMovies((prevLiked) => [...prevLiked, movieId]);
  
          setAllMovies((prevMovies) =>
            prevMovies.map((movie) =>
              movie.id === movieId
                ? {
                    ...movie,
                    liked: true,
                    likes: movie.likes + 1,
                  }
                : movie
            )
          );
          console.log('Like added');
        }
      } else {
        console.error('Error al dar/quitar like a la película');
      }
    } catch (error) {
      console.error('Error liking/unliking movie:', error);
    }
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={[
      colorScheme === 'dark' ? listadoStyles.movieContainerDark : listadoStyles.movieContainerLight,
    ]}
    >
      <TouchableOpacity onPress={() => handleMovieDetails(item.id)}>
        <Image
          source={{ uri: item.pictureUrl }}
          style={{ width: 100, height: 150, marginRight: 10, borderRadius: 8 }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.movieTitle,
            colorScheme === 'dark' ? styles.movieTitleDark : null,
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.movieInfo,
            colorScheme === 'dark' ? styles.movieInfoDark : null,
          ]}
        >
          Puntuación: {item.rating} | Duración: {item.duration}
        </Text>
        <Text
          style={[
            styles.movieDescription,
            colorScheme === 'dark' ? styles.movieDescriptionDark : null,
          ]}
        >
          {item.description}
        </Text>
        <TouchableOpacity onPress={() => handleLikePress(item.id)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name={likedMovies.includes(item.id) ? 'heart' : 'heart-outline'}
            size={20}
            color={likedMovies.includes(item.id) ? 'red' : 'gray'}
            style={{ marginRight: 5 }}
          />
          <Text
            style={[
              styles.likeCount,
              colorScheme === 'dark' ? styles.likeCountDark : null,
            ]}
          >
            {item.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: 'blue', borderRadius: 5, padding: 8, marginTop: 10 }}
          onPress={() => handleMovieDetails(item.id)}
        >
          <Text style={{ color: 'white' }}>Ver Detalles</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    if (loading || allMovies.length === 0) return;
    setPage((prevPage) => prevPage + 1);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setAllMovies([]);
    setPage(1);
    loadMovies();
    setRefreshing(false);
  }, []);

  const styles = {
    ...listadoStyles, // Importa los estilos del archivo separado
  };

  return (
    <View style={{ flex: 1, padding: 4, backgroundColor: colorScheme === 'dark' ? '#121212' : '#f0f0f0' }}>
      <FlatList
        data={visibleMovies}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator size="small" color="blue" />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['blue']}
            tintColor={'blue'}
          />
        }
      />
    </View>
  );
};

export default PaginaListado;
