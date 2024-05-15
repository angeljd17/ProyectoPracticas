import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../../services/firebase';
import { Ionicons } from '@expo/vector-icons';
import { isLoggedInSignal } from '../../services/AuthStore';

const InicioSesion = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
  
      const auth = app.auth();
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      console.log('Usuario autenticado:', userCredential.user);
  
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userName', userCredential.user.displayName || '');
  
      // Cambiar el estado de inicio de sesión utilizando la señal isLoggedInSignal
      isLoggedInSignal.isLoggedIn = true;
  
      navigation.navigate('PantallaDespuesLogin');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };
  

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const isDarkMode = colorScheme === 'dark';
  const containerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: isDarkMode ? '#333333' : 'white',
  };
  const textInputStyle = {
    borderWidth: 1,
    borderColor: isDarkMode ? 'white' : 'black',
    width: 300,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    color: isDarkMode ? 'white' : 'black',
  };
  const errorTextStyle = {
    color: isDarkMode ? 'red' : 'red',
    marginBottom: 10,
  };
  const buttonStyle = {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 20,
  };
  const buttonTextStyle = {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  };
  const forgotPasswordTextStyle = {
    color: 'blue',
    fontSize: 16,
  };

  return (
    <View style={containerStyle}>
      <Text style={{ marginBottom: 20, fontSize: 24, fontWeight: 'bold', color: isDarkMode ? 'white' : 'black' }}>Inicio de Sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        style={textInputStyle}
        onBlur={() => validateEmail(email)}
      />
      {emailError ? <Text style={errorTextStyle}>{emailError}</Text> : null}
      <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }, textInputStyle]}>
        <TextInput
          placeholder="Contraseña"
          value={password}
          autoCapitalize="none"
          onChangeText={text => setPassword(text)}
          secureTextEntry={!showPassword}
          style={{ flex: 1, padding: 0, color: isDarkMode ? 'white' : 'black' }}
          onBlur={() => validatePassword(password)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingHorizontal: 10 }}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={errorTextStyle}>{passwordError}</Text> : null}
      <TouchableOpacity onPress={handleLogin} style={[buttonStyle, { backgroundColor: isDarkMode ? 'darkblue' : 'blue' }]}>
        <Text style={buttonTextStyle}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword} style={{ marginTop: 20 }}>
        <Text style={forgotPasswordTextStyle}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InicioSesion;
