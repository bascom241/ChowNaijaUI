import { StyleSheet, TextInput, View, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import ThemedView from '../../components/themes/themedView';
import ThemedText from '../../components/themes/themedText';
import ThemeButtonText from '../../components/themes/themeButtonText';
import ThemeButton from '../../components/themes/themeButton';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { useAuthStore } from '../../store/useAuthStore';
import AnimatedSpinner from '../../utils/AnimateSpiner';
import logo from '../../assets/Mtn1_prev_ui.png';

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [focusedField, setFocusedField] = useState(null);
    const { registerUser, isRegister } = useAuthStore();
    const router = useRouter();

    const handleChange = (key, value) => setFormData({ ...formData, [key]: value });

    const handleSubmit = () => registerUser(formData, router);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView style={styles.container}>
                <Image source={logo} style={styles.logo} />
                <ThemedText style={styles.title}>CHOW NAIJA</ThemedText>
                <ThemedText style={styles.subtitle}>Enjoy a seamless taste of goodness</ThemedText>

                <View style={styles.form}>
                    {['username', 'email', 'password'].map((field, index) => (
                        <TextInput
                            key={field}
                            style={[
                                styles.input,
                                focusedField === field && styles.inputFocused,
                            ]}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formData[field]}
                            onChangeText={(text) => handleChange(field, text)}
                            keyboardType={field === 'email' ? 'email-address' : 'default'}
                            secureTextEntry={field === 'password'}
                            onFocus={() => setFocusedField(field)}
                            onBlur={() => setFocusedField(null)}
                        />
                    ))}

                    <ThemeButton style={styles.button} onPress={handleSubmit}>
                        <ThemeButtonText style={styles.buttonText}>
                            {isRegister ? <AnimatedSpinner /> : 'Register Now'}
                        </ThemeButtonText>
                    </ThemeButton>
                </View>

                <View style={styles.footer}>
                    <ThemedText style={styles.footerText}>Already have an account?</ThemedText>
                    <Link href="/(auth)/login" style={styles.link}>Sign In</Link>
                </View>
            </ThemedView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    logo: {
        width: 80,
        height: 60,
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        letterSpacing: 2,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: "green",
        marginBottom: 30,
    },
    form: {
        width: "100%",
        maxWidth: 350,
        gap: 15,
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
    },
    inputFocused: {
        borderBottomColor: "green",
    },
    button: {
        backgroundColor: "green",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        fontSize: 18,
        color: "white",
    },
    footer: {
        alignItems: "center",
        marginTop: 30,
    },
    footerText: {
        fontSize: 16,
        marginBottom: 5,
    },
    link: {
        fontSize: 16,
        color: "green",
        textDecorationLine: "underline",
    },
});

export default Register;
