import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { Text, View, TouchableOpacity } from 'react-native';
import { YELLOW_COLOR } from '../color';


const ScreenOne = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={()=>navigate("Two")}>
        <Text>One 2</Text>
    </TouchableOpacity>
)
const ScreenTwo = ({ navigation: { navigate } }) => (
    <TouchableOpacity onPress={() => navigate("Three")}>
        <Text>Two 3</Text>
    </TouchableOpacity>
)
const ScreenThree =({navigation:{goBack,setOptions,navigate}})=>(
    <TouchableOpacity onPress={()=>navigate('Tabs',{screen:'Search'})}>
        <Text>Change Title</Text>
    </TouchableOpacity>
)

const NativeStack =createNativeStackNavigator();

const Stack =()=>(
    <NativeStack.Navigator screenOptions={{
        animation: 'slide_from_right'
    }}>
        <NativeStack.Screen name='One' component={ScreenOne} />
        <NativeStack.Screen name='Two' component={ScreenTwo} />
        <NativeStack.Screen name='Three' component={ScreenThree} options={{ presentation: 'card',animation:'slide_from_right' }} />
    </NativeStack.Navigator>
)

export default Stack;
