// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCUHOVuXmtTi9B_H4FE4eG2XMMdct5idRk",
	authDomain: "task-manager-de726.firebaseapp.com",
	projectId: "task-manager-de726",
	storageBucket: "task-manager-de726.appspot.com",
	messagingSenderId: "857750967079",
	appId: "1:857750967079:web:70a363555c1bb67b12cf02",
	measurementId: "G-5VRDDKQ3HZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (process.env.NODE_ENV !== "test") getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
