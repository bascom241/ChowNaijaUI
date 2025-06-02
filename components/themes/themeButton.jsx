import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Pressable, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Color';
const ThemeButton = ({children, style, ...props}) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;



    return (
        <TouchableOpacity style={[{backgroundColor:theme.buttonBgColor}, style]} {...props}>
            {children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default ThemeButton;
