import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Color';

const ThemeButtonText = ({ style, children, ...props }) => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <Text style={[styles.text, { color: theme.buttonTextColor }, style]} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Trebuchet MS',
        textAlign: 'center',
    },
});

export default ThemeButtonText;