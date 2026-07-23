/* ==========================================
   GRAPTO Public Website Controller
========================================== */

"use strict";

const GRAPTO = {

    init() {

        if (!window.db) {
            console.error("Firebase not loaded.");
            return;
        }

        this.watchContent();
        this.bindFormButtons();

    },

    watchContent() {

        db.ref("website").on("value", snapshot => {

            const website = snapshot.val() || {};

            this.renderHero(website.homepage || {});
            this.renderAbout(website.about || {});
            this.renderEmployers(website.employers || {});
            this.renderCandidates(website.candidates || {});
            this.renderFooter(website.contact || {});
            this.renderMedia(website.media || {});
            this.applyForms({
    employer: {
        url: website.applications?.employer?.googleForm || "",
        text: website.applications?.employer?.buttonText || "Hire Talent"
    },
    candidate: {
        url: website.applications?.candidate?.googleForm || "",
        text: website.applications?.candidate?.buttonText || "Apply Now"
    }
});

        }, error => {

            console.error("Website data could not be loaded.", error);

        });

    },

    text(selector, value) {

        const element = document.querySelector(selector);

        if (element && value !== undefined && value !== null && value !== "") {

            element.textContent = value;

        }

    },

    image(selector, url) {

        const img = document.querySelector(selector);

        if (img && url) {

            img.src = url;

        }

    },

    link(id, url, fallback = "#") {

        const button = document.getElementById(id);

        if (!button) return;

        button.href = url || fallback;

        if (url) {

            button.target = "_blank";
            button.rel = "noopener noreferrer";

        } else {

            button.removeAttribute("target");
            button.removeAttribute("rel");

        }

    },

    renderHero(hero) {

        this.text(".hero-tag", hero.tag);

        this.text(".hero-content h1", hero.heading);

        this.text(".hero-content p", hero.description);

        this.text("#hireTalentBtn", hero.primaryButtonText);

        this.text("#findJobsBtn", hero.secondaryButtonText);

        this.link(
            "hireTalentBtn",
            hero.primaryButtonLink,
            "#employers"
        );

        this.link(
            "findJobsBtn",
            hero.secondaryButtonLink,
            "#candidates"
        );

        if (hero.imageUrl) {

            this.image(".hero-image img", hero.imageUrl);

        }

    },

    renderAbout(data) {

        this.text("#about .section-title", data.heading);

        this.text("#about .section-description", data.description);

        if (data.imageUrl) {

            this.image("#about img", data.imageUrl);

        }

    },

    renderEmployers(data) {

        const section = document.getElementById("employers");

        if (!section) return;

        this.text("#employers .section-title", data.heading);

        this.text("#employers .section-description", data.description);

        const btn = section.querySelector(".btn");

        if (btn) {

            if (data.buttonText) btn.textContent = data.buttonText;

            if (data.buttonLink) {

                btn.href = data.buttonLink;

                btn.target = "_blank";

            }

        }

        if (data.imageUrl) {

            this.image("#employers img", data.imageUrl);

        }

    },

    renderCandidates(data) {

        const section = document.getElementById("candidates");

        if (!section) return;

        this.text("#candidates .section-title", data.heading);

        this.text("#candidates .section-description", data.description);

        const btn = section.querySelector(".btn");

        if (btn) {

            if (data.buttonText) btn.textContent = data.buttonText;

            if (data.buttonLink) {

                btn.href = data.buttonLink;

                btn.target = "_blank";

            }

        }

        if (data.imageUrl) {

            this.image("#candidates img", data.imageUrl);

        }

    },

    renderFooter(data) {

        this.text("footer h3", data.companyName);

        const p = document.querySelectorAll("footer p");

        if (p[0] && data.address)
            p[0].innerHTML = data.address.replace(/\n/g, "<br>");

        if (p[1] && data.phone)
            p[1].innerHTML = "Phone<br>" + data.phone;

        if (p[2] && data.email)
            p[2].innerHTML = "Email<br>" + data.email;

        const socials = {

            facebookLink: data.facebookUrl,

            instagramLink: data.instagramUrl,

            linkedinLink: data.linkedinUrl,

            youtubeLink: data.youtubeUrl

        };

        Object.entries(socials).forEach(([id, url]) => {

            const a = document.getElementById(id);

            if (a && url) {

                a.href = url;

            }

        });

    },

    renderMedia(media) {

        if (media.logoUrl)
            this.image(".logo img", media.logoUrl);

        if (media.heroImageUrl)
            this.image(".hero-image img", media.heroImageUrl);

        if (media.aboutImageUrl)
            this.image("#about img", media.aboutImageUrl);

        if (media.employerBannerUrl)
            this.image("#employers img", media.employerBannerUrl);

        if (media.candidateBannerUrl)
            this.image("#candidates img", media.candidateBannerUrl);

    },

    applyForms(forms) {

    const employerContainer =
        document.getElementById("employerFormContainer");

    const candidateContainer =
        document.getElementById("candidateFormContainer");

    if (employerContainer && forms.employer.url) {

        employerContainer.innerHTML = `
            <a href="${forms.employer.url}"
               class="btn btn-primary"
               target="_blank"
               rel="noopener noreferrer">
               ${forms.employer.text}
            </a>
        `;

    }

    if (candidateContainer && forms.candidate.url) {

        candidateContainer.innerHTML = `
            <a href="${forms.candidate.url}"
               class="btn btn-primary"
               target="_blank"
               rel="noopener noreferrer">
               ${forms.candidate.text}
            </a>
        `;

    }

},
   
    bindFormButtons() {

        window.addEventListener(

            "grapto:googleFormsUpdated",

            e => this.applyForms(e.detail)

        );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => GRAPTO.init()

);
