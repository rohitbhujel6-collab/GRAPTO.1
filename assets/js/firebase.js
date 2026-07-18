/* ==========================================================
   GRAPTO
   FIREBASE INITIALIZATION
   Version : 1.0
   ========================================================== */

/* Firebase SDK */

const firebaseConfig = {

    apiKey: "AIzaSyBCMicdBRjjadd_zGXdI5WbxHaAaMd7-Pc",

    authDomain: "grapto-43823.firebaseapp.com",

    databaseURL: "https://grapto-43823-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "grapto-43823",

    storageBucket: "grapto-43823.firebasestorage.app",

    messagingSenderId: "80168453473",

    appId: "1:80168453473:web:97e36df4aa50cb60a2b120"

};

/* Initialize Firebase */

firebase.initializeApp(firebaseConfig);

/* Services */

const db = firebase.database();

const auth = firebase.auth();

const storage = firebase.storage();

/* Global Access */

window.db = db;

window.auth = auth;

window.storage = storage;

/* Connection Check */

console.log("===================================");

console.log("GRAPTO Firebase Connected");

console.log("Project : grapto-43823");

console.log("Database Ready");

console.log("Authentication Ready");

console.log("Storage Ready");

console.log("===================================");
