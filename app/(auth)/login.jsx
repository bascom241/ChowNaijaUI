import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Link, useRouter } from 'expo-router';

import ThemedView from '../../components/themes/themedView';
import ThemedText from '../../components/themes/themedText';
import ThemeButtonText from '../../components/themes/themeButtonText';
import ThemeButton from '../../components/themes/themeButton';

import { useAuthStore } from '../../store/useAuthStore';

import logo from '../../assets/Mtn1_prev_ui.png';

const Login = () => {
  const router = useRouter();
  const { loginUser } = useAuthStore();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isUserNameFocused, setIsUserNameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    loginUser(formData, router);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Image source={logo} style={styles.logo} alt="logo.png" />
        <ThemedText style={styles.title}>Chow Naija</ThemedText>
        <ThemedText style={styles.subtitle}>Seamless taste of goodness</ThemedText>

        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, isUserNameFocused && styles.inputFocused]}
            placeholder="Username"
            placeholderTextColor="#888"
            value={formData.username}
            onChangeText={(text) => handleChange('username', text)}
            onFocus={() => setIsUserNameFocused(true)}
            onBlur={() => setIsUserNameFocused(false)}
          />

          <TextInput
            style={[styles.input, isPasswordFocused && styles.inputFocused]}
            placeholder="Password"
            placeholderTextColor="#888"
            value={formData.password}
            secureTextEntry
            onChangeText={(text) => handleChange('password', text)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />

          <ThemeButton onPress={handleSubmit} style={styles.button}>
            <ThemeButtonText style={styles.buttonText}>Login</ThemeButtonText>
          </ThemeButton>
        </View>

        <View style={styles.linksContainer}>
          <ThemedText style={styles.accountText}>Don't have an account?</ThemedText>
          <Link href="/(auth)/register" style={styles.linkText}>Sign Up</Link>
          <Link href="/(auth)/forgotPassword" style={styles.forgotPassword}>Forgot Password?</Link>
        </View>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  input: {
    width: '90%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  inputFocused: {
    borderColor: '#00C853',
  },
  button: {
    width: '90%',
    backgroundColor: '#00C853', // solid green
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
    gap: 8,
  },
  accountText: {
    fontSize: 16,
    color: '#444',
  },
  linkText: {
    fontSize: 16,
    color: '#00BFA5',
    fontWeight: 'bold',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});

export default Login;
