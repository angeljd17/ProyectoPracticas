import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { app } from '../../services/firebase'; // Importa la instancia de Firebase desde tu archivo firebase.js
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons desde '@expo/vector-icons'

const RegistroUsuario = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
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
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
        style={styles.input}
        onBlur={() => validateEmail(email)}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        placeholder="Nombre (opcional)"
        value={nombre}
        onChangeText={text => setNombre(text)}
        style={styles.input}
      />
      <View style={styles.passwordInput}>
        <TextInput
          placeholder="Contraseña"
          value={password}
          autoCapitalize="none"
          onChangeText={text => setPassword(text)}
          secureTextEntry={!showPassword}
          style={{ flex: 1, padding: 10 }}
          onBlur={() => validatePassword(password)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.toggleButton}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  toggleButton: {
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegistroUsuario;
