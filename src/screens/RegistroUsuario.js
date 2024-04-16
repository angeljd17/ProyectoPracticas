import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { app } from '../services/firebase'; // Importa la instancia de Firebase desde tu archivo firebase.js

const RegistroUsuario = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    setEmailError('');
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setEmailError('Correo electrónico inválido');
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    setPasswordError('');
    if (password.trim() === '') {
      setPasswordError('La contraseña no puede estar vacía');
      return false;
    }
    return true;
  };

  const handleRegistro = async () => {
    try {
      if (!validateEmail(email) || !validatePassword(password)) {
        return;
      }
  
      const auth = app.auth(); // Obtiene la instancia de autenticación de Firebase
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('Usuario registrado:', userCredential.user);
  
      // Establecer el nombre si se proporcionó
      if (nombre.trim() !== '') {
        await userCredential.user.updateProfile({
          displayName: nombre,
        });
      }
  
      // Envía el correo de verificación
      await userCredential.user.sendEmailVerification({
        url: 'https://proyectopracticas-da612.firebaseapp.com/__/auth/action?mode=action',
      });
  
      // Redirige a la pantalla de verificación de correo electrónico
      navigation.navigate('VerificacionEmail');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      Alert.alert('Error', 'Ocurrió un error al registrar usuario. Por favor, intenta nuevamente más tarde.');
    }
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Registro de Usuario</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        style={{ borderWidth: 1, borderColor: 'gray', width: 200, marginBottom: 10, padding: 5 }}
        onBlur={() => validateEmail(email)}
      />
      {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
      <TextInput
        placeholder="Nombre (opcional)"
        value={nombre}
        onChangeText={text => setNombre(text)}
        style={{ borderWidth: 1, borderColor: 'gray', width: 200, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        style={{ borderWidth: 1, borderColor: 'gray', width: 200, marginBottom: 10, padding: 5 }}
        onBlur={() => validatePassword(password)}
      />
      {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
      <Button title="Registrar" onPress={handleRegistro} />
    </View>
  );
};

export default RegistroUsuario;
