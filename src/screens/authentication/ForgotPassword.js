import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { app } from '../../services/firebase'; // Importa la instancia de Firebase desde tu archivo firebase.js

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer Contraseña</Text>
      {!emailSent ? (
        <>
          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Enviar Correo de Restablecimiento</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emailSentText}>
          Se ha enviado un correo de restablecimiento a {email}. Revisa tu bandeja de entrada.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  emailSentText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});

export default ForgotPassword;
