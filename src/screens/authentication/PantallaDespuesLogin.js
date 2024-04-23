import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../services/firebase'; // Importa la instancia de Firebase

const PantallaDespuesLogin = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setLoading(false);
      } else {
        navigation.navigate('InicioSesion');
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('InicioSesion');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          {user.displayName && <Text style={styles.text}>Nombre: {user.displayName}</Text>}
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
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
  button: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PantallaDespuesLogin;
