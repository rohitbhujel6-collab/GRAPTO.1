/* GRAPTO admin controller */
"use strict";

const Admin = {

    paths: {
        hero: "website/homepage",
        about: "website/about",

        services: "website/services",
        industries: "website/industries",

        employers: "website/employers",

        settings: "website/settings",
        media: "website/media",
        partners: "website/partners"
    },

    init() {

        if (!window.db || !window.storage) {
            this.toast(
                "Error",
                "Firebase did not load. Check firebase configuration.",
                true
            );
            return;
        }

        this.removeDuplicateMediaSection();

        this.bindNavigation();
        this.bindUploadBoxes();
        this.bindSaves();

        this.loadAll();
    },

    q(id) {
        return document.getElementById(id);
    },

    value(id) {
        return this.q(id)?.value.trim() || "";
    },

    setValue(id, value) {
        const el = this.q(id);
        if (el) el.value = value || "";
    },

    toast(title, message, isError = false) {

        const box = this.q(isError ? "errorToast" : "toast");

        this.q(
            isError ? "errorToastTitle" : "toastTitle"
        ).textContent = title;

        this.q(
            isError ? "errorToastMessage" : "toastMessage"
        ).textContent = message;

        box?.classList.add("show");

        setTimeout(() => {
            box?.classList.remove("show");
        }, 4000);
    },

    async save(path, data, successMessage) {

        const result = await saveData(path, {
            ...data,
            updatedAt: new Date().toISOString()
        });

        if (result.success) {
            this.toast("Saved", successMessage);
        } else {
            this.toast(
                "Save Failed",
                result.message || "Please try again.",
                true
            );
        }

        return result.success;
    },

    async upload(inputId, folder, existingUrl = "") {

        const file = this.q(inputId)?.files?.[0];

        if (!file) return existingUrl;

        const result = await uploadImage(
            file,
            `grapto/${folder}`
        );

        if (!result.success) {
            throw new Error(result.message);
        }

        return result.url;
    },

    preview(input, previewId) {

        const file = input.files?.[0];
        const preview = this.q(previewId);

        if (!file || !preview) return;

        preview.innerHTML =
            `<img src="${URL.createObjectURL(file)}" alt="Preview">`;
    },    bindNavigation() {

        document.querySelectorAll("[data-page]").forEach(link => {

            link.addEventListener("click", e => {

                e.preventDefault();

                const page = link.dataset.page;

                document.querySelectorAll(".admin-page").forEach(section => {

                    section.style.display =
                        section.id === page ? "block" : "none";

                });

                document.querySelectorAll("[data-page]").forEach(item => {

                    item.classList.toggle("active", item === link);

                });

                this.q("dashboard")?.style.setProperty(
                    "display",
                    page === "dashboard" ? "block" : "none"
                );

                const title =
                    link.querySelector("span")?.textContent ||
                    "Dashboard";

                document.querySelector(".page-title").textContent =
                    title;

            });

        });

    },

    bindUploadBoxes() {

        const map = {

            heroImage: "heroPreview",

            aboutImage: "aboutPreview",

            employerBanner: "employerBannerPreview",

            websiteLogo: "websiteLogoPreview",

            mediaHeroImage: "mediaHeroPreview",

            mediaAboutImage: "mediaAboutPreview",

            mediaEmployerBanner: "mediaEmployerPreview",

            mediaPartnerLogo: "mediaPartnerPreview",

            mediaCoverImage: "mediaCoverPreview",

            partnerLogo: "partnerLogoPreview"

        };

        Object.entries(map).forEach(([inputId, previewId]) => {

            const input = this.q(inputId);

            input?.closest(".form-group")
                ?.querySelector(".upload-box")
                ?.addEventListener("click", () => input.click());

            input?.addEventListener("change", () => {

                this.preview(input, previewId);

            });

        });

    },    bindSaves() {

        this.q("saveHero")?.addEventListener("click", () => this.saveHero());

        this.q("saveAbout")?.addEventListener("click", () => this.saveAbout());

        this.q("saveServices")?.addEventListener("click", () => this.saveServices());

        this.q("saveIndustries")?.addEventListener("click", () => this.saveIndustries());

        this.q("saveEmployers")?.addEventListener("click", () => this.saveEmployers());

        this.q("saveSettings")?.addEventListener("click", () => this.saveSettings());

        this.q("saveMedia")?.addEventListener("click", () => this.saveMedia());

        this.q("savePartner")?.addEventListener("click", () => this.savePartner());

    },

    async saveHero() {

        try {

            const old = await readData(this.paths.hero) || {};

            const imageUrl = await this.upload(
                "heroImage",
                "hero",
                old.imageUrl
            );

            await this.save(
                this.paths.hero,
                {
                    tag: this.value("heroTag"),
                    heading: this.value("heroHeading"),
                    description: this.value("heroDescription"),
                    primaryButtonText: this.value("heroPrimaryButton"),
                    primaryButtonLink: this.value("heroPrimaryLink"),
                    secondaryButtonText: this.value("heroSecondaryButton"),
                    secondaryButtonLink: this.value("heroSecondaryLink"),
                    imageUrl
                },
                "Hero updated."
            );

        } catch (error) {

            this.toast("Upload Failed", error.message, true);

        }

    },

    async saveAbout() {

        try {

            const old = await readData(this.paths.about) || {};

            const imageUrl = await this.upload(
                "aboutImage",
                "about",
                old.imageUrl
            );

            await this.save(
                this.paths.about,
                {
                    heading: this.value("aboutHeading"),
                    description: this.value("aboutDescription"),
                    imageUrl
                },
                "About updated."
            );

        } catch (error) {

            this.toast("Upload Failed", error.message, true);

        }

    },

    async saveServices() {

        await this.save(

            this.paths.services,

            {
                heading: this.value("serviceHeading"),
                description: this.value("serviceDescription")
            },

            "Services updated."

        );

    },

    async saveIndustries() {

        await this.save(

            this.paths.industries,

            {
                heading: this.value("industryHeading"),
                description: this.value("industryDescription")
            },

            "Industries updated."

        );

    },    async saveEmployers() {

        try {

            const old = await readData(this.paths.employers) || {};

            const imageUrl = await this.upload(
                "employerBanner",
                "employers",
                old.imageUrl
            );

            const saved = await this.save(

                this.paths.employers,

                {
                    heading: this.value("employerHeading"),
                    description: this.value("employerDescription"),
                    buttonText: this.value("employerButtonText"),
                    buttonLink: this.value("employerButtonLink"),
                    imageUrl
                },

                "Clients section updated."

            );

            if (saved) {

                await this.save(

                    "website/settings/googleForms",

                    {
                        employer: this.value("employerGoogleForm") || ""
                    },

                    "Google Form updated."

                );

            }

        } catch (error) {

            this.toast(
                "Upload Failed",
                error.message,
                true
            );

        }

    },

    async saveSettings() {

        await this.save(

            this.paths.settings,

            {

                ...(await readData(this.paths.settings) || {}),

                websiteName: this.value("websiteTitle"),

                tagline: this.value("websiteTagline"),

                adminEmail: this.value("adminEmail"),

                supportEmail: this.value("supportEmail"),

                metaDescription: this.value("metaDescription"),

                maintenanceMode: this.value("maintenanceMode"),

                defaultLanguage: this.value("defaultLanguage")

            },

            "Settings updated."

        );

    },

    async saveMedia() {

        try {

            const old =
                await readData(this.paths.media) || {};

            const media = {

                logoUrl: await this.upload(
                    "websiteLogo",
                    "media",
                    old.logoUrl
                ),

                heroImageUrl: await this.upload(
                    "mediaHeroImage",
                    "media",
                    old.heroImageUrl
                ),

                aboutImageUrl: await this.upload(
                    "mediaAboutImage",
                    "media",
                    old.aboutImageUrl
                ),

                employerBannerUrl: await this.upload(
                    "mediaEmployerBanner",
                    "media",
                    old.employerBannerUrl
                ),

                partnerLogoUrl: await this.upload(
                    "mediaPartnerLogo",
                    "media",
                    old.partnerLogoUrl
                ),

                coverImageUrl: await this.upload(
                    "mediaCoverImage",
                    "media",
                    old.coverImageUrl
                )

            };

            await this.save(

                this.paths.media,

                media,

                "Media Library updated."

            );

        }

        catch (error) {

            this.toast(
                "Upload Failed",
                error.message,
                true
            );

        }

    },

    async savePartner() {

        try {

            if (!this.value("partnerName")) {

                return this.toast(
                    "Missing Name",
                    "Enter partner name first.",
                    true
                );

            }

            const logoUrl =
                await this.upload(
                    "partnerLogo",
                    "partners"
                );

            const key =
                generateKey(this.paths.partners);

            await this.save(

                `${this.paths.partners}/${key}`,

                {

                    name: this.value("partnerName"),

                    website: this.value("partnerWebsite"),

                    logoUrl,

                    active: true

                },

                "Partner added."

            );

        }

        catch (error) {

            this.toast(
                "Upload Failed",
                error.message,
                true
            );

        }

    },    async loadAll() {

        const [
            hero,
            about,
            services,
            industries,
            employers,
            settings,
            media,
            forms
        ] = await Promise.all([

            readData(this.paths.hero),

            readData(this.paths.about),

            readData(this.paths.services),

            readData(this.paths.industries),

            readData(this.paths.employers),

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

            employerGoogleForm: "employer"

        });



        // MAIN SECTION PREVIEWS

        this.showStoredPreview(

            "heroPreview",

            hero?.imageUrl

        );


        this.showStoredPreview(

            "aboutPreview",

            about?.imageUrl

        );


        this.showStoredPreview(

            "employerBannerPreview",

            employers?.imageUrl

        );



        // MEDIA LIBRARY PREVIEWS


        this.showStoredPreview(

            "websiteLogoPreview",

            media?.logoUrl

        );


        this.showStoredPreview(

            "mediaHeroPreview",

            media?.heroImageUrl

        );


        this.showStoredPreview(

            "mediaAboutPreview",

            media?.aboutImageUrl

        );


        this.showStoredPreview(

            "mediaEmployerPreview",

            media?.employerBannerUrl

        );


        this.showStoredPreview(

            "mediaPartnerPreview",

            media?.partnerLogoUrl

        );


        this.showStoredPreview(

            "mediaCoverPreview",

            media?.coverImageUrl

        );

    },    fill(data, map) {

        Object.entries(map).forEach(([id, key]) => {

            this.setValue(
                id,
                data?.[key]
            );

        });

    },


    showStoredPreview(id, url) {

        const preview = this.q(id);

        if (url && preview) {

            preview.innerHTML =
                `<img src="${url}" alt="Saved image">`;

        }

    },


    removeDuplicateMediaSection() {

        document
            .querySelectorAll("section#media")
            .forEach((section, index) => {

                if (index > 0) {

                    section.remove();

                }

            });

    }

};



document.addEventListener(
    "DOMContentLoaded",
    () => Admin.init()
);
