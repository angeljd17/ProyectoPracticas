import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, RefreshControl, ScrollView, Modal, TextInput } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import NewFolderIcon from '../images/new-folder-svgrepo-com.svg';
import NewFileIcon from '../images/new-file-svgrepo-com.svg';
import SVGFileIcon from '../images/svg-svgrepo-com.svg';
import PDFFileIcon from '../images/pdf-svgrepo-com.svg';
import MP3FileIcon from '../images/mp3icon.svg';
import TXTFileIcon from '../images/txticon.svg';
import MP4FileIcon from '../images/mp4icon.svg';
import FolderIcon from '../images/foldericon.svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const GestorDocumental = () => {
  const [files, setFiles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const storageRef = storage().ref('gs://proyectopracticas-da612.appspot.com');
  const [currentPath, setCurrentPath] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, [currentPath]);

  const fetchFiles = async () => {
    try {
      const directoryRef = currentPath.reduce((ref, folder) => ref.child(folder), storageRef);
      const fileList = await listFilesAndDirectories(directoryRef);
      setFiles(fileList);
    } catch (error) {
      console.error('Error al obtener los archivos:', error);
      Alert.alert('Error', `Ocurrió un error al obtener los archivos: ${error.message}`);
    } finally {
      setRefreshing(false);
    }
  };

  const navigateBack = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const navigateToFolder = (folderName) => {
    setCurrentPath((prevPath) => [...prevPath, folderName]);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFiles();
  };

  const listFilesAndDirectories = async (reference, pageToken) => {
    const fileList = [];
    const result = await reference.list({ pageToken });

    for (const prefix of result.prefixes) {
      fileList.push({ name: prefix.name, uri: prefix.fullPath, isDirectory: true });
    }

    for (const item of result.items) {
      const url = await item.getDownloadURL();
      fileList.push({ name: item.name, uri: url, isDirectory: false });
    }

    if (result.nextPageToken) {
      const nextPageFiles = await listFilesAndDirectories(reference, result.nextPageToken);
      fileList.push(...nextPageFiles);
    }

    return fileList;
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      uploadFile(res[0].uri, res[0].name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Error selecting file:', err);
        Alert.alert('Error', 'Ocurrió un error al seleccionar el archivo');
      }
    }
  };

  const uploadFile = async (uri, name) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileRef = storageRef.child([...currentPath, name].join('/'));
      await fileRef.put(blob);
      fetchFiles();
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      Alert.alert('Error', 'Ocurrió un error al subir el archivo');
    }
  };

  const downloadFile = async (file) => {
    try {
      const permissionResult = await MediaLibrary.requestPermissionsAsync();
      if (permissionResult.status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos permisos de almacenamiento para descargar el archivo');
        return;
      }

      const { name } = file;
      const url = await storageRef.child([...currentPath, name].join('/')).getDownloadURL();

      const downloadDirectory = `${FileSystem.documentDirectory}Download/`;
      const dirInfo = await FileSystem.getInfoAsync(downloadDirectory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(downloadDirectory, { intermediates: true });
      }

      const localUri = `${downloadDirectory}${name}`;
      const { uri } = await FileSystem.downloadAsync(url, localUri);

      // Ensure the file is successfully created before creating the asset
      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync('Download');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Download', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert('Descarga exitosa', `El archivo ${name} se ha descargado correctamente`);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      Alert.alert('Error', `Ocurrió un error al descargar el archivo: ${error.message}`);
    }
  };

  const deleteFile = async (file) => {
    try {
      const fileRef = storageRef.child([...currentPath, file.name].join('/'));
      await fileRef.delete();
      console.log('Archivo eliminado:', file.name);
      fetchFiles(); // Actualizar la lista de archivos después de eliminar el archivo
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      Alert.alert('Error', 'Ocurrió un error al eliminar el archivo');
    }
  };

  const renderFiles = () => {
    return files.map((file, index) => (
      <TouchableOpacity 
        key={index} 
        onLongPress={() => showFileOptions(file)} // Cambiado el evento onPress a onLongPress
        onPress={() => file.isDirectory && navigateToFolder(file.name)}
        style={styles.fileItem}
      >
        {file.isDirectory ? (
          <View style={styles.genericFilePreview}>
            <FolderIcon width="50" height="50" />
          </View>
        ) : (
          <View style={styles.filePreviewContainer}>
            {file.name.toLowerCase().endsWith('.mp4') ? (
              <MP4FileIcon width="50" height="50" style={styles.iconCenter} />
            ) : file.name.toLowerCase().endsWith('.svg') ? (
              <SVGFileIcon width="50" height="50" style={styles.iconCenter} />
            ) : file.name.toLowerCase().endsWith('.pdf') ? (
              <PDFFileIcon width="50" height="50" style={styles.iconCenter} />
            ) : file.name.toLowerCase().endsWith('.mp3') ? (
              <MP3FileIcon width="50" height="50" style={styles.iconCenter} />
            ) : file.name.toLowerCase().endsWith('.txt') ? (
              <TXTFileIcon width="50" height="50" style={styles.iconCenter} />
            ) : (
              <Image source={{ uri: file.uri }} style={styles.filePreview} resizeMode="cover" />
            )}
          </View>
        )}
        <Text style={styles.fileName}>{file.name}</Text>
      </TouchableOpacity>
    ));
  };

  const deleteFolder = async (folderName) => {
    try {
      const folderRef = storageRef.child([...currentPath, folderName].join('/') + '/');
      const { items, prefixes } = await folderRef.listAll(); // Verificar si la carpeta existe
    
      if (items.length > 0 || prefixes.length > 0) {
        // Eliminar todos los archivos en la carpeta
        for (const fileRef of items) {
          await fileRef.delete();
        }
    
        // Eliminar todas las subcarpetas en la carpeta
        for (const folderRef of prefixes) {
          await deleteFolder(folderRef.name); // Recursivamente eliminar subcarpetas
        }
    
        console.log('Carpeta eliminada:', folderName);
        fetchFiles(); // Actualizar la lista de archivos después de eliminar la carpeta
      } else {
        console.log('La carpeta no existe o está vacía:', folderName);
        Alert.alert('Error', 'La carpeta que intentas eliminar no existe o está vacía');
      }
    } catch (error) {
      console.error('Error al eliminar la carpeta:', error);
      Alert.alert('Error', 'Ocurrió un error al eliminar la carpeta');
    }
  };
  
  const showFileOptions = (file) => {
    Alert.alert(
      'Opciones de Archivo',
      `¿Qué deseas hacer con el archivo "${file.name}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Descargar',
          onPress: () => downloadFile(file),
        },
        {
          text: file.isDirectory ? 'Eliminar Carpeta' : 'Eliminar Archivo',
          onPress: () => file.isDirectory ? deleteFolder(file.name) : deleteFile(file),
          style: file.isDirectory ? 'destructive' : 'destructive',
        },
      ],
      { cancelable: false }
    );
  };
  

  const createNewFolder = async () => {
    try {
      // Crear una referencia al directorio donde deseas crear la carpeta
      const newFolderRef = storageRef.child([...currentPath, newFolderName].join('/') + '/');
      // Crear un archivo con un nombre único dentro de la carpeta para forzar la creación
      const placeholderFileName = '__placeholder__'; // Nombre del archivo placeholder
      await newFolderRef.child(placeholderFileName).putString(''); // Subir una cadena vacía
      console.log('Nueva carpeta creada:', newFolderName);
      setShowNewFolderDialog(false);
      setNewFolderName(''); // Limpiar el estado del nombre de la carpeta
      await fetchFiles(); // Actualizar la lista de archivos para reflejar la nueva carpeta
    } catch (error) {
      console.error('Error al crear la carpeta:', error);
      Alert.alert('Error', 'Ocurrió un error al crear la carpeta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestor Documental</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowNewFolderDialog(true)} style={styles.createFolderButton}>
          <NewFolderIcon width="25" height="25" />
        </TouchableOpacity>
        <TouchableOpacity onPress={selectFile}>
          <NewFileIcon width="25" height="25" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.filesContainer}>{renderFiles()}</View>
      </ScrollView>

      {/* Modal para crear una nueva carpeta */}
      <Modal
        visible={showNewFolderDialog}
        transparent={true}
        animationType="slide" // Cambia el tipo de animación a 'slide'
        onRequestClose={() => setShowNewFolderDialog(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Crear nueva carpeta</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nombre de la nueva carpeta"
              onChangeText={(text) => setNewFolderName(text)}
              value={newFolderName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={createNewFolder}>
                <Text style={styles.buttonText}>Crear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowNewFolderDialog(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  createFolderButton: {
    marginRight: 10,
  },
  backButton: {
    marginRight: 10,
  },
  filesContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  fileItem: {
    width: 150,
    height: 150,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    overflow: 'hidden',
  },
  filePreviewContainer: {
    width: '100%',
    height: '70%',
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center', // Center the icons
    justifyContent: 'center', // Center the icons
  },
  filePreview: {
    width: '100%',
    height: '100%',
  },
  fileName: {
    marginTop: 5,
    textAlign: 'center',
    maxWidth: 120,
    overflow: 'hidden',
  },
  genericFilePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  genericFileIcon: {
    fontSize: 40,
  },
  iconCenter: {
    alignSelf: 'center', // Center the icons within their container
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Agrega un fondo oscuro semi-transparente
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GestorDocumental;
