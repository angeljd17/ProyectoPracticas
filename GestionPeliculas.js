import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('db.db');

const GestionPeliculas = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [movieId, setMovieId] = useState('');
  const [currentMovie, setCurrentMovie] = useState(null);

  const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhNjI1OTZmNTJmNTJlZDQ0MDQ5Mzk2YmU3ZGYzNGQyYzY0ZjQ1M2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWx0ZW4taHlicmlkLWFwaSIsImF1ZCI6ImFsdGVuLWh5YnJpZC1hcGkiLCJhdXRoX3RpbWUiOjE3MTIxNTk3MTUsInVzZXJfaWQiOiI5T2tLNW1SQnJ6WnRWNXphc1lNMzNVVFpRamYyIiwic3ViIjoiOU9rSzVtUkJyelp0VjV6YXNZTTMzVVRaUWpmMiIsImlhdCI6MTcxMjE1OTcxNSwiZXhwIjoxNzEyMTYzMzE1LCJlbWFpbCI6InhpYm92OTAwNzlAZXZpbXpvLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInhpYm92OTAwNzlAZXZpbXpvLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Cmw275MelRcDrT8CxUuaU6ZfsbdSGJwzUMjXQbCyxOGt76EljQ6cMqDv8RX3wZyQHWAZjOajkQRAHvRUXkWrErzDDZGlN9g-pSfAOCCh3rUp05s2BjHlUvyHeXupqtBzlZPoP0mUp7rYq-SEbeqNQ4OfWLBt1tIdWx17urZOrDc8YY-76bzqExPDtaArhpC0mLkejdcI6mYYNSZERMM0vGlFff6Hj78jwHwWLeTFBPIVaRtADrhur0TbhvvAxVz3o9VkTlI1kz1nBDQ7KVSTNxgliB8DwZOWuGhcCI03VssQJIHDxw-PeBJuD6cFDPSE4azz1K6rNumKy2nlD8O0IQ';

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`https://api-w6avz2it7a-uc.a.run.app/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie: ', error);
    }
  };

  const initializeDatabase = () => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists movies (id integer primary key not null, name text, rating real);'
      );
    });
  };

  const clearDatabase = () => {
    db.transaction(tx => {
      tx.executeSql(
        'delete from movies;',
        [],
        () => console.log('Database cleared successfully'),
        (_, error) => console.log('Error clearing database: ', error)
      );
    });
  };

  const fetchSavedMovies = () => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from movies;',
        [],
        (_, { rows: { _array } }) => setSavedMovies(_array),
        (_, error) => console.log('Error fetching saved movies: ', error)
      );
    });
  };

  useEffect(() => {
    clearDatabase();
    initializeDatabase();
    fetchSavedMovies();
  }, []);

  const saveCurrentMovie = () => {
    if (currentMovie) {
      db.transaction(tx => {
        tx.executeSql(
          'insert into movies (name, rating) values (?, ?)',
          [currentMovie.name, currentMovie.rating],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              Alert.alert('Éxito', 'La película se guardó correctamente');
              fetchSavedMovies();
            } else {
              Alert.alert('Error', 'No se pudo guardar la película');
            }
          },
          (_, error) => console.log('Error saving movie: ', error)
        );
      });
    } else {
      console.log('No movie to save');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Página de Gestion de Películas</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={setMovieId}
        value={movieId}
        placeholder="Enter movie ID"
      />
      <Button title="Mostrar Película" onPress={fetchMovies} />
      {currentMovie && <Text>{`Nombre: ${currentMovie.name}, Puntuación: ${currentMovie.rating}`}</Text>}
      <Button title="Guardar Película" onPress={saveCurrentMovie} />
      <FlatList
        data={savedMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{`Nombre: ${item.name}, Puntuación: ${item.rating}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default GestionPeliculas;
