import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ThemedView = ({ style, safe = false, transparent = false, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const insets = useSafeAreaInsets(); // Always called ✅

  const backgroundColor = transparent ? "transparent" : theme.background;

  if (!safe) {
    return (
      <View
        style={[{ backgroundColor }, style]}
        {...props}
      />
    );
  }

  return (
    <View
      style={[
        { backgroundColor, paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 },
        style
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({});

export default ThemedView;
