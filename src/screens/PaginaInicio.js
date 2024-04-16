import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaginaInicio = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('InicioSesion')} // Navega a la pantalla InicioSesion
        style={{ marginBottom: 20, padding: 10, backgroundColor: 'blue', borderRadius: 5 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('RegistroUsuario')} // Navega a la pantalla RegistroUsuario
        style={{ padding: 10, backgroundColor: 'green', borderRadius: 5 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaginaInicio;
