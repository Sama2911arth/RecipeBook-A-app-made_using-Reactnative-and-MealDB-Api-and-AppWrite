import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import { client, account, userId } from '../../App';

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');

    const handleLogin = async () => {
        try {
            const session = await account.createSession(
                userId,
                '[SECRET]'
            );
            console.log(session);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <View>
            <Text>login</Text>
            <TextInput
                placeholder='Enter Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
            />
            <TextInput
                placeholder='Enter OTP'
                value={otp}
                onChangeText={setOTP}
                keyboardType='number-pad'
            />
            <Button mode="contained" title="Login"
                onPress={handleLogin} >Login</Button>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})