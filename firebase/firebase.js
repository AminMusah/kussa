// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// Adjust the path as necessary
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUQ-1lIlMV27XdBT39HAhehMxi-RQKEec",
  authDomain: "kussa-f4fb1.firebaseapp.com",
  projectId: "kussa-f4fb1",
  storageBucket: "kussa-f4fb1.appspot.com",
  messagingSenderId: "18654952719",
  appId: "1:18654952719:web:00280b73c8b809e37fd27a",
  measurementId: "G-VS03TG2DVR",
};

// Initialize Firebase

let app = null;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export default firebase;
