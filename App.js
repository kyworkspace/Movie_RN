import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Text, Image, useColorScheme } from 'react-native';
import * as Font from "expo-font";
import { Ionicons } from '@expo/vector-icons'
import { Asset, useAssets } from 'expo-asset'

import 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styled';


const queryClient = new QueryClient();


export default function App() {
  const [assets] = useAssets([require('./iu2.jpg')])
  const [loaded, error] = Font.useFonts(Ionicons.font)
  const isDark = useColorScheme() === "dark";


  if (!assets || !loaded) {
    return (
      <AppLoading />
    );
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <NavigationContainer>
            <Root />
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }
}