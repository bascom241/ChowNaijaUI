// store/useAuthStore.ts
import { create } from 'zustand';
import { Alert } from 'react-native';
import { axiosInstance } from '../lib/axios';
import { AuthService } from '../services/auth.service';
import axios from 'axios';

const baseURL = "http://192.168.1.144:5000/api";

export const useAuthStore = create((set, get) => ({
  token: null,
  isLoading: true,
  message: null,
  isSignedIn: false,
  user: {},
  fetchingUser: false,
  editingUser: false,

  initialize: async () => {
    try {
      const token = await AuthService.getAccessToken();
      set({ token, isLoading: false });
    } catch {
      set({ token: null, isLoading: false });
    }
  },

  registerUser: async (formData, router) => {
    try {
      await axios.post(`${baseURL}/auth/register`, formData);
      Alert.alert('Registration successful');
      router.replace('/(auth)/login');
    } catch (error) {
      Alert.alert(error.response?.data || error.message);
      throw error;
    }
  },

  loginUser: async (formData, router) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, formData);
      const { access_token, refresh_token } = response.data;
      set({ isSignedIn: true });
      await AuthService.saveTokens(access_token, refresh_token);
      set({ token: access_token });
      Alert.alert('Logged in!');
      router.replace('/(tabs)/home');
    } catch (error) {
      set({ isSignedIn: false });
      Alert.alert(error.response?.data || error.message);
      throw error;
    }
  },

  fetchUser: async () => {
    const token = await AuthService.getAccessToken();
    set({ token, fetchingUser: true });
    try {
      const response = await axios.get(`${baseURL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ fetchingUser: false, user: response.data });
    } catch (error) {
      set({ fetchingUser: false });
      Alert.alert("Error fetching user");
      console.log(error);
    }
  },

 editUser: async (data) => {
  const { user } = get();
  const token = await AuthService.getAccessToken();
  const userId = user?.id;
  console.log("User ID:", userId);
  console.log("Token:", token);
  if (!userId || !token) {
    Alert.alert("Error: Missing user ID or token");
    return;
  }
  set({ editingUser: true });
  try {
    const response = await axios.put(`${baseURL}/auth/editUser/${userId}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    set((state) => ({
      editingUser: false,
      user: { ...state.user, ...response.data }
    }));
    Alert.alert('Profile updated successfully!');
  } catch (error) {
    set({ editingUser: false });
    Alert.alert("Error updating profile");
    console.log(error);
  }
},


  setUserField: (field, value) => {
    set((state) => ({
      user: { ...state.user, [field]: value }
    }));
  },

  logout: async (router) => {
    try {
      await AuthService.removeTokens();
      set({ token: null, isSignedIn: false, user: {} });
      router.replace('/(auth)/login');
    } catch (error) {
      Alert.alert('Logout failed', error.message);
    }
  },

  refreshToken: async () => {
    try {
      const newToken = await AuthService.refreshToken();
      if (newToken) {
        set({ token: newToken });
        return newToken;
      }
      return null;
    } catch (error) {
      set({ token: null });
      return null;
    }
  }
}));
