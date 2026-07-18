// ==========================
// FIREBASE CONFIG
// ==========================

// Firebase SDK
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "grapto-43823.firebaseapp.com",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "grapto-43823",
    storageBucket: "grapto-43823.firebasestorage.app",
    messagingSenderId: "80168453473",
    appId: "1:80168453473:web:97e36df4aa50cb60a2b120"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Database
const db = firebase.database();

// Storage
const storage = firebase.storage();

// Authentication
const auth = firebase.auth();

console.log("Firebase Connected Successfully");
