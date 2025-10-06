import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './navigation/navbar';

import AppLoading from 'expo-app-loading';
import useFonts from './hooks/useFonts';
import AuthProvider from './context/authContext';

const App = () => {

  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => { }}
      />
    );
  }

  return (
    <NavigationContainer>
      <StatusBar hidden />
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App;
