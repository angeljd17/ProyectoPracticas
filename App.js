import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import { View, Text, StatusBar } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { PermissionsAndroid } from 'react-native';
import useSystemTheme from './src/hooks/useSystemTheme';

const App = () => {
  const [notification, setNotification] = useState(null);
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  useEffect(() => {
    const setupPushNotifications = async () => {
      try {
        const fcmToken = await messaging().getToken();
        // Suscribir al usuario al canal alten_cantera_2024
        await messaging().subscribeToTopic('alten_cantera_2024');

        // Configurar el canal de notificación alten_cantera_2024
        PushNotification.createChannel(
          {
            channelId: 'alten_cantera_2024',
            channelName: 'Canal Alten Cantera 2024',
            channelDescription: 'Notificaciones para Alten Cantera 2024',
            importance: 4,
            vibrate: true,
          },
          created => console.log(`Channel '${created}' created`),
        );

        messaging().onMessage(async remoteMessage => {
          console.log('Notificación recibida en primer plano:', remoteMessage);
          setNotification(remoteMessage.notification);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Notificación recibida en segundo plano:', remoteMessage);
          const { title, body } = remoteMessage.notification;
          PushNotification.localNotification({
            channelId: 'alten_cantera_2024',
            title,
            message: body,
          });
        });
      } catch (error) {
        console.error('Error al configurar las notificaciones:', error);
      }
    };

    setupPushNotifications();
  }, []);

  const appTheme = useSystemTheme(); // Obtener el tema del sistema

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={appTheme === 'dark' ? 'black' : 'white'} // Utiliza appTheme en lugar de theme
        barStyle={appTheme === 'dark' ? 'light-content' : 'dark-content'} // Utiliza appTheme en lugar de theme
      />
      <TabNavigation />
      {notification && (
        <View style={{ backgroundColor: 'blue', padding: 10, position: 'absolute', top: 0, left: 0, right: 0 }}>
          <Text>Nueva Notificación: {notification.title}</Text>
          <Text>Cuerpo: {notification.body}</Text>
        </View>
      )}
    </NavigationContainer>
  );
};

export default App;
