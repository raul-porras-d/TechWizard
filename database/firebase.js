import {getFirestore} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCYJyhwq9NhMrDNSL6yAtns-QuD-A2L4g",
    authDomain: "expotechwizard.firebaseapp.com",
    projectId: "expotechwizard",
    storageBucket: "expotechwizard.appspot.com",
    messagingSenderId: "478981468762",
    appId: "1:478981468762:web:9f5149cc3f7cbad2605e63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};