import firebase from 'firebase/app';
import 'firebase/firestore';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Exporta la funcionalidad de la base de datos
export const firestore = firebase.firestore();
// Exporta el paquete firebase para otros usos
export default firebase;
