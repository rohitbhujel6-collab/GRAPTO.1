/* ==========================================================

   GRAPTO

   FIREBASE & BACKEND CORE

   Version : 3.2

   Cloudinary Enabled

========================================================== */

"use strict";

/* ==========================================================

   FIREBASE CONFIGURATION

========================================================== */

const firebaseConfig = {

    apiKey: "AIzaSyBCMicdBRjjadd_zGXdI5WbxHaAaMd7-Pc",

    authDomain:
    "grapto-43823.firebaseapp.com",

    databaseURL:
    "https://grapto-43823-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId:
    "grapto-43823",

    messagingSenderId:
    "80168453473",

    appId:
    "1:80168453473:web:97e36df4aa50cb60a2b120"

};

/* ==========================================================

   CLOUDINARY CONFIGURATION

========================================================== */

const CLOUDINARY = {

    cloudName: "iwpvy0yv",

    uploadPreset: "grapto_upload"

};

window.CLOUDINARY = CLOUDINARY;

/* ==========================================================

   FIREBASE INITIALIZATION

========================================================== */

if (!firebase.apps.length) {

    firebase.initializeApp(firebaseConfig);

}

const db = firebase.database();

const auth = firebase.auth();

/* ==========================================================

   GLOBAL EXPORTS

========================================================== */

window.db = db;

window.auth = auth;

console.log("GRAPTO Firebase initialized");

/* ==========================================================

   DATABASE ROOTS

========================================================== */

const WEBSITE_ROOT = "website";

const ROOT = {

    website: "website",

    settings: "website/settings",

    homepage: "website/homepage",

    services: "website/services",

    employers: "website/employers",

    candidates: "website/candidates",

    industries: "website/industries",

    jobs: "website/jobs",

    contact: "website/contact",

    enquiries: "website/enquiries",

    newsletter: "website/newsletter",

    visitors: "website/visitors",

    analytics: "website/analytics",

    hotels: "website/hotels",

    packages: "website/packages",

    homestays: "website/homestays",

    gallery: "website/gallery",

    testimonials: "website/testimonials"

};

window.WEBSITE_ROOT = WEBSITE_ROOT;

window.DB_ROOT = ROOT;

/* ==========================================================

   FIREBASE REFERENCES

========================================================== */

const refs = {

    settings:
    db.ref(ROOT.settings),

    homepage:
    db.ref(ROOT.homepage),

    services:
    db.ref(ROOT.services),

    employers:
    db.ref(ROOT.employers),

    candidates:
    db.ref(ROOT.candidates),

    industries:
    db.ref(ROOT.industries),

    jobs:
    db.ref(ROOT.jobs),

    hotels:
    db.ref(ROOT.hotels),

    homestays:
    db.ref(ROOT.homestays),

    packages:
    db.ref(ROOT.packages),

    gallery:
    db.ref(ROOT.gallery),

    testimonials:
    db.ref(ROOT.testimonials),

    enquiries:
    db.ref(ROOT.enquiries),

    newsletter:
    db.ref(ROOT.newsletter),

    visitors:
    db.ref(ROOT.visitors),

    analytics:
    db.ref(ROOT.analytics)

};

window.refs = refs;/* ==========================================================

   DATABASE HELPERS

========================================================== */

function createReference(path){

    return db.ref(path);

}

function generateKey(path){

    return db.ref(path).push().key;

}

window.createReference = createReference;

window.generateKey = generateKey;

/* ==========================================================

   FIREBASE CRUD HELPERS

========================================================== */

async function saveData(path, data) {

    try {

        await db.ref(path).set(data);

        return {

            success: true,

            message: "Data saved successfully."

        };

    }

    catch (error) {

        console.error("Save failed:", error);

        return {

            success: false,

            message: error.message

        };

    }

}

async function updateData(path, data) {

    try {

        await db.ref(path).update(data);

        return true;

    }

    catch (error) {

        console.error("Update failed:", error);

        return false;

    }

}

async function deleteData(path) {

    try {

        await db.ref(path).remove();

        return true;

    }

    catch (error) {

        console.error("Delete failed:", error);

        return false;

    }

}

async function readData(path) {

    try {

        const snapshot = await db.ref(path).once("value");

        return snapshot.val();

    }

    catch (error) {

        console.error("Read failed:", error);

        return null;

    }

}

async function pushData(path, data) {

    try {

        const ref = db.ref(path).push();

        await ref.set(data);

        return ref.key;

    }

    catch (error) {

        console.error("Push failed:", error);

        return null;

    }

}

window.saveData = saveData;

window.updateData = updateData;

window.deleteData = deleteData;

window.readData = readData;

window.pushData = pushData;/* ==========================================================

   CLOUDINARY IMAGE UPLOAD

========================================================== */

