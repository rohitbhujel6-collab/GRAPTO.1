/* GRAPTO admin controller */
"use strict";

const Admin = {
paths: {
    hero: "website/homepage",
    about: "website/about",

    services: "website/services",
    industries: "website/industries",

    employers: "website/employers",
    candidates: "website/candidates",

    contact: "website/contact",
    settings: "website/settings",
    media: "website/media",
    partners: "website/partners"
},
    
    init() {
        if (!window.db || !window.storage) {
            this.toast("Error", "Firebase did not load. Check the SDK and firebase.js script tags.", true);
            return;
        }
        this.removeDuplicateMediaSection();
        this.bindNavigation();
        this.bindUploadBoxes();
        this.bindSaves();
        this.loadAll();
    },

    q(id) { return document.getElementById(id); },
    value(id) { return this.q(id)?.value.trim() || ""; },
    setValue(id, value) { const input = this.q(id); if (input) input.value = value || ""; },

    toast(title, message, isError = false) {
        const box = this.q(isError ? "errorToast" : "toast");
        this.q(isError ? "errorToastTitle" : "toastTitle").textContent = title;
        this.q(isError ? "errorToastMessage" : "toastMessage").textContent = message;
        box?.classList.add("show");
        setTimeout(() => box?.classList.remove("show"), 4000);
    },

    async save(path, data, successMessage) {
        const result = await saveData(path, { ...data, updatedAt: new Date().toISOString() });
        if (result.success) this.toast("Saved", successMessage);
        else this.toast("Save failed", result.message || "Please try again.", true);
        return result.success;
    },

    async upload(inputId, folder, existingUrl = "") {
        const file = this.q(inputId)?.files?.[0];
        if (!file) return existingUrl;
        const result = await uploadImage(file, `grapto/${folder}`);
        if (!result.success) throw new Error(result.message);
        return result.url;
    },

    preview(input, previewId) {
        const file = input.files?.[0];
        const preview = this.q(previewId);
        if (!file || !preview) return;
        preview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Selected image">`;
    },

    bindNavigation() {
        document.querySelectorAll("[data-page]").forEach(link => link.addEventListener("click", event => {
            event.preventDefault();
            const page = link.dataset.page;
            document.querySelectorAll(".admin-page").forEach(section => section.style.display = section.id === page ? "block" : "none");
            document.querySelectorAll("[data-page]").forEach(item => item.classList.toggle("active", item === link));
            this.q("dashboard")?.style.setProperty("display", page === "dashboard" ? "block" : "none");
            const title = link.querySelector("span")?.textContent || "Dashboard";
            document.querySelector(".page-title").textContent = title;
        }));
    },

    bindUploadBoxes() {
        const map = {
            heroImage: "heroPreview", aboutImage: "aboutPreview", employerBanner: "employerBannerPreview",
            candidateBanner: "candidateBannerPreview", partnerLogo: "partnerLogoPreview", websiteLogo: "websiteLogoPreview",
            mediaHeroImage: "mediaHeroPreview", mediaAboutImage: "mediaAboutPreview", mediaEmployerBanner: "mediaEmployerPreview",
            mediaCandidateBanner: "mediaCandidatePreview", mediaPartnerLogo: "mediaPartnerPreview", websiteFavicon: "faviconPreview", primaryLogo: "primaryLogoPreview"
        };
        Object.entries(map).forEach(([inputId, previewId]) => {
            const input = this.q(inputId);
            input?.closest(".form-group")?.querySelector(".upload-box")?.addEventListener("click", () => input.click());
            input?.addEventListener("change", () => this.preview(input, previewId));
        });
    },

    bindSaves() {
    this.q("saveHero")?.addEventListener("click", () => this.saveHero());

    this.q("saveAbout")?.addEventListener("click", () => this.saveAbout());

    this.q("saveServices")?.addEventListener("click", () => this.saveServices());

    this.q("saveIndustries")?.addEventListener("click", () => this.saveIndustries());

    this.q("saveEmployers")?.addEventListener("click", () => this.saveEmployers());

    this.q("saveCandidates")?.addEventListener("click", () => this.saveCandidates());

    this.q("saveFooter")?.addEventListener("click", () => this.saveFooter());

    this.q("saveSettings")?.addEventListener("click", () => this.saveSettings());

    this.q("saveMedia")?.addEventListener("click", () => this.saveMedia());

    this.q("savePartner")?.addEventListener("click", () => this.savePartner());
},
    async saveHero() {
        try {
            const old = await readData(this.paths.hero) || {};
            const imageUrl = await this.upload("heroImage", "hero", old.imageUrl);
            await this.save(this.paths.hero, { tag: this.value("heroTag"), heading: this.value("heroHeading"), description: this.value("heroDescription"), primaryButtonText: this.value("heroPrimaryButton"), primaryButtonLink: this.value("heroPrimaryLink"), secondaryButtonText: this.value("heroSecondaryButton"), secondaryButtonLink: this.value("heroSecondaryLink"), imageUrl }, "Hero section updated.");
        } catch (error) { this.toast("Upload failed", error.message, true); }
    },

    async saveAbout() {
        try {
            const old = await readData(this.paths.about) || {};
            const imageUrl = await this.upload("aboutImage", "about", old.imageUrl);
            await this.save(this.paths.about, { heading: this.value("aboutHeading"), description: this.value("aboutDescription"), imageUrl }, "About section updated.");
        } catch (error) { this.toast("Upload failed", error.message, true); }
    },

    async saveServices() {
    await this.save(
        this.paths.services,
        {
            heading: this.value("serviceHeading"),
            description: this.value("serviceDescription")
        },
        "Services section updated."
    );
},

async saveIndustries() {
    await this.save(
        this.paths.industries,
        {
            heading: this.value("industryHeading"),
            description: this.value("industryDescription")
        },
        "Industries section updated."
    );
},
    
    async saveEmployers() {
        try {
            const old = await readData(this.paths.employers) || {};
            const imageUrl = await this.upload("employerBanner", "employers", old.imageUrl);
            const saved = await this.save(this.paths.employers, { heading: this.value("employerHeading"), description: this.value("employerDescription"), buttonText: this.value("employerButtonText"), buttonLink: this.value("employerButtonLink"), imageUrl }, "Employers section updated.");
            if (saved) await this.save("website/settings/googleForms", { ...(await readData("website/settings/googleForms") || {}), employer: this.value("employerGoogleForm") }, "Employer form link updated.");
        } catch (error) { this.toast("Upload failed", error.message, true); }
    },

    async saveCandidates() {
        try {
            const old = await readData(this.paths.candidates) || {};
            const imageUrl = await this.upload("candidateBanner", "candidates", old.imageUrl);
            const saved = await this.save(this.paths.candidates, { heading: this.value("candidateHeading"), description: this.value("candidateDescription"), buttonText: this.value("candidateButtonText"), buttonLink: this.value("candidateButtonLink"), imageUrl }, "Candidates section updated.");
            if (saved) await this.save("website/settings/googleForms", { ...(await readData("website/settings/googleForms") || {}), candidate: this.value("candidateGoogleForm") }, "Candidate form link updated.");
        } catch (error) { this.toast("Upload failed", error.message, true); }
    },

    async saveFooter() {
        await this.save(this.paths.contact, { companyName: this.value("companyName"), phone: this.value("companyPhone"), email: this.value("companyEmail"), address: this.value("companyAddress"), facebookUrl: this.value("facebookUrl"), instagramUrl: this.value("instagramUrl"), linkedinUrl: this.value("linkedinUrl"), youtubeUrl: this.value("youtubeUrl"), whatsappNumber: this.value("whatsappNumber"), googleMapsLink: this.value("googleMapsLink") }, "Footer updated.");
    },

    async saveSettings() {
        await this.save(this.paths.settings, { ...(await readData(this.paths.settings) || {}), websiteName: this.value("websiteTitle"), tagline: this.value("websiteTagline"), adminEmail: this.value("adminEmail"), supportEmail: this.value("supportEmail"), metaDescription: this.value("metaDescription"), maintenanceMode: this.value("maintenanceMode"), defaultLanguage: this.value("defaultLanguage") }, "Settings updated.");
    },

    async saveMedia() {
        try {
            const old = await readData(this.paths.media) || {};
            const media = {
                logoUrl: await this.upload("websiteLogo", "media", old.logoUrl),
                heroImageUrl: await this.upload("mediaHeroImage", "media", old.heroImageUrl),
                aboutImageUrl: await this.upload("mediaAboutImage", "media", old.aboutImageUrl),
                employerBannerUrl: await this.upload("mediaEmployerBanner", "media", old.employerBannerUrl),
                candidateBannerUrl: await this.upload("mediaCandidateBanner", "media", old.candidateBannerUrl)
            };
            await this.save(this.paths.media, media, "Media library updated.");
        } catch (error) { this.toast("Upload failed", error.message, true); }
    },

    async savePartner() {
        try {
            const logoUrl = await this.upload("partnerLogo", "partners");
            if (!this.value("partnerName")) return this.toast("Missing name", "Enter a partner name first.", true);
            const key = generateKey(this.paths.partners);
            await this.save(`${this.paths.partners}/${key}`, { name: this.value("partnerName"), website: this.value("partnerWebsite"), logoUrl, active: true }, "Partner added.");
        } catch (error) { this.toast("Upload failed", error.message, true); }
    },

    async loadAll() {
        const [hero, about, services, industries, employers, candidates, contact, settings, media, forms] = await Promise.all([
        readData(this.paths.hero),
        readData(this.paths.about),
        readData(this.paths.services),
        readData(this.paths.industries),
        readData(this.paths.employers),
        readData(this.paths.candidates),
        readData(this.paths.contact),
        readData(this.paths.settings),
        readData(this.paths.media),
        readData("website/settings/googleForms")
    ]);

    this.fill(hero, {
        heroTag: "tag",
        heroHeading: "heading",
        heroDescription: "description",
        heroPrimaryButton: "primaryButtonText",
        heroPrimaryLink: "primaryButtonLink",
        heroSecondaryButton: "secondaryButtonText",
        heroSecondaryLink: "secondaryButtonLink"
    });

    this.fill(about, {
        aboutHeading: "heading",
        aboutDescription: "description"
    });

    this.fill(services, {
        serviceHeading: "heading",
        serviceDescription: "description"
    });

    this.fill(industries, {
        industryHeading: "heading",
        industryDescription: "description"
    });

    this.fill(employers, {
        employerHeading: "heading",
        employerDescription: "description",
        employerButtonText: "buttonText",
        employerButtonLink: "buttonLink"
    });

    this.fill(candidates, {
        candidateHeading: "heading",
        candidateDescription: "description",
        candidateButtonText: "buttonText",
        candidateButtonLink: "buttonLink"
    });

    this.fill(contact, {
        companyName: "companyName",
        companyPhone: "phone",
        companyEmail: "email",
        companyAddress: "address",
        facebookUrl: "facebookUrl",
        instagramUrl: "instagramUrl",
        linkedinUrl: "linkedinUrl",
        youtubeUrl: "youtubeUrl",
        whatsappNumber: "whatsappNumber",
        googleMapsLink: "googleMapsLink"
    });

    this.fill(settings, {
        websiteTitle: "websiteName",
        websiteTagline: "tagline",
        adminEmail: "adminEmail",
        supportEmail: "supportEmail",
        metaDescription: "metaDescription",
        maintenanceMode: "maintenanceMode",
        defaultLanguage: "defaultLanguage"
    });

    this.fill(forms, {
        employerGoogleForm: "employer",
        candidateGoogleForm: "candidate"
    });

    this.showStoredPreview("heroPreview", hero?.imageUrl);
    this.showStoredPreview("aboutPreview", about?.imageUrl);
    this.showStoredPreview("employerBannerPreview", employers?.imageUrl);
    this.showStoredPreview("candidateBannerPreview", candidates?.imageUrl);
    this.showStoredPreview("websiteLogoPreview", media?.logoUrl);
}

    fill(data, map) { Object.entries(map).forEach(([id, key]) => this.setValue(id, data?.[key])); },
    showStoredPreview(id, url) { if (url && this.q(id)) this.q(id).innerHTML = `<img src="${url}" alt="Saved image">`; },
    removeDuplicateMediaSection() { document.querySelectorAll("section#media").forEach((section, index) => { if (index > 0) section.remove(); }); }
};

document.addEventListener("DOMContentLoaded", () => Admin.init());
