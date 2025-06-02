import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Color';
const TabLayout = () => {

    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;


    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme. iconColorFocused,
                tabBarInactiveTintColor:theme.iconColor,
                tabBarStyle:{
                    backgroundColor:theme.navBackground,
                    paddingTop:9,
                    height:90
                }
            }}
        >
            <Tabs.Screen name='home'
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => <Octicons name='home' size={24} color={color} />
                }} />

            <Tabs.Screen
                name='create'
                options={{
                    tabBarLabel: "Create",
                    tabBarIcon: ({ color }) => <Ionicons name="create-outline" size={24} color={color} />
                }}
            />



            <Tabs.Screen
                name='profile'
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color }) => <Entypo name="user" size={24} color={color} />
                }}
            />

            <Tabs.Screen
                name="[id]"
                options={{
                    tabBarLabel:"Details",
                    tabBarIcon:({color}) => <Entypo name='text-document' size={24} color={color}/>
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({})

export default TabLayout;
