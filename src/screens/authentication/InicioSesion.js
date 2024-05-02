import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import { app } from '../../services/firebase'; // Importa la instancia de Firebase desde tu archivo firebase.js
import { Ionicons } from '@expo/vector-icons';

const InicioSesion = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña

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

  const handleLogin = async () => {
    try {
      if (!validateEmail(email) || !validatePassword(password)) {
        return;
      }

      const auth = app.auth(); // Obtiene la instancia de autenticación de Firebase
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      console.log('Usuario autenticado:', userCredential.user);
      
      // Guarda el email y el nombre del usuario al iniciar sesión
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userName', userCredential.user.displayName || '');

      navigation.navigate('PantallaDespuesLogin');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ marginBottom: 20, fontSize: 24, fontWeight: 'bold' }}>Inicio de Sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        style={{ borderWidth: 1, borderColor: 'gray', width: 300, marginBottom: 10, padding: 10, borderRadius: 5 }}
        onBlur={() => validateEmail(email)}
      />
      {emailError ? <Text style={{ color: 'red', marginBottom: 10 }}>{emailError}</Text> : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: 300, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}>
        <TextInput
          placeholder="Contraseña"
          value={password}
          autoCapitalize="none"
          onChangeText={text => setPassword(text)}
          secureTextEntry={!showPassword}
          style={{ flex: 1, padding: 10 }}
          onBlur={() => validatePassword(password)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingHorizontal: 10 }}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={{ color: 'red', marginBottom: 10 }}>{passwordError}</Text> : null}
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: 'blue', paddingVertical: 12, paddingHorizontal: 50, borderRadius: 8, marginTop: 20 }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword} style={{ marginTop: 20 }}>
        <Text style={{ color: 'blue', fontSize: 16 }}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InicioSesion;
