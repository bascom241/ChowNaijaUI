import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native';
import ThemedView from '../../components/themes/themedView';
import ThemeButtonText from '../../components/themes/themeButtonText';
import ThemeButton from '../../components/themes/themeButton';
const ForgotPassword = () => {

    const [email, setEmail] = useState("");


    const [isEmailFocused, setIsEmailFocused] = useState(false);

    return (
        <ThemedView style={styles.container}>

            <View style={styles.topHeader}>

                <Text style={styles.textHeader}>FORGOT PASSWORD</Text>
                <View style={styles.header1}>
                    <Text style={styles.text}>Dont worry, With our Secured application We can reset it for you.</Text>
                    <Text style={styles.text}>Just Assist Us By Following the Procedure</Text>
                </View>

            </View>

            <View>


                <View style={styles.header}>
                    <Text style={styles.textHeader2}>Email</Text>
                    <TextInput
                        style={[styles.input, isEmailFocused && styles.inputFocused]}
                        placeholder='Your Email Address'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                    />
                </View>

                <ThemeButton style={styles.buttonStyle}>
                    <ThemeButtonText style={styles.buttonText}>
                        Send Code
                    </ThemeButtonText>
                </ThemeButton>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 50,
        paddingBottom: 30,
        fontFamily: "Trebuchet MS",
        paddingTop: 40
    },
    input: {
        borderWidth: 2,
        borderColor: "black",
        paddingVertical: 8,
        paddingHorizontal: 40,
        height: 60,
        borderRadius: 15,
        marginBottom: 10,
        width: 400,
        backgroundColor: "white",
        color: "black",
        fontSize: 20,
    },
    inputFocused: {
        outlineColor: "green",
        borderColor: "green",
        backgroundColor: "#FFFFFF",
        color: "#000000",
    },
    buttonStyle: {
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: 15,
        width: 400
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "Trebuchet MS"
    },
    topHeader: {
        flexDirection: "column",
        justifyContent: "center",
        gap: 20,
        alignItems: "center",
        fontFamily: "Trebuchet MS"
    },

    header1: {
        flexDirection: "column",
        justifyContent: "center",
        gap: 3,
        alignItems: "center",
        fontFamily: "Trebuchet MS"
    },
    header: {
        flexDirection: "column",
        justifyContent: "center",
        gap: 10
    },
    textHeader: {
        fontFamily: "Trebuchet MS",
        fontSize: 30,
        fontWeight: "bold"
    },
    textHeader2: {
        fontFamily: "Trebuchet MS",
        fontSize: 20,
        padding:5
    },
    text: {
        fontFamily: "Trebuchet MS",
        fontSize: 16,
    }

})

export default ForgotPassword;
