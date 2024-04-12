import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaginaPerfil = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Página de Perfil de Usuario</Text>
      <Button
        title="Ir a Inicio"
        onPress={() => navigation.navigate('Inicio')}
      />
      <Button
        title="Ir a Listado"
        onPress={() => navigation.navigate('Listado')}
      />
    </View>
  );
};

export default PaginaPerfil;
