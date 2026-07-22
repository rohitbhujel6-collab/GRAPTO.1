/* GRAPTO admin controller */
"use strict";

const Admin = {

    paths: {

        hero: "website/homepage",

        about: "website/about",

        services: "website/services",

        industries: "website/industries",

        applications: "website/applications",

        footer: "website/footer",

        settings: "website/settings",

        media: "website/media",

        partners: "website/partners"

    },

    init() {

        if (!window.db || !window.auth || !window.uploadImage) {

            this.toast(
                "Error",
                "Firebase failed to initialize.",
                true
            );

            return;
        }

        this.removeDuplicateMediaSection();

        this.bindNavigation();

        this.bindUploadBoxes();

        this.bindButtons();

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

        if (el) {

            el.value = value || "";

        }

    },

    toast(title, message, error = false) {

        const toast = this.q(error ? "errorToast" : "toast");

        this.q(error ? "errorToastTitle" : "toastTitle").textContent = title;

        this.q(error ? "errorToastMessage" : "toastMessage").textContent = message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);

    },

    async save(path, data, message) {

        const result = await saveData(path, {

            ...data,

            updatedAt: new Date().toISOString()

        });

        if (result.success) {

            this.toast("Success", message);

        } else {

            this.toast(

                "Error",

                result.message ||

                "Unable to save data.",

                true

            );

        }

        return result.success;

    },

    async upload(inputId, folder, oldUrl = "") {

        const file = this.q(inputId)?.files?.[0];

        if (!file) {

            return oldUrl;

        }

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

            `<img src="${URL.createObjectURL(file)}">`;

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

                    item.classList.remove("active");

                });

                link.classList.add("active");

                const title =
                    link.querySelector("span")?.textContent ||
                    "Dashboard";

                const pageTitle =
                    document.querySelector(".page-title");

                if (pageTitle) {

                    pageTitle.textContent = title;

                }

            });

        });

    },



    bindUploadBoxes() {

        const uploads = {

            heroImage: "heroPreview",

            aboutImage: "aboutPreview",

            websiteLogo: "websiteLogoPreview",

            mediaHeroImage: "mediaHeroPreview",

            mediaAboutImage: "mediaAboutPreview",

            mediaEmployerBanner: "mediaEmployerPreview",

            mediaCandidateBanner: "mediaCandidatePreview",

            mediaPartnerLogo: "mediaPartnerPreview",

            galleryImages: "galleryPreview"

        };

        Object.entries(uploads).forEach(([inputId, previewId]) => {

            const input = this.q(inputId);

            if (!input) return;

            const box =
                input.closest(".form-group")
                ?.querySelector(".upload-box");

            box?.addEventListener("click", () => {

                input.click();

            });

            input.addEventListener("change", () => {

                this.preview(input, previewId);

            });

        });

    },



    bindButtons() {

        this.q("saveHero")
            ?.addEventListener("click",
                () => this.saveHero());

        this.q("saveAbout")
            ?.addEventListener("click",
                () => this.saveAbout());

        this.q("saveServices")
            ?.addEventListener("click",
                () => this.saveServices());

        this.q("saveIndustries")
            ?.addEventListener("click",
                () => this.saveIndustries());

        this.q("saveEmployers")
            ?.addEventListener("click",
                () => this.saveApplications());

        this.q("saveFooter")
            ?.addEventListener("click",
                () => this.saveFooter());

        this.q("saveSettings")
            ?.addEventListener("click",
                () => this.saveSettings());

        this.q("saveMedia")
            ?.addEventListener("click",
                () => this.saveMedia());

    },    async saveHero() {

        try {

            const old =
                await readData(this.paths.hero) || {};

            const imageUrl =
                await this.upload(
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

                    imageUrl

                },

                "Hero section updated successfully."

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



    async saveAbout() {

        try {

            const old =
                await readData(this.paths.about) || {};

            const imageUrl =
                await this.upload(
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

                "About section updated successfully."

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



    async saveServices() {

        await this.save(

            this.paths.services,

            {

                heading: this.value("serviceHeading"),

                description: this.value("serviceDescription")

            },

            "Services updated successfully."

        );

    },



    async saveIndustries() {

        await this.save(

            this.paths.industries,

            {

                heading: this.value("industryHeading"),

                description: this.value("industryDescription")

            },

            "Industries updated successfully."

        );

    },    async saveApplications() {

        try {

            const data = {

                heading: this.value("applicationHeading"),

                description: this.value("applicationDescription"),



                employer: {

                    title: this.value("employerTitle"),

                    description: this.value("employerDescription"),

                    buttonText: this.value("employerButtonText"),

                    googleForm: this.value("employerGoogleForm")

                },



                candidate: {

                    title: this.value("candidateTitle"),

                    description: this.value("candidateDescription"),

                    buttonText: this.value("candidateButtonText"),

                    googleForm: this.value("candidateGoogleForm")

                }

            };



            await this.save(

                this.paths.applications,

                data,

                "Applications section updated successfully."

            );

        }

        catch (error) {

            this.toast(

                "Save Failed",

                error.message,

                true

            );

        }

    },



    async saveFooter() {

        await this.save(

            this.paths.footer,

            {

                companyName: this.value("companyName"),

                phone: this.value("companyPhone"),

                email: this.value("companyEmail"),

                address: this.value("companyAddress"),

                facebook: this.value("facebookUrl"),

                instagram: this.value("instagramUrl"),

                linkedin: this.value("linkedinUrl"),

                youtube: this.value("youtubeUrl"),

                whatsapp: this.value("whatsappNumber"),

                googleMaps: this.value("googleMapsLink")

            },

            "Footer updated successfully."

        );

    },    async saveSettings() {

        await this.save(

            this.paths.settings,

            {

                websiteName: this.value("websiteTitle"),

                tagline: this.value("websiteTagline"),

                adminEmail: this.value("adminEmail"),

                supportEmail: this.value("supportEmail"),

                metaDescription: this.value("metaDescription"),

                maintenanceMode: this.value("maintenanceMode"),

                defaultLanguage: this.value("defaultLanguage")

            },

            "Website settings updated successfully."

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

                candidateBannerUrl: await this.upload(
                    "mediaCandidateBanner",
                    "media",
                    old.candidateBannerUrl
                ),

                partnerLogoUrl: await this.upload(
                    "mediaPartnerLogo",
                    "media",
                    old.partnerLogoUrl
                )

            };

            await this.save(

                this.paths.media,

                media,

                "Media Library updated successfully."

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

            applications,

            footer,

            settings,

            media

        ] = await Promise.all([

            readData(this.paths.hero),

            readData(this.paths.about),

            readData(this.paths.services),

            readData(this.paths.industries),

            readData(this.paths.applications),

            readData(this.paths.footer),

            readData(this.paths.settings),

            readData(this.paths.media)

        ]);



        /* -----------------------------
           HERO
        ----------------------------- */

        this.fill(hero, {

            heroTag: "tag",

            heroHeading: "heading",

            heroDescription: "description"

        });



        /* -----------------------------
           ABOUT
        ----------------------------- */

        this.fill(about, {

            aboutHeading: "heading",

            aboutDescription: "description"

        });



        /* -----------------------------
           APPLICATIONS
        ----------------------------- */

        this.setValue(

            "applicationHeading",

            applications?.heading

        );



        this.setValue(

            "applicationDescription",

            applications?.description

        );



        this.setValue(

            "employerTitle",

            applications?.employer?.title

        );



        this.setValue(

            "employerDescription",

            applications?.employer?.description

        );



        this.setValue(

            "employerButtonText",

            applications?.employer?.buttonText

        );



        this.setValue(

            "employerGoogleForm",

            applications?.employer?.googleForm

        );



        this.setValue(

            "candidateTitle",

            applications?.candidate?.title

        );



        this.setValue(

            "candidateDescription",

            applications?.candidate?.description

        );



        this.setValue(

            "candidateButtonText",

            applications?.candidate?.buttonText

        );



        this.setValue(

            "candidateGoogleForm",

            applications?.candidate?.googleForm

        );        /* -----------------------------
           FOOTER
        ----------------------------- */

        this.fill(footer, {

            companyName: "companyName",

            companyPhone: "phone",

            companyEmail: "email",

            companyAddress: "address",

            facebookUrl: "facebook",

            instagramUrl: "instagram",

            linkedinUrl: "linkedin",

            youtubeUrl: "youtube",

            whatsappNumber: "whatsapp",

            googleMapsLink: "googleMaps"

        });



        /* -----------------------------
           SETTINGS
        ----------------------------- */

        this.fill(settings, {

            websiteTitle: "websiteName",

            websiteTagline: "tagline",

            adminEmail: "adminEmail",

            supportEmail: "supportEmail",

            metaDescription: "metaDescription",

            maintenanceMode: "maintenanceMode",

            defaultLanguage: "defaultLanguage"

        });



        /* -----------------------------
           IMAGE PREVIEWS
        ----------------------------- */

        this.showStoredPreview(

            "heroPreview",

            hero?.imageUrl

        );



        this.showStoredPreview(

            "aboutPreview",

            about?.imageUrl

        );



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

            "mediaCandidatePreview",

            media?.candidateBannerUrl

        );



        this.showStoredPreview(

            "mediaPartnerPreview",

            media?.partnerLogoUrl

        );

    },



    fill(data, map) {

        if (!data) return;

        Object.entries(map).forEach(([id, key]) => {

            this.setValue(

                id,

                data[key]

            );

        });

    },    showStoredPreview(id, url) {

        const preview = this.q(id);

        if (!preview) return;

        if (!url) {

            preview.innerHTML = "";

            return;

        }

        preview.innerHTML = `

            <img
                src="${url}"
                alt="Preview"
                style="
                    width:100%;
                    max-width:220px;
                    border-radius:10px;
                    margin-top:10px;
                ">

        `;

    },



    removeDuplicateMediaSection() {

        const sections = document.querySelectorAll("section#media");

        sections.forEach((section, index) => {

            if (index > 0) {

                section.remove();

            }

        });

    },



    refreshDashboardCounts() {

        const partnerCount = this.q("partnerCount");

        const mediaCount = this.q("mediaCount");



        readData(this.paths.partners)

            .then(data => {

                if (!partnerCount) return;

                partnerCount.textContent =

                    data

                        ? Object.keys(data).length

                        : 0;

            });



        readData(this.paths.media)

            .then(data => {

                if (!mediaCount) return;



                mediaCount.textContent =

                    data

                        ? Object.keys(data)

                              .filter(key => !!data[key]).length

                        : 0;

            });

    },    async initializeDashboard() {

        try {

            await this.loadAll();

            this.refreshDashboardCounts();

        }

        catch (error) {

            console.error(error);

            this.toast(

                "Initialization Error",

                "Some data could not be loaded.",

                true

            );

        }

    },



    async reloadCurrentPage() {

        try {

            await this.loadAll();

            this.refreshDashboardCounts();

        }

        catch (error) {

            console.error(error);

        }

    },



    enableAutoRefresh() {

        const buttons = [

            "saveHero",

            "saveAbout",

            "saveServices",

            "saveIndustries",

            "saveEmployers",

            "saveFooter",

            "saveSettings",

            "saveMedia"

        ];



        buttons.forEach(id => {

            const btn = this.q(id);

            if (!btn) return;



            btn.addEventListener(

                "click",

                () => {

                    setTimeout(() => {

                        this.reloadCurrentPage();

                    }, 1000);

                }

            );

        });

    },



    start() {

        this.bindNavigation();

        this.bindUploadBoxes();

        this.bindButtons();

        this.enableAutoRefresh();

        this.initializeDashboard();

    }

};document.addEventListener("DOMContentLoaded", () => {

    try {

        Admin.init();

        console.log("GRAPTO Admin Loaded");

    }

    catch (error) {

        console.error(error);

    }

});
