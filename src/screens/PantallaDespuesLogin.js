import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../services/firebase'; // Importa la instancia de Firebase

const PantallaDespuesLogin = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
        setLoading(false); // Set loading to false once user data is available
      } else {
        // No user is signed in.
        navigation.navigate('InicioSesion');
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          {user.displayName && <Text style={styles.text}>Nombre: {user.displayName}</Text>}
          <Button title="Cerrar sesión" onPress={() => auth.signOut()} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PantallaDespuesLogin;
