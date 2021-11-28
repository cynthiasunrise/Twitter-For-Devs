import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDYggnqz4fy9xryIoOJsk_9tw15gdQS200',
  authDomain: 'acamica-on-fire.firebaseapp.com',
  projectId: 'acamica-on-fire',
  storageBucket: 'acamica-on-fire.appspot.com',
  messagingSenderId: '211210532250',
  appId: '1:211210532250:web:5292c76148cbaba5acb623',
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Firestore
export const firestore = firebase.firestore();
export const firestore_serverTimestamp =
  firebase.firestore.FieldValue.serverTimestamp();
export const firestore_documentId = firebase.firestore.FieldPath.documentId();

// Authentication
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const loginConGoogle = () => auth.signInWithPopup(provider);
export const logout = () => auth.signOut();

export default firebase;
