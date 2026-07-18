// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCMicdBRjjadd_zGXdI5WbxHaAaMd7-Pc",
  authDomain: "grapto-43823.firebaseapp.com",
  databaseURL: "https://grapto-43823-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "grapto-43823",
  storageBucket: "grapto-43823.firebasestorage.app",
  messagingSenderId: "80168453473",
  appId: "1:80168453473:web:97e36df4aa50cb60a2b120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

export { app, database };
