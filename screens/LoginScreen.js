import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace('Home')
            }
        })

        return unsubscribe;
    }, [])

    const signIn = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error));
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Signal-logo.png' }}
                style={{ width: 200, height: 100, resizeMode: 'contain' }}
            />
            
            <View style={styles.inputContainer}>
                <Input 
                placeholder='Email' 
                autoFocus 
                type='email' 
                value={email}
                onChangeText={(text) => setEmail(text)} />
                <Input 
                placeholder='Password' 
                secureTextEntry 
                type='password'
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn} />
            </View>

            <Button 
            containerStyle={styles.button}
            onPress={signIn}
            title='Login' />
            <Button 
            containerStyle={styles.button}
            type='outline'
            onPress={() => navigation.navigate('Register')}
            title='Register' />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
