import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaginaListado = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Página de Listado</Text>
      <Button
        title="Ir a Inicio"
        onPress={() => navigation.navigate('Inicio')}
      />
      <Button
        title="Ir a Perfil"
        onPress={() => navigation.navigate('Perfil')}
      />
    </View>
  );
};

export default PaginaListado;
