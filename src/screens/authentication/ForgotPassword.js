import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, useColorScheme } from 'react-native';
import { app } from '../../services/firebase'; // Importa la instancia de Firebase desde tu archivo firebase.js

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const colorScheme = useColorScheme();

  const handleResetPassword = async () => {
    try {
      await app.auth().sendPasswordResetEmail(email, {
        url: 'https://proyectopracticas-da612.firebaseapp.com/__/auth/action?mode=action',
        handleCodeInApp: true, // Habilita el restablecimiento de contraseña desde la app
      });
      setEmailSent(true);
    } catch (error) {
      console.error('Error al enviar correo de restablecimiento:', error);
      Alert.alert(
        'Error',
        'Ocurrió un error al enviar el correo de restablecimiento. Por favor, intenta nuevamente más tarde.'
      );
    }
  };

  const isDarkMode = colorScheme === 'dark';
  const containerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: isDarkMode ? '#333333' : 'white',
  };
  const titleStyle = {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: isDarkMode ? 'white' : 'black',
  };
  const inputStyle = {
    borderWidth: 1,
    borderColor: isDarkMode ? 'white' : 'gray',
    width: '100%',
    marginBottom: 20,
    padding: 10,
    color: isDarkMode ? 'white' : 'black',
    backgroundColor: isDarkMode ? '#333333' : 'transparent',
  };
  const buttonStyle = {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  };
  const buttonTextStyle = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  };
  const emailSentTextStyle = {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: isDarkMode ? 'white' : 'black',
  };

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>Restablecer Contraseña</Text>
      {!emailSent ? (
        <>
          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            style={inputStyle}
          />
          <TouchableOpacity style={[buttonStyle, { backgroundColor: isDarkMode ? 'darkblue' : 'blue' }]} onPress={handleResetPassword}>
            <Text style={buttonTextStyle}>Enviar Correo de Restablecimiento</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={emailSentTextStyle}>
          Se ha enviado un correo de restablecimiento a {email}. Revisa tu bandeja de entrada.
        </Text>
      )}
    </View>
  );
};

export default ForgotPassword;
