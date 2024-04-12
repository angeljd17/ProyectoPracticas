import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaginaInicio = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-blue-100">
      <TouchableOpacity
        onPress={() => navigation.navigate('Lista')}
        className="bg-blue-500 py-3 px-6 rounded-lg mb-4"
      >
        <Text className="text-white font-bold">Ir a la Lista de Películas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaginaInicio;
