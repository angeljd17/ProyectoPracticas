import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from '../services/axios';

const PaginaListado = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const pageSize = 6;

  const fetchMovies = async (page) => {
    try {
      const response = await axios.get(`https://api-w6avz2it7a-uc.a.run.app/movies?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies: ', error);
      throw error;
    }
  };

  useEffect(() => {
    loadMovies();
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
    navigation.navigate('Detalles', { movieId });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity className="flex-row mb-8 border-b-2 pb-4 border-gray-300 items-start relative bg-white rounded-lg p-4">
      <View className="flex-shrink-0">
        <TouchableOpacity onPress={() => handleMovieDetails(item.id)}>
          <Image
            source={{ uri: item.pictureUrl }}
            style={{ width: 100, height: 150, marginRight: 10, borderRadius: 8 }}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 flex-col justify-center">
        <View className="flex-1">
          <Text className="text-lg font-bold mb-1">{item.name}</Text>
          <Text className="text-sm mb-1">
            Puntuación: {item.rating} | Duración: {item.duration}
          </Text>
          <Text className="text-sm mb-3">{item.description}</Text>
        </View>
        <TouchableOpacity
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md self-start"
          onPress={() => handleMovieDetails(item.id)}
        >
          <Text className="text-white">Ver Detalles</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    if (loading || allMovies.length === 0) return;
    setPage(prevPage => prevPage + 1);
  };

  return (
    <View className="flex-1 p-4 bg-blue-100">
      <FlatList
        data={visibleMovies}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator size="small" color="blue" />}
      />
    </View>
  );
};

export default PaginaListado;
