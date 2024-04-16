import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { app } from '../services/firebase'; // Importa la instancia de Firebase desde tu archivo firebase.js
import { Ionicons } from '@expo/vector-icons'; // Importa el ícono Ionicons

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
      // Aquí podrías redirigir al usuario a otra pantalla si la autenticación es exitosa
      navigation.navigate('PantallaDespuesLogin');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 10 }}>Inicio de Sesión</Text>
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
      {emailError ? <Text style={{ color: 'red', marginBottom: 10 }}>{emailError}</Text> : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: 200, borderWidth: 1, borderColor: 'gray', padding: 5 }}>
        <TextInput
          placeholder="Contraseña"
          value={password}
          autoCapitalize="none"
          onChangeText={text => setPassword(text)}
          secureTextEntry={!showPassword} // Utiliza el estado showPassword para determinar si mostrar u ocultar la contraseña
          style={{ flex: 1 }}
          onBlur={() => validatePassword(password)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="black" style={{ paddingHorizontal: 10 }} />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={{ color: 'red', marginBottom: 10 }}>{passwordError}</Text> : null}
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

export default InicioSesion;
