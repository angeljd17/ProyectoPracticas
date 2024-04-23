import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VerificacionEmail = () => {
  const navigation = useNavigation();

  const handleInicioSesion = () => {
    navigation.navigate('InicioSesion');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificación de Correo Electrónico</Text>
      <Text style={styles.message}>
        Se ha enviado un enlace de verificación a tu correo electrónico.
        Por favor, verifica tu cuenta accediendo al enlace en el correo.
      </Text>
      <TouchableOpacity onPress={handleInicioSesion} style={styles.button}>
        <Text style={styles.buttonText}>Ir a Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificacionEmail;