async function uploadImage(file, folder = "grapto") {

    if (!file) {

        return {

            success: false,

            message: "Please select an image."

        };

    }

    if (!file.type || !file.type.startsWith("image/")) {

        return {

            success: false,

            message: "Only image files are allowed."

        };

    }

    try {

        const formData = new FormData();

        formData.append("file", file);

        formData.append(
            "upload_preset",
            CLOUDINARY.uploadPreset
        );

        formData.append(
            "folder",
            folder
        );

        const response = await fetch(

            `https://api.cloudinary.com/v1_1/${CLOUDINARY.cloudName}/image/upload`,

            {

                method: "POST",

                body: formData

            }

        );

        const result = await response.json();

        if (!response.ok) {

            throw new Error(

                result.error?.message ||

                "Cloudinary upload failed."

            );

        }

        console.log(

            "Cloudinary Upload Successful:",

            result.secure_url

        );

        return {

            success: true,

            url: result.secure_url,

            public_id: result.public_id,

            original_filename: result.original_filename,

            width: result.width,

            height: result.height,

            format: result.format,

            bytes: result.bytes

        };

    }

    catch (error) {

        console.error(

            "Cloudinary Upload Error:",

            error

        );

        return {

            success: false,

            message: error.message

        };

    }

}

window.uploadImage = uploadImage;/* ==========================================================

   GOOGLE FORM LINKS

========================================================== */

const GOOGLE_FORMS = {

    candidate: "",

    employer: "",

    contact: ""

};

window.GOOGLE_FORMS = GOOGLE_FORMS;

function openCandidateForm() {

    if (!GOOGLE_FORMS.candidate) {

        console.warn(
            "Candidate form not configured."
        );

        return;

    }

    window.open(
        GOOGLE_FORMS.candidate,
        "_blank"
    );

}

function openEmployerForm() {

    if (!GOOGLE_FORMS.employer) {

        console.warn(
            "Employer form not configured."
        );

        return;

    }

    window.open(
        GOOGLE_FORMS.employer,
        "_blank"
    );

}

function openContactForm() {

    if (!GOOGLE_FORMS.contact) {

        console.warn(
            "Contact form not configured."
        );

        return;

    }

    window.open(
        GOOGLE_FORMS.contact,
        "_blank"
    );

}

window.openCandidateForm =
openCandidateForm;

window.openEmployerForm =
openEmployerForm;

window.openContactForm =
openContactForm;

function watchGoogleForms() {

    db.ref(
        "website/settings/googleForms"
    ).on(

        "value",

        snapshot => {

            const data =
            snapshot.val() || {};

            GOOGLE_FORMS.candidate =
            data.candidate || "";

            GOOGLE_FORMS.employer =
            data.employer || "";

            GOOGLE_FORMS.contact =
            data.contact || "";

            window.dispatchEvent(

                new CustomEvent(

                    "grapto:googleFormsUpdated",

                    {

                        detail:
                        GOOGLE_FORMS

                    }

                )

            );

        },

        error => {

            console.error(

                "Google form loading failed:",

                error

            );

        }

    );

}

/* ==========================================================

   ANALYTICS

========================================================== */

function logVisitor(page = "home") {

    const data = {

        page,

        userAgent:
        navigator.userAgent,

        language:
        navigator.language,

        platform:
        navigator.platform,

        time:
        new Date().toISOString()

    };

    db.ref(
        ROOT.visitors
    ).push(data);

}

window.logVisitor = logVisitor;/* ==========================================================

   DEFAULT SETTINGS

========================================================== */

const DEFAULT_SETTINGS = {

    websiteName:
    "GRAPTO",

    tagline:
    "Connecting Talent. Empowering Businesses.",

    version:
    "3.2",

    theme:
    "default",

    lastUpdated:
    new Date().toISOString()

};

window.DEFAULT_SETTINGS =
DEFAULT_SETTINGS;

/* ==========================================================

   WEBSITE INITIALIZATION

========================================================== */

async function initializeWebsite() {

    try {

        const snapshot =
        await refs.settings.once(
            "value"
        );

        if (!snapshot.exists()) {

            await refs.settings.set(
                DEFAULT_SETTINGS
            );

            console.log(
                "Default settings created."
            );

        }

    }

    catch (error) {

        console.error(
            "Website initialization failed:",
            error
        );

    }

}

window.initializeWebsite =
initializeWebsite;

/* ==========================================================

   FIREBASE CONNECTION CHECK

========================================================== */

async function testFirebaseConnection() {

    try {

        await db.ref(
            ".info/connected"
        ).once("value");

        console.log(
            "Firebase connection verified."
        );

        return true;

    }

    catch (error) {

        console.error(
            "Firebase connection failed:",
            error
        );

        return false;

    }

}

window.testFirebaseConnection =
testFirebaseConnection;

/* ==========================================================

   APPLICATION STARTUP

========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        console.log(
            "========================================"
        );

        console.log(
            " GRAPTO Backend Core Loaded"
        );

        console.log(
            "========================================"
        );

        console.log(
            "Project:",
            firebaseConfig.projectId
        );

        console.log(
            "Realtime Database: Ready"
        );

        console.log(
            "Authentication: Ready"
        );

        console.log(
            "Cloudinary: Ready"
        );

        await testFirebaseConnection();

        await initializeWebsite();

        watchGoogleForms();

        console.log(
            "Backend initialization complete."
        );

        console.log(
            "========================================"
        );

    }

);
