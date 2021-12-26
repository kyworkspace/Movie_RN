import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { View, Text } from 'react-native'
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { BLACK_COLOR, GRAY_COLOR, LIGHT_BLACK_COLOR, LIGHT_GRAY_COLOR, YELLOW_COLOR } from '../color';
import Stack from './Stack';


const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === "dark";
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : "white"
                },
                tabBarActiveTintColor: isDark ? YELLOW_COLOR : 'black',
                tabBarInactiveTintColor: isDark ? LIGHT_GRAY_COLOR : GRAY_COLOR,
                headerStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : LIGHT_BLACK_COLOR
                },
                headerTitleStyle: {
                    color: isDark ? YELLOW_COLOR : 'black',
                },
                tabBarLabelStyle : {
                    fontSize : 14,
                    fontWeight : "600"

                }
            }}
        >
            <Tab.Screen name="Movies" component={Movies}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={focused?"film":"film-outline"} color={color} size={size} />
                    }
                }}
            />
            <Tab.Screen name="TV" component={Tv}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={focused?'tv':'tv-outline'} color={color} size={size} />
                    }
                }}
            />
            <Tab.Screen name="Search" component={Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name="search" color={color} size={size} />
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;