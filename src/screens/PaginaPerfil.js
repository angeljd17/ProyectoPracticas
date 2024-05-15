import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, TextInput } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firestore, storage } from '../services/firebase'; // Importa storage desde firebase

const PaginaPerfil = () => {
  const [displayName, setDisplayName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [profileImage, setProfileImage] = useState(null);
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
    };

    Alert.alert(
      'Seleccionar Imagen',
      'Elige una opción',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Tomar Foto',
          onPress: () => launchCamera(options, handleImageResponse),
        },
        {
          text: 'Elegir de la Galería',
          onPress: () => launchImageLibrary(options, handleImageResponse),
        },
      ],
      { cancelable: true }
    );
  };

  const handleImageResponse = (response) => {
    if (response.didCancel) {
      console.log('Usuario canceló la selección de imagen');
    } else if (response.error) {
      console.error('Error al seleccionar imagen:', response.error);
    } else {
      if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
      } else {
        console.error('La respuesta de la selección de imagen no contiene una uri válida');
      }
    }
  };

  const guardarPerfilUsuario = async () => {
    try {
      // Subir la imagen al almacenamiento de Firebase
      const response = await fetch(profileImage.uri);
      const blob = await response.blob();
      const imageRef = storage.ref().child(`${displayName}-${surname}`);
      await imageRef.put(blob);
  
      // Obtener la URL de la imagen
      const imageUrl = await imageRef.getDownloadURL();
  
      // Convertir la información del usuario en JSON
      const userInfo = JSON.stringify({
        displayName,
        surname,
        phoneNumber,
        gender,
        dateOfBirth: dateOfBirth.toISOString(),
        profileImage: imageUrl, // Agregar la URL de la imagen al JSON
      });
  
      // Guardar el JSON en el almacenamiento de Firebase
      const fileName = `${displayName}-${surname}.json`;
      const jsonRef = storage.ref().child(fileName);
  
      // Subir el JSON como un archivo al almacenamiento
      await jsonRef.putString(userInfo);
  
      Alert.alert('Éxito', 'Información guardada correctamente en Firebase Storage.');
    } catch (error) {
      console.error('Error al guardar información:', error);
      Alert.alert(
        'Error',
        `Ocurrió un error al guardar la información: ${error.message}`
      );
    }
  };

  const saveProfile = () => {
    guardarPerfilUsuario();
  };

  const handleGenderPress = () => {
    setShowGenderOptions(true);
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setShowGenderOptions(false);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage} style={styles.profileImageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImage}>
            <Text style={styles.profileInitials}>
              {displayName.charAt(0).toUpperCase()}
              {surname.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGenderPress} style={styles.input}>
        <Text>{gender ? gender : 'Género'}</Text>
      </TouchableOpacity>

      {showGenderOptions && (
        <View style={styles.genderOptions}>
          <TouchableOpacity onPress={() => handleGenderSelect('Hombre')}>
            <Text style={styles.genderOption}>Hombre</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelect('Mujer')}>
            <Text style={styles.genderOption}>Mujer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelect('Otro')}>
            <Text style={styles.genderOption}>Otro</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre"
          value={displayName}
          onChangeText={setDisplayName}
          style={styles.input}
        />
        <TextInput
          placeholder="Apellido"
          value={surname}
          onChangeText={setSurname}
          style={styles.input}
        />
        <TextInput
          placeholder="Teléfono"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text>{dateOfBirth.toISOString().split('T')[0]}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>

      <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
        <Text style={styles.buttonText}>Guardar Información</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileImageContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 36,
    color: '#fff',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  genderOptions: {
    position: 'absolute',
    top: 100,
    left: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    zIndex: 1000,
  },
  genderOption: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default PaginaPerfil;
