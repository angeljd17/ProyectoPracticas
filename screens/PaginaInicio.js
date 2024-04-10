import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaginaInicio = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Página de Inicio</Text>
      <Button
        title="Ir a la Lista de Películas"
        onPress={() => navigation.navigate('Lista')}
      />
    </View>
  );
};

export default PaginaInicio;
