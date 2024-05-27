import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, useColorScheme, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaginaAjustes = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const storedThemePreference = await AsyncStorage.getItem('themePreference');
      if (storedThemePreference !== null) {
        setIsDarkTheme(storedThemePreference === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkTheme ? 'dark' : 'light';
      await AsyncStorage.setItem('themePreference', newTheme);
      setIsDarkTheme(!isDarkTheme);
      // Aquí podrías añadir lógica para actualizar el tema de la app
    } catch (error) {
      console.error('Error setting theme preference:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, isDarkTheme ? styles.darkBackground : styles.lightBackground]}>
      <Text style={[styles.title, isDarkTheme ? styles.darkText : styles.lightText]}>Ajustes</Text>
      
      <View style={styles.setting}>
        <Text style={[styles.settingText, isDarkTheme ? styles.darkText : styles.lightText]}>Tema Oscuro</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkTheme ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <View style={styles.setting}>
        <Text style={[styles.settingText, isDarkTheme ? styles.darkText : styles.lightText]}>Notificaciones</Text>
        <Switch
          value={false}
          onValueChange={() => {}}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={'#f4f3f4'}
        />
      </View>

      <View style={styles.setting}>
        <Text style={[styles.settingText, isDarkTheme ? styles.darkText : styles.lightText]}>Sincronizar Datos</Text>
        <Switch
          value={false}
          onValueChange={() => {}}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={'#f4f3f4'}
        />
      </View>

      <TouchableOpacity style={styles.optionButton}>
        <Text style={[styles.optionButtonText, isDarkTheme ? styles.darkText : styles.lightText]}>Cuenta</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.optionButton}>
        <Text style={[styles.optionButtonText, isDarkTheme ? styles.darkText : styles.lightText]}>Privacidad</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.optionButton}>
        <Text style={[styles.optionButtonText, isDarkTheme ? styles.darkText : styles.lightText]}>Seguridad</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.optionButton}>
        <Text style={[styles.optionButtonText, isDarkTheme ? styles.darkText : styles.lightText]}>Ayuda</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.optionButton}>
        <Text style={[styles.optionButtonText, isDarkTheme ? styles.darkText : styles.lightText]}>Acerca de</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  lightBackground: {
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
  optionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionButtonText: {
    fontSize: 18,
  },
});

export default PaginaAjustes;
