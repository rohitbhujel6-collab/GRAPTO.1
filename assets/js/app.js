/* ==========================================================
   GRAPTO
   WEBSITE APPLICATION
   Version : 1.0
   ========================================================== */

"use strict";

/* ==========================================================
   APPLICATION
   ========================================================== */

const GRAPTO = {

    init() {

        console.log("==================================");
        console.log("GRAPTO Website Started");
        console.log("==================================");

        this.firebase();

        this.events();

    },

    /* ====================================================== */

    firebase() {

        if (typeof window.db === "undefined") {

            console.error("Firebase Database Not Connected");

            return;

        }

        console.log("Firebase Database Connected");

    },

    /* ====================================================== */

    events() {

        console.log("Website Events Loaded");

    }

};

/* ==========================================================
   START APPLICATION
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    GRAPTO.init();

});
