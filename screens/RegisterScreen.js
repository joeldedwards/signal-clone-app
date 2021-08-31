import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Image, Text } from 'react-native-elements'

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login'
        })
    }, [navigation])

    const register = () => {
        
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{marginBottom: 50}}>
                Create an Signal Account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Full Name' 
                    autofocus 
                    type='text' 
                    value={name} 
                    onChange={(text) =>setName(text)} />
                <Input 
                    placeholder='Email' 
                    type='text' value={email} 
                    onChange={(text) =>setEmail(text)} />
                <Input 
                    placeholder='Password' 
                    type='password' 
                    value={password} 
                    secureTextEntry 
                    onChange={(text) =>setPassword(text)} />
                <Input 
                    placeholder='Profile Picture URL (optional)' 
                    type='text' 
                    value={imageUrl} 
                    onChange={(text) =>setImageUrl(text)} 
                    onSubmitEditing={register} />
            </View>

            <Button
                containerStyle={styles.button}
                raised
                onPress={register} 
                title='Register' />

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        width: 200,
        marginTop: 10
    },
    inputContainer: {
        width: 300
    }
})
