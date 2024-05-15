// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG61I0079souLbNK-qYjz449ZDg1Gbnxg",
  authDomain: "proyectopracticas-da612.firebaseapp.com",
  databaseURL: "https://proyectopracticas-da612-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "proyectopracticas-da612",
  storageBucket: "gs://proyectopracticas-da612.appspot.com",
  messagingSenderId: "292607214768e",
  appId: "1:462142691687:web:f9e49ac81c7152d3f377c2"
};

const app = firebase.initializeApp(firebaseConfig);

// Obtén una referencia al servicio de autenticación
const auth = firebase.auth();

const firestore = firebase.firestore();

export { app, auth, firestore };