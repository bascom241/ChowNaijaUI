import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';  // Import the AuthStore
import axios from 'axios';
import { Alert } from 'react-native';
const baseURL = "http://192.168.1.144:5000/api";
export const useRestaurantStore = create((set) => ({
    isLoading: false,
    data: [],
    error: null,
    addingRestaurant: false,
    message: null,
    addingError: null,
    singleRetaurantContainer:{},
    loadingRestaurant:false,
    fetchRestaurants: async () => {
        set({ isLoading: true });
        console.log('Fetching restaurants...');

        try {
            const token = useAuthStore.getState().token;  // Get token from auth store
            console.log('Using token:', token);


            if (token) {
                const response = await axios.get(`${baseURL}/restaurants`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });


                set({ data: response.data, isLoading: false });
            }
            else {
                console.warn('No token found, cannot fetch restaurants');
                set({ isLoading: false });
            }

        } catch (error) {
            console.error('Error fetching restaurants:', error);
            set({ isLoading: false });
        }
    },

    createRestaurant: async (formData) => {
        set({ addingRestaurant: true })
        try {

            const token = useAuthStore.getState().token;
            console.log("Token to Used", token);

            await axios.post(`${baseURL}/restaurant`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            set({ addingRestaurant: false })

            Alert.alert("Restaurant Posted, Thank You::::")
            return true;

        } catch (error) {
            console.log("Error Fetching Restaurant", error);
            set({ addingRestaurant: false })
        }

    },
    fetchSingleRestaurant: async (id) => {
        set({loadingRestaurant:true});

        const token = useAuthStore.getState().token;
        if(token === null){
            Alert.alert("Token Not found")
        }
        try {
            const response = await axiosInstance.get(`${baseURL}/restaurant/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            });
            set({singleRetaurantContainer:response.data, loadingRestaurant:false})
            
        } catch (error) {
            Alert.alert(error.message);
            set({loadingRestaurant:false});
        }

    }
}));
