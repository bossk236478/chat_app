// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBEBbRZv8D_FMg3q2mnVnjh1LsHuv1WRdY",
    authDomain: "chat-app-bb08c.firebaseapp.com",
    projectId: "chat-app-bb08c",
    storageBucket: "chat-app-bb08c.appspot.com",
    messagingSenderId: "228697483193",
    appId: "1:228697483193:web:3968bfe9a9916f0734b868",
    measurementId: "G-E58MFVM8QF"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth }