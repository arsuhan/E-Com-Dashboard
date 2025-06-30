import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyBH_Kao2QtBlEM6GDYtaojr-MCfa8r_gb4",
    authDomain: "aminur-rahman-e9a27.firebaseapp.com",
    projectId: "aminur-rahman-e9a27",
    storageBucket: "aminur-rahman-e9a27.appspot.com",
    messagingSenderId: "1049898987850",
    appId: "1:1049898987850:web:a7ae6d3815d1c4ca00d1b3",
    measurementId: "G-HJM81V5DT4"

})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')


//import firebase from 'firebase'
//import firestore from 'firebase/firestore'

//import { initializeApp } from 'firebase/app'
//import { getFirestore, collection } from 'firebase/firestore'
//const firebaseConfig = {
//    apiKey: "AIzaSyBH_Kao2QtBlEM6GDYtaojr-MCfa8r_gb4",
//    authDomain: "aminur-rahman-e9a27.firebaseapp.com",
//    projectId: "aminur-rahman-e9a27",
//    storageBucket: "aminur-rahman-e9a27.appspot.com",
//    messagingSenderId: "1049898987850",
//    appId: "1:1049898987850:web:a7ae6d3815d1c4ca00d1b3",
//    measurementId: "G-HJM81V5DT4"
//};
// Initialize Firebase
//const firebaseApp = firebase.initializeApp(firebaseConfig);
//export default firebaseApp.firestore()