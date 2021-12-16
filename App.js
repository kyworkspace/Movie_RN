import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Text ,Image } from 'react-native';
import * as Font from "expo-font";
import {Ionicons} from '@expo/vector-icons'
import {Asset,useAssets} from 'expo-asset'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';


export default function App() {
  const [assets] = useAssets([require('./iu2.jpg')])
  const [loaded, error] = Font.useFonts(Ionicons.font)
  if(!assets||!loaded){
    return (
      <AppLoading/>
    );
  }else{
    return (
      <NavigationContainer>
        <Tabs/>
      </NavigationContainer>
    );
  }
  
}