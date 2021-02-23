import React, { useState, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native'
import { Button, Input, Image, Text } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../config/firebase'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerbackTitle: 'abc'
        })
    }, [navigation])

    const register = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateEmail({
                    displayName: name,
                    photoUrl: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                })
            })
            .catch((error) => alert(error.message))
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{ marginBottom: 50 }}>
                Create an account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(name) => setName(name)}
                />
                <Input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="text"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
                <Input
                    placeholder="Profile Pic URL (optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(imageUrl) => setImageUrl(imageUrl)}
                    onSubmitEditing={register}
                />
            </View>
            <Button raised containerStyle={styles.button} title='Register' onPress={register} />
            <View style={{ height: 10 }} />
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
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    },
})