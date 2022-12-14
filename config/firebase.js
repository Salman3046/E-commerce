
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    // credentials
    apiKey: "AIzaSyCS1mYQcWyayB9-00z1dHxTfs9UiZ3iTk0",
    authDomain: "digikart-cd767.firebaseapp.com",
    projectId: "digikart-cd767",
    storageBucket: "digikart-cd767.appspot.com",
    messagingSenderId: "34853839536",
    appId: "1:34853839536:web:d1740bd473bc15a96f9175",
    measurementId: "G-RT68KCEKMK"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
