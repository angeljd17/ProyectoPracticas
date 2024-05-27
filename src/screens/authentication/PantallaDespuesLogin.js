import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLoggedInSignal } from '../../services/AuthStore';

const PantallaDespuesLogin = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
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
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userName');
      await auth.signOut();
      isLoggedInSignal.isLoggedIn = false;
      navigation.navigate('InicioSesion');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleGoToPerfil = () => {
    navigation.navigate('Perfil', { screen: 'PerfilTopTabs' });
  };

  const isDarkMode = colorScheme === 'dark';
  const containerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#333333' : 'white',
  };
  const titleStyle = {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: isDarkMode ? 'white' : 'black',
  };
  const textStyle = {
    fontSize: 18,
    marginBottom: 10,
    color: isDarkMode ? 'white' : 'black',
  };
  const buttonStyle = {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 20,
  };
  const buttonTextStyle = {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  };

  return (
    <View style={containerStyle}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={titleStyle}>Bienvenido</Text>
          <Text style={textStyle}>Email: {user?.email}</Text>
          {user?.displayName && <Text style={textStyle}>Nombre: {user.displayName}</Text>}
          <TouchableOpacity onPress={handleLogout} style={[buttonStyle, { backgroundColor: isDarkMode ? 'darkred' : 'red' }]}>
            <Text style={buttonTextStyle}>Cerrar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoToPerfil} style={[buttonStyle, { backgroundColor: isDarkMode ? 'darkblue' : 'blue', marginTop: 10 }]}>
            <Text style={buttonTextStyle}>Ir a Perfil</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PantallaDespuesLogin;
