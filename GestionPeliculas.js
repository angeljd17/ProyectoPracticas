import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('db.db');

const GestionPeliculas = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState('');

  const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhNjI1OTZmNTJmNTJlZDQ0MDQ5Mzk2YmU3ZGYzNGQyYzY0ZjQ1M2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWx0ZW4taHlicmlkLWFwaSIsImF1ZCI6ImFsdGVuLWh5YnJpZC1hcGkiLCJhdXRoX3RpbWUiOjE3MTIxNTMzMzIsInVzZXJfaWQiOiI5T2tLNW1SQnJ6WnRWNXphc1lNMzNVVFpRamYyIiwic3ViIjoiOU9rSzVtUkJyelp0VjV6YXNZTTMzVVRaUWpmMiIsImlhdCI6MTcxMjE1MzMzMiwiZXhwIjoxNzEyMTU2OTMyLCJlbWFpbCI6InhpYm92OTAwNzlAZXZpbXpvLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInhpYm92OTAwNzlAZXZpbXpvLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Eaj52a4QFBG2x6JxyTIdmbhGz30a5tq05iXvo_Ad6PqMq2-Ozmwjl6GZT1ERxjzaz3ly4G80rSwtgk-dwzvTh-elF8PwKAx_O65Uw2K4k_mOix9ppIH0r6Ivs69po00pRFPOAwA0EUoYVTrzr5Vzb5oFrde2IcO0EuYGCwcaWG4JeVNAdd9ngzQQOr2Axy3xrv0BEUWb8wHeZEdkJcckVUuT2JeDeBDRI38Cs5z95NWLFR_ulgQIWoCwmXkw85vsX84FgY1-kPNehTY9ExdeVwIYMC5p9R3g8-vs4yV6S3u5JY6GPYHeJ06oTNJuWgnq0m6WzQeRS2J8y3VFT0MXEg';

  const fetchMovies = async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api-w6avz2it7a-uc.a.run.app/movies/${movieId}`,
      headers: { 
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.request(config);
      const movie = response.data;

      db.transaction(tx => {
        tx.executeSql(
          'create table if not exists movies (id integer primary key not null, title text, rating integer);'
        );
        tx.executeSql('insert into movies (title, rating) values (?, ?)', [movie.name, movie.rating]);
      });

      setMovies([movie]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Página de Perfil de Gestion de Peliculas</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setMovieId(text)}
        value={movieId}
        placeholder="Enter movie ID"
      />
      <Button title="Mostrar Película" onPress={fetchMovies} />
      {movies[0] && <Text>{`Nombre: ${movies[0].name}, Puntuación: ${movies[0].rating}`}</Text>}
    </View>
  );
};

export default GestionPeliculas;