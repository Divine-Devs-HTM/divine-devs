// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTvMl4ZswstNWMFWQ2Av3L6DL3E1Fay0Q",
    authDomain: "divine-devs-htm.firebaseapp.com",
    projectId: "divine-devs-htm",
    storageBucket: "divine-devs-htm.appspot.com",
    messagingSenderId: "61306505083",
    appId: "1:61306505083:web:2b1ade05f5e47e14d65fde",
    measurementId: "G-KZJGBG0VCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);