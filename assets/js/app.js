/* ==========================================================
   GRAPTO
   WEBSITE APPLICATION
   Version : 1.0
   ========================================================== */

"use strict";

/* ==========================================================
   MAIN APPLICATION
   ========================================================== */

const GRAPTO = {

    /* ==========================================
       START APPLICATION
    ========================================== */

    init() {

        console.log("========================================");
        console.log("GRAPTO Website Started");
        console.log("========================================");

        this.checkFirebase();

        this.loadWebsite();

        this.bindEvents();

    },

    /* ==========================================
       FIREBASE CHECK
    ========================================== */

    checkFirebase() {

        if (!window.db) {

            console.error("Firebase Database Not Connected");

            return;

        }

        console.log("Firebase Database Connected");

    },

    /* ==========================================
       LOAD WEBSITE
    ========================================== */

    loadWebsite() {

        console.log("Loading Website Data...");

        /*
        Future Versions

        Hero

        About

        Services

        Industries

        Employers

        Candidates

        Partners

        Contact

        Social

        */

    },

    /* ==========================================
       EVENTS
    ========================================== */

    bindEvents() {

        console.log("Website Events Ready");

    }

};

/* ==========================================================
   START
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    GRAPTO.init();

});
