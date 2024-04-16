import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VerificacionEmail = () => {
  const navigation = useNavigation();

  const handleInicioSesion = () => {
    navigation.navigate('InicioSesion');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Verificación de Correo Electrónico
      </Text>
      <Text style={styles.message}>
        Se ha enviado un enlace de verificación a tu correo electrónico.
        Por favor, verifica tu cuenta accediendo al enlace en el correo.
      </Text>
      <Button
        title="Ir a Iniciar Sesión"
        onPress={handleInicioSesion}
        color="#007AFF" // Cambia el color del botón según tu estilo
      />
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
});

export default VerificacionEmail;
