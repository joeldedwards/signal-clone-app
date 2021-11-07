import React, { Fragment, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import firebase from 'firebase/app'
import { db, auth } from '../firebase'

const ChatScreen = ({navigation, route}) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    let chatId = route.params.id.id
        
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Avatar 
                        rounded
                        source={{
                            uri: messages[0]?.data.photoURL ||
                            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                        }} />
                    <Text style={{marginLeft: 10, fontWeight: '700', color: 'white'}}>{route.params.id.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{marginLeft: 15}} onPress={navigation.goBack}>
                    <AntDesign 
                        name='arrowleft' 
                        size={24} 
                        color='white' />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='white'/>
                    </TouchableOpacity>
                </View>
            )
        }) 
    }, [navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput('')
    }

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats')
        .doc(chatId).collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ))

        return unsubscribe
    }, [route])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                style={styles.container} 
                keyboardVerticalOffset={90}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Fragment>
                    <ScrollView contentContainerStyle={{paddingTop: 15, paddingLeft: 10, paddingRight: 5}}>
                        {messages.map(({id, data}) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.receiver}>
                                <Avatar
                                    rounded
                                    position='absolute'
                                    containerStyle={{
                                        position: 'absolute',
                                        bottom: -15,
                                        right: -5
                                    }}
                                    size={30}
                                    source={{
                                        uri: data.photoURL,
                                    }} />
                                    <Text style={styles.receiverText}>{data.message}</Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.sender}>
                                    <Avatar
                                        rounded
                                        position='absolute'
                                        containerStyle={{
                                            position: 'absolute',
                                            bottom: -15,
                                            left: -5
                                        }}
                                        size={30}
                                        source={{
                                            uri: data.photoURL,
                                        }} />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput
                            value={input}
                            onChangeText={(text) => setInput(text)}
                            onSubmitEditing={sendMessage}
                            placeholder='Signal Message'
                            style={styles.textInput} />
                        <TouchableOpacity 
                            onPress={sendMessage} 
                            activeOpacity={0.5}>
                            <Ionicons name='send' size={24} color='#2B68E6' />
                        </TouchableOpacity>
                    </View>
                </Fragment>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    footer: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        width: '100%'
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: 'grey',
        borderRadius: 30
    },
    receiver: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    sender: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    receiverText: {

    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        fontWeight: '700'
    }
})
