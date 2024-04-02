import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaginaPerfil = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Página de Perfil</Text>
      <Button
        title="Ir al Listado"
        onPress={() => navigation.navigate('Listado')}
      />
    </View>
  );
};

export default PaginaPerfil;
