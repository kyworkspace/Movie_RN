import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { Text, View, TouchableOpacity } from 'react-native';
import { YELLOW_COLOR } from '../color';
import Detail from '../screens/Detail';

const NativeStack =createNativeStackNavigator();

const Stack =()=>(
    <NativeStack.Navigator screenOptions={{
        animation: 'slide_from_right'
    }}>
        <NativeStack.Screen name='Detail' component={Detail} />
    </NativeStack.Navigator>
)

export default Stack;
