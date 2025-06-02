import { axiosInstance } from "../lib/axios";
import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const AuthService = {
    // Save both tokens
    saveTokens: async (accessToken,refreshToken) => {
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
    },

    // Get access token
    getAccessToken: async () => {
        return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    },

    // Get refresh token
    getRefreshToken: async () => {
        return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    },

    // Remove both tokens (logout)
    removeTokens: async () => {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    },

    // Check if user has tokens (not necessarily valid)
    isAuthenticated: async () => {
        const token = await AuthService.getAccessToken();
        return !!token;
    },

    // Refresh token logic
    refreshToken: async () => {
        try {
            const refreshToken = await AuthService.getRefreshToken();
            
            if (!refreshToken) {
                throw new Error("No refresh token available");
            }

            const response = await axiosInstance.post('/auth/refresh', {
                refresh_token: refreshToken
            });

            const newAccessToken = response.data.access_token;
            const newRefreshToken = response.data.refresh_token;

            await AuthService.saveTokens(newAccessToken, newRefreshToken);
            
            return newAccessToken;
        } catch (error) {
            console.error('Token refresh failed:', error);
            await AuthService.removeTokens();
            return null;
        }
    }
};