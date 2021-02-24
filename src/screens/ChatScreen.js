import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { StyleSheet, Text, View, ScrollView, Platform, KeyboardAvoidingView, SafeAreaView, TextInput } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import * as firebase from 'firebase'
import { auth, db } from '../config/firebase'
import { StatusBar } from 'expo-status-bar'
import { Keyboard } from 'react-native'

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar rounded source={{ uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }} />
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: '700' }}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 20 }}>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='white' />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const sendMessage = () => {
        Keyboard.dismiss()

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput('')
    }

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })))
            )
        return unsubscribe
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style='light' />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {messages.map(({ id, data }) =>
                                data.email === auth.currentUser.email ?
                                    (
                                        <View key={id} style={styles.receiver}>
                                            <Avatar
                                                containerStyle={{
                                                    position: 'absolute',
                                                    bottom: -15,
                                                    right: -5,
                                                }}
                                                position='absolute'
                                                bottom={-15}
                                                right={-5}
                                                rounded
                                                size={30}
                                                source={{ uri: data.photoURL }}
                                            />
                                            <Text style={styles.receiverText}>{data.message}</Text>
                                        </View>
                                    )
                                    :
                                    (
                                        <View key={id} style={styles.sender}>
                                            <Avatar
                                                containerStyle={{
                                                    position: 'absolute',
                                                    bottom: -15,
                                                    left: -5,
                                                }}
                                                position='absolute'
                                                bottom={-15}
                                                left={-5}
                                                rounded
                                                size={30}
                                                source={{ uri: data.photoURL }}
                                            />
                                            <Text style={styles.senderText}> {data.message}</Text>
                                        </View>
                                    )
                            )}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                placeholder='Message'
                                style={styles.textInput}
                                onChangeText={(input) => setInput(input)}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name='send' color='#2B68E6' size={24} />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: 'transparent',
        backgroundColor: '#ECECEC',
        borderWidth: 1,
        padding: 10,
        color: 'grey',
        borderRadius: 30,
    },
    receiverText: {
        color: "black",
        fontWeight: "500",
    },
    senderText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },
    receiverName: {
        fontSize: 30,
        color: 'black'
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white'
    },
    receiver: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    sender: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: '80%',
        position: 'relative'
    }
})