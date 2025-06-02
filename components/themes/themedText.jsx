import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Color';
const ThemedText = ({children, title=false, style, ...props }) => {

    const colorScheme = useColorScheme();

    const theme = Colors[colorScheme] ?? Colors.light;
    const textColor = title ? theme.title : theme.text;


    return (
        <Text 
        style={[{color:textColor}, style]} {...props}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({})

export default ThemedText;
