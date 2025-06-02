import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Color';
import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native';
const RootLayout = () => {

    const { initialize, isSignedIn, isLoading } = useAuthStore()
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            await initialize()
        }

        checkAuth();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            if (isSignedIn) {
                router.replace("/(tabs)/home")
            } else {
                router.replace("/");
            }
        }
    })

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }



    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: theme.navBackground },
                headerTintColor: theme.title,

            }}
        >
            <Stack.Screen name='index' options={{
                title: "Home",
                headerShown: false
            }} />

            <Stack.Screen
                name='(tabs)'
                options={
                    {
                        headerShown:false
                    }
                }
            />

            <Stack.Screen 
                name='(auth)/login' 
                options={{
                    title: "Login",
                    headerShown: false,
                    headerStyle: { backgroundColor: theme.navBackground },
                    headerTintColor: theme.title,
                }}
            />

            <Stack.Screen
                name='(auth)/register'
                options={{
                    title: "Register",
                    headerShown: false,
                    headerStyle: { backgroundColor: theme.navBackground },
                    headerTintColor: theme.title,
                }}
            />
                
            



        </Stack>
    );
}

const styles = StyleSheet.create({})

export default RootLayout;
