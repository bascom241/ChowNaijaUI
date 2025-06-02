import axios from "axios";
import { AuthService } from "../services/auth.service";

export const axiosInstance = axios.create({
    baseURL: "http://192.168.1.144:5000/api",
    withCredentials: true
});

// Request interceptor to add token to headers
// axiosInstance.interceptors.request.use(async (config) => {
//     const token = await AuthService.getAccessToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// // Response interceptor to handle token refresh
// axiosInstance.interceptors.response.use(
//     response => response,
//     async error => {
//         const originalRequest = error.config;
        
//         // If 401 error and not already retried
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
            
//             try {
//                 const refreshToken = await AuthService.getRefreshToken();
//                 if (!refreshToken) {
//                     throw new Error("No refresh token available");
//                 }
                
//                 // Call refresh endpoint
//             const response = await axiosInstance.post('/auth/refresh', { refresh_token: refreshToken });

                
//                 const newAccessToken = response.data.access_token;
//                 const newRefreshToken = response.data.refresh_token;
                
//                 // Store new tokens
//                 await AuthService.storeTokens(newAccessToken, newRefreshToken);
                
//                 // Retry original request with new token
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return axiosInstance(originalRequest);
                
//             } catch (refreshError) {
//                 console.error('Token refresh failed:', refreshError);
//                 await AuthService.logout();
//                 window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             }
//         }
        
//         return Promise.reject(error);
//     }
// );