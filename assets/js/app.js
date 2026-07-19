/* GRAPTO public website controller */
"use strict";

const GRAPTO = {
    init() {
        if (!window.db) {
            console.error("Firebase did not load. Check that firebase.js is included before app.js.");
            return;
        }
        this.watchContent();
        this.bindFormButtons();
    },

    watchContent() {
        db.ref("website").on("value", snapshot => {
            const website = snapshot.val() || {};
            this.renderHero(website.homepage || {});
            this.renderSection("about", website.about || {});
            this.renderSection("employers", website.employers || {});
            this.renderSection("candidates", website.candidates || {});
            this.renderFooter(website.contact || {});
            this.renderMedia(website.media || {});
            this.applyForms(website.settings?.googleForms || {});
        }, error => console.error("Could not load website content:", error));
    },

    text(selector, value) {
        const element = document.querySelector(selector);
        if (element && value) element.textContent = value;
    },

    setImage(selector, url) {
        const image = document.querySelector(selector);
        if (image && url) image.src = url;
    },

    setLink(id, url, fallback) {
        const button = document.getElementById(id);
        if (!button) return;
        button.href = url || fallback;
        if (url) {
            button.target = "_blank";
            button.rel = "noopener noreferrer";
        } else {
            button.removeAttribute("target");
        }
    },

    renderHero(hero) {
        this.text(".hero-tag", hero.tag);
        this.text(".hero-content h1", hero.heading);
        this.text(".hero-content p", hero.description);
        this.text("#hireTalentBtn", hero.primaryButtonText);
        this.text("#findJobsBtn", hero.secondaryButtonText);
        this.setLink("hireTalentBtn", hero.primaryButtonLink, "#employers");
        this.setLink("findJobsBtn", hero.secondaryButtonLink, "#candidates");
        this.setImage(".hero-image img", hero.imageUrl);
    },

    renderSection(name, data) {
        const section = document.getElementById(name);
        if (!section) return;
        this.text(`#${name} .section-title`, data.heading);
        this.text(`#${name} .section-description`, data.description);
        const button = section.querySelector(".btn");
        if (button && data.buttonText) button.textContent = data.buttonText;
        if (button && data.buttonLink) {
            button.href = data.buttonLink;
            button.target = "_blank";
            button.rel = "noopener noreferrer";
        }
        if (data.imageUrl) {
            let image = section.querySelector("img");
            if (!image) {
                image = document.createElement("img");
                image.alt = `${name} banner`;
                image.className = "dynamic-section-image";
                section.querySelector(".placeholder-box")?.prepend(image);
            }
            image.src = data.imageUrl;
        }
    },

    renderFooter(data) {
        this.text("footer h3", data.companyName);
        const footerParagraphs = document.querySelectorAll("footer p");
        if (footerParagraphs[0] && data.address) footerParagraphs[0].innerHTML = data.address.replace(/\n/g, "<br>");
        if (footerParagraphs[1] && data.phone) footerParagraphs[1].innerHTML = `Phone<br>${data.phone}`;
        if (footerParagraphs[2] && data.email) footerParagraphs[2].innerHTML = `Email<br>${data.email}`;
        const links = { facebookLink: data.facebookUrl, instagramLink: data.instagramUrl, linkedinLink: data.linkedinUrl, youtubeLink: data.youtubeUrl };
        Object.entries(links).forEach(([id, url]) => { if (url) document.getElementById(id).href = url; });
    },

    renderMedia(media) {
        this.setImage(".logo img", media.logoUrl);
        this.setImage(".hero-image img", media.heroImageUrl);
    },

    applyForms(forms) {
        this.setLink("employerFormBtn", forms.employer, "#contact");
        this.setLink("candidateFormBtn", forms.candidate, "#contact");
        if (!document.getElementById("hireTalentBtn")?.getAttribute("href")?.startsWith("http")) this.setLink("hireTalentBtn", forms.employer, "#employers");
        if (!document.getElementById("findJobsBtn")?.getAttribute("href")?.startsWith("http")) this.setLink("findJobsBtn", forms.candidate, "#candidates");
    },

    bindFormButtons() {
        window.addEventListener("grapto:googleFormsUpdated", event => this.applyForms(event.detail));
    }
};

document.addEventListener("DOMContentLoaded", () => GRAPTO.init());
