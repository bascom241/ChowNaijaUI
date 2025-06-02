import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import ThemedView from '../components/themes/themedView';
import ThemedText from '../components/themes/themedText';
import ThemeButton from '../components/themes/themeButton';
import ThemeButtonText from '../components/themes/themeButtonText';

import ImageScr from '../assets/Frame2-transformed.jpeg';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/login");
  };

  return (
    <ImageBackground
      source={ImageScr}
      resizeMode="cover"
      style={styles.imageBackground}
      blurRadius={8}
    >
      <ThemedView style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Welcome to</Text>
          <Text style={styles.brandText}>ChowNaija</Text>
          <Text style={styles.subText}>Your gateway to a seamless taste of goodness</Text>
        </View>

        <ThemeButton style={styles.buttonStyle} onPress={handleRedirect}>
          <ThemeButtonText style={styles.buttonText}>Let’s Get Started</ThemeButtonText>
        </ThemeButton>
      </ThemedView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#FFFFFF',
    letterSpacing: 4,
    textAlign: 'center',
    fontFamily: 'Trebuchet MS',
  },
  brandText: {
    fontWeight: 'bold',
    fontSize: 60,
    color: '#00C853', // Vibrant Green
    letterSpacing: 6,
    textAlign: 'center',
    fontFamily: 'Trebuchet MS',
  },
  subText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Trebuchet MS',
  },
  buttonStyle: {
    backgroundColor: '#00C853',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Trebuchet MS',
  },
});

export default Index;
