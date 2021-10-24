import React from 'react';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

import { Home } from './src/screens/Home';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    // caso as novas fontes não foram carregadas ele vai segurar a tela de reload.
    return <AppLoading />
  }

  return (
    <>
      <StatusBar style="light" />
      <Home />
    </>
  );
}
