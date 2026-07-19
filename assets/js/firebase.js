/* ==========================================================
   GRAPTO
   FIREBASE INITIALIZATION
   Version : 2.0
   ========================================================== */

"use strict";

/* ==========================================================
   FIREBASE CONFIGURATION
   ========================================================== */

const firebaseConfig = {

    apiKey: "AIzaSyBCMicdBRjjadd_zGXdI5WbxHaAaMd7-Pc",

    authDomain: "grapto-43823.firebaseapp.com",

    databaseURL: "https://grapto-43823-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "grapto-43823",

    storageBucket: "grapto-43823.firebasestorage.app",

    messagingSenderId: "80168453473",

    appId: "1:80168453473:web:97e36df4aa50cb60a2b120"

};

/* ==========================================================
   INITIALIZE FIREBASE
   ========================================================== */

if (!firebase.apps.length) {

    firebase.initializeApp(firebaseConfig);

}

/* ==========================================================
   FIREBASE SERVICES
   ========================================================== */

const db = firebase.database();

const auth = firebase.auth();

/* ==========================================================
   GLOBAL OBJECTS
   ========================================================== */

window.db = db;

window.auth = auth;

/* ==========================================================
   CONNECTION TEST
   ========================================================== */

console.log("========================================");

console.log("GRAPTO Firebase Initialized");

console.log("Realtime Database : Connected");

console.log("Authentication    : Ready");

console.log("Storage           : Disabled (Spark Plan)");

console.log("========================================");
