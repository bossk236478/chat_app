import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../config/firebase';
import { LogBox } from 'react-native';

const LoginScreen = ({ navigation }) => {
    
    LogBox.ignoreLogs(['Setting a timer']);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            //console.log(authUser)
            if (authUser) {
                navigation.replace('Home')
            }
        })
        return unsubscribe
    })

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error))
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />
            <Image
                source={{
                    uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
                }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)} />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button containerStyle={styles.button} title='Login' onPress={signIn} />
            <Button containerStyle={styles.button} type='outline' title='Register' onPress={() => navigation.navigate('Register')} />
            <View style={{ height: 10 }} />
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
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    },
})