import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Color';
const ThemeCard = ({styles,...props}) => {

    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <View style={[{
            backgroundColor:theme.background,

        },styles]} {...props}/>
            
        
    );
}

const styles = StyleSheet.create({})

export default ThemeCard;
