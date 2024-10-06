import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button, Title, TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { client, account } from '../../App'; // Adjust the import as necessary
import { ID } from 'react-native-appwrite';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const navigation = useNavigation();

    const handleSignup = async () => {
        try {
            if (!email) {
                Alert.alert('Email is required');
            }

            const session = await account.createEmailToken(
                ID.unique(),
                email,

            );
            Alert.alert('OTP has been sent to your email. Please wait for some while ');
            console.log(session);
            setEmail('');
            setOTP('');
        } catch (error) {
            Alert.alert(error.message);
            console.error(error);
        }
    };

    const handleErr = () => {
        if (otp) {
            navigation.navigate('Center')
        }
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Signup/Login</Title>
            <PaperTextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType='email-address'
                mode="outlined"
            />
            <PaperTextInput
                label="OTP"
                value={otp}
                onChangeText={setOTP}
                style={styles.input}
                mode="outlined"
            />
            <Button
                mode="text"
                onPress={handleSignup}
                style={styles.link}
            >
                Generate OTP
            </Button>
            <Button
                mode="contained"
                onPress={handleErr}
                style={styles.button}
            >
                Signup
            </Button>

        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
        paddingVertical: 8,
    },
    link: {
        marginTop: 16,
        textAlign: 'center',
    },
});