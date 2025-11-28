/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { TinaField } from "tinacms";

export function postFields() {
    return [
        {
            type: "string",
            name: "title",
            label: "title",
            required: true,
        },
        {
            type: "datetime",
            name: "date",
            label: "date",
        },
        {
            type: "string",
            name: "excerpt",
            label: "excerpt",
            ui: {
                component: "textarea",
            },
            required: true,
        },
        {
            type: "image",
            name: "coverImage",
            label: "coverImage",
        },
        {
            type: "string",
            name: "translationSlug",
            label: "Translation Slug",
            description:
                "The slug of this content in the other language (for language switching)",
        },
        {
            type: "object",
            name: "seo",
            label: "seo",
            required: true,
            fields: [...seoFields()],
        },
    ] as TinaField[];
}
export function heroFields() {
    return [
        {
            type: "string",
            name: "hero_subtitle",
            nameOverride: "hero-subtitle",
            label: "hero-subtitle",
            required: true,
        },
        {
            type: "image",
            name: "hero_image",
            nameOverride: "hero-image",
            label: "hero-image",
        },
    ] as TinaField[];
}
export function homepageFields() {
    return [
        ...heroFields(),
        ...rolunkFields(),
        ...servicesFields(),
    ] as TinaField[];
}
export function ipari_feluletkezeles_termekFields() {
    return [
        {
            type: "string",
            name: "nev",
            label: "nev",
        },
        {
            type: "rich-text",
            name: "leiras",
            label: "leiras",
        },
        {
            type: "image",
            name: "boritokep",
            label: "boritokep",
        },
        {
            type: "string",
            name: "divizio",
            label: "divizio",
        },
        {
            type: "string",
            name: "alkategoria",
            label: "alkategoria",
            options: [
                "Szárító kemencék",
                "Felületkezelők",
                "Szennyvízkezelő berendezések",
                "Porszóró berendezések",
                "Anyagmozgató berendezések",
                "KTL festősorok",
                "Egyedi tervezésű festőberendezések",
                "Automata robotok, festőberendezések",
            ],
        },
    ] as TinaField[];
}
export function kapcsolat_egyenFields() {
    return [
        {
            type: "string",
            name: "nev",
            label: "Name",
            required: true,
        },
        {
            type: "string",
            name: "role",
            label: "Role (Hungarian)",
            required: false,
        },
        {
            type: "string",
            name: "role_en",
            label: "Role (English)",
            required: false,
        },
        {
            type: "string",
            name: "helyszin",
            label: "helyszin",
            options: ["budaors", "bekescsaba"],
        },
        {
            type: "string",
            name: "reszleg",
            label: "reszleg (Hungarian)",
            options: [
                "központ",
                "szervíz",
                "tüzeléstechnika",
                "raktár",
                "szórástechnika",
                "ipari festőberendezések",
                "festőfülkék",
            ],
            required: true,
        },
        {
            type: "string",
            name: "reszleg_en",
            label: "reszleg (English)",
            options: [
                "headquarters",
                "service",
                "Combustion Technology",
                "warehouse",
                "spray technology",
                "industrial painting equipment",
                "paint booths",
            ],
            required: true,
        },
        {
            type: "string",
            name: "email",
            label: "email",
        },
        {
            type: "string",
            name: "telefonszam",
            label: "telefonszam",
            required: true,
        },
    ] as TinaField[];
}
export function reference_galleryFields() {
    return [
        {
            type: "string",
            name: "title",
            label: "title",
            required: true,
        },
        {
            type: "string",
            name: "excerpt",
            label: "excerpt",
            required: true,
        },
        {
            type: "datetime",
            name: "date",
            label: "date",
            required: true,
        },
        {
            type: "image",
            name: "coverImage",
            label: "coverImage",
        },
        {
            type: "image",
            name: "gallery",
            label: "gallery",
            list: true,
        },
        {
            type: "string",
            name: "translationSlug",
            label: "Translation Slug",
            description:
                "The slug of this content in the other language (for language switching)",
        },
        {
            type: "object",
            name: "seo",
            label: "seo",
            required: true,
            fields: [...seoFields()],
        },
    ] as TinaField[];
}
export function reference_hall_of_fameFields() {
    return [
        {
            type: "string",
            name: "title",
            label: "title",
            required: true,
        },
        {
            type: "string",
            name: "companyname",
            label: "companyName",
        },
        {
            type: "string",
            name: "excerpt",
            label: "excerpt",
            ui: {
                component: "textarea",
            },
            required: true,
        },
        {
            type: "datetime",
            name: "date",
            label: "date",
            required: true,
        },
        {
            type: "image",
            name: "coverImage",
            label: "coverImage",
        },
        {
            type: "image",
            name: "gallery",
            label: "gallery",
            list: true,
        },
        {
            type: "string",
            name: "translationSlug",
            label: "Translation Slug",
            description:
                "The slug of this content in the other language (for language switching)",
        },
        {
            type: "object",
            name: "seo",
            required: true,
            label: "seo",
            fields: [...seoFields()],
        },
    ] as TinaField[];
}
export function rolunkFields() {
    return [
        {
            type: "string",
            name: "about_title",
            nameOverride: "about-title",
            label: "about-title",
            required: true,
        },
        {
            type: "string",
            name: "about_subtitle",
            nameOverride: "about-subtitle",
            label: "about-subtitle",
            required: true,
        },
        {
            type: "image",
            name: "about_kep",
            nameOverride: "about-kep",
            label: "about-kep",
        },
    ] as TinaField[];
}
export function seoFields() {
    return [
        {
            type: "string",
            name: "title",
            label: "title",
            required: false,
        },
        {
            type: "string",
            name: "description",
            label: "description",
            required: false,
        },
    ] as TinaField[];
}
export function servicesFields() {
    return [
        {
            type: "string",
            name: "services_title",
            nameOverride: "services-title",
            label: "services-title",
            required: true,
        },
        {
            type: "string",
            name: "services_subtitle",
            nameOverride: "services-subtitle",
            label: "services-subtitle",
            ui: {
                component: "textarea",
            },
            required: true,
        },
        {
            type: "string",
            name: "fenyezo_description",
            nameOverride: "fenyezo-description",
            label: "fenyezo-description",
            ui: {
                component: "textarea",
            },
            required: true,
        },
        {
            type: "string",
            name: "szoras_desc",
            nameOverride: "szoras-desc",
            label: "szoras-desc",
            ui: {
                component: "textarea",
            },
            required: true,
        },
        {
            type: "string",
            name: "tuzeles_desc",
            nameOverride: "tuzeles-desc",
            label: "tuzeles-desc",
            ui: {
                component: "textarea",
            },
            required: true,
        },
        {
            type: "string",
            name: "felulet_desc",
            nameOverride: "felulet-desc",
            label: "felulet-desc",
            ui: {
                component: "textarea",
            },
            required: true,
        },
        {
            type: "image",
            name: "serv_image",
            nameOverride: "serv-image",
            label: "serv-image",
        },
    ] as TinaField[];
}
export function szorastechnika_termekFields() {
    return [
        {
            type: "string",
            name: "nev",
            label: "nev",
        },
        {
            type: "rich-text",
            name: "leiras",
            label: "leiras",
        },
        {
            type: "image",
            name: "boritokep",
            label: "boritokep",
        },
        {
            type: "string",
            name: "divizio",
            label: "divizio",
        },
        {
            type: "string",
            name: "alkategoria",
            label: "alkategoria",
            options: [
                "Sűrített levegős berendezések",
                "Airmix berendezések",
                "Airless berendezések",
                "Elektrosztatikus pisztolyok",
                "2 és 3 komponenses berendezések",
                "Keverők és emelők",
                "Alkatrészek",
            ],
        },
    ] as TinaField[];
}
export function fenyezofulkekFields() {
    return [
        {
            type: "string",
            name: "nev",
            label: "nev",
            required: true,
        },
        {
            type: "rich-text",
            name: "leiras",
            label: "leiras",
            required: true,
        },
        {
            type: "image",
            name: "boritokep",
            label: "boritokep",
        },
        {
            type: "string",
            name: "divizio",
            label: "divizio",
        },
        {
            type: "string",
            name: "alkategoria",
            label: "alkategoria",
            options: [
                "Személyautó fényezőfülkék",
                "Ipari fényezőfülkék",
                "Vasúti fényezőfülkék",
                "Előkészítő állások és festékkonyhák",
                "Szűrők és pormentesítők",
                "Kiegészítő berendezések",
            ],
        },
    ] as TinaField[];
}
export function tuzelestechnika_termekFields() {
    return [
        {
            type: "string",
            name: "nev",
            label: "nev",
        },
        {
            type: "rich-text",
            name: "leiras",
            label: "leiras",
        },
        {
            type: "image",
            name: "boritokep",
            label: "boritokep",
        },
        {
            type: "string",
            name: "divizio",
            label: "divizio",
        },
        {
            type: "string",
            name: "alkategoria",
            label: "alkategoria",
            options: [
                "Hőlégfúvók",
                "Melegvizes és gőzkazánok",
                "Blokkégők",
                "Fan-coilok",
                "Hőcserélők",
            ],
        },
    ] as TinaField[];
}
export function szerviz_termekFields() {
    return [
        {
            type: "string",
            name: "nev",
            label: "nev",
        },
        {
            type: "rich-text",
            name: "leiras",
            label: "leiras",
        },
        {
            type: "image",
            name: "boritokep",
            label: "boritokep",
        },
        {
            type: "string",
            name: "divizio",
            label: "divizio",
        },
        {
            type: "string",
            name: "alkategoria",
            label: "alkategoria",
            options: [
                "Karbantartás",
                "Javítás",
                "Telepítés",
                "Szakértői tanácsadás",
                "Alkatrész utánpótlás",
            ],
        },
    ] as TinaField[];
}
export function partnerFields() {
    return [
        {
            type: "string",
            name: "nev",
            label: "Partner Name",
            required: true,
        },
        {
            type: "image",
            name: "logo",
            label: "Partner Logo",
            required: true,
        },
        {
            type: "number",
            name: "sorrend",
            label: "Display Order",
            description: "Lower numbers appear first (optional)",
        },
    ] as TinaField[];
}

export function privacyPolicyFields() {
    return [
        {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
        },
        {
            type: "datetime",
            name: "lastUpdated",
            label: "Last Updated",
            required: true,
        },
        {
            type: "object",
            name: "seo",
            label: "SEO",
            required: true,
            fields: [...seoFields()],
        },
    ] as TinaField[];
}

export function messagesFields() {
    return [
        {
            type: "object",
            name: "common",
            label: "Common Translations",
            fields: [
                { type: "string", name: "contact", label: "Contact" },
                { type: "string", name: "readMore", label: "Read More" },
                { type: "string", name: "learnMore", label: "Learn More" },
                { type: "string", name: "getStarted", label: "Get Started" },
                { type: "string", name: "readArticle", label: "Read Article" },
                { type: "string", name: "backTo", label: "Back To" },
                { type: "string", name: "send", label: "Send" },
            ],
        },
        {
            type: "object",
            name: "nav",
            label: "Navigation",
            fields: [
                { type: "string", name: "home", label: "Home" },
                { type: "string", name: "products", label: "Products" },
                { type: "string", name: "references", label: "References" },
                { type: "string", name: "blog", label: "Blog" },
                { type: "string", name: "contact", label: "Contact" },
                { type: "string", name: "career", label: "Career" },
                { type: "string", name: "sprayBooths", label: "Spray Booths" },
                {
                    type: "string",
                    name: "sprayTechnology",
                    label: "Spray Technology",
                },
                {
                    type: "string",
                    name: "combustionTechnology",
                    label: "Combustion Technology",
                },
                {
                    type: "string",
                    name: "surfaceTreatment",
                    label: "Surface Treatment",
                },
                { type: "string", name: "service", label: "Service" },
            ],
        },
        {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
                {
                    type: "string",
                    name: "didWeInterestYou",
                    label: "Did We Interest You",
                },
                {
                    type: "string",
                    name: "yourInterest",
                    label: "Your Interest",
                },
                { type: "string", name: "writeToUs", label: "Write To Us" },
                {
                    type: "string",
                    name: "budaorsCenter",
                    label: "Budaörs Center",
                },
                {
                    type: "string",
                    name: "bekescsabaCenter",
                    label: "Békéscsaba Center",
                },
                {
                    type: "string",
                    name: "budaorsAddress",
                    label: "Budaörs Address",
                },
                {
                    type: "string",
                    name: "bekescsabaAddress",
                    label: "Békéscsaba Address",
                },
            ],
        },
        {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
                { type: "string", name: "title", label: "Title" },
                { type: "string", name: "turnkey", label: "Turnkey" },
                {
                    type: "string",
                    name: "paintingSolutions",
                    label: "Painting Solutions",
                },
                { type: "string", name: "writeToUs", label: "Write To Us" },
                { type: "string", name: "contact", label: "Contact" },
            ],
        },
        {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
                {
                    type: "string",
                    name: "yearsExperience",
                    label: "Years Experience",
                },
                { type: "string", name: "division", label: "Division" },
                {
                    type: "string",
                    name: "successfulProjects",
                    label: "Successful Projects",
                },
            ],
        },
        {
            type: "object",
            name: "products",
            label: "Products",
            fields: [
                { type: "string", name: "sprayBooths", label: "Spray Booths" },
                {
                    type: "string",
                    name: "sprayTechnology",
                    label: "Spray Technology",
                },
                {
                    type: "string",
                    name: "combustionTechnology",
                    label: "Combustion Technology",
                },
                {
                    type: "string",
                    name: "surfaceTreatment",
                    label: "Surface Treatment",
                },
                { type: "string", name: "service", label: "Service" },
                {
                    type: "string",
                    name: "allSubcategories",
                    label: "All Subcategories",
                },
                { type: "string", name: "title", label: "Title" },
                { type: "string", name: "subtitle", label: "Subtitle" },
                {
                    type: "string",
                    name: "surfaceTreatmentDescription",
                    label: "Surface Treatment Description",
                    ui: { component: "textarea" },
                },
                {
                    type: "string",
                    name: "sprayBoothsDescription",
                    label: "Spray Booths Description",
                    ui: { component: "textarea" },
                },
                {
                    type: "string",
                    name: "sprayTechnologyDescription",
                    label: "Spray Technology Description",
                    ui: { component: "textarea" },
                },
                {
                    type: "string",
                    name: "combustionTechnologyDescription",
                    label: "Combustion Technology Description",
                    ui: { component: "textarea" },
                },
                {
                    type: "string",
                    name: "serviceDescription",
                    label: "Service Description",
                    ui: { component: "textarea" },
                },
            ],
        },
        {
            type: "object",
            name: "references",
            label: "References",
            fields: [
                { type: "string", name: "title", label: "Title" },
                {
                    type: "string",
                    name: "backToReferences",
                    label: "Back To References",
                },
                { type: "string", name: "hallOfFame", label: "Hall Of Fame" },
                { type: "string", name: "galleries", label: "Galleries" },
            ],
        },
        {
            type: "object",
            name: "blog",
            label: "Blog",
            fields: [
                { type: "string", name: "title", label: "Title" },
                { type: "string", name: "articles", label: "Articles" },
                { type: "string", name: "backToBlog", label: "Back To Blog" },
            ],
        },
        {
            type: "object",
            name: "contactPage",
            label: "Contact Page",
            fields: [
                { type: "string", name: "title", label: "Title" },
                { type: "string", name: "getInTouch", label: "Get In Touch" },
                { type: "string", name: "description", label: "Description" },
                {
                    type: "string",
                    name: "budaorsOffice",
                    label: "Budaörs Office",
                },
                {
                    type: "string",
                    name: "bekescsabaOffice",
                    label: "Békéscsaba Office",
                },
                { type: "string", name: "budaors", label: "Budaörs" },
                { type: "string", name: "bekescsaba", label: "Békéscsaba" },
                { type: "string", name: "name", label: "Name" },
                { type: "string", name: "role", label: "Role" },
                { type: "string", name: "department", label: "Department" },
                { type: "string", name: "email", label: "Email" },
                { type: "string", name: "telephone", label: "Telephone" },
                {
                    type: "string",
                    name: "budaorsAddress",
                    label: "Budaörs Address",
                },
                {
                    type: "string",
                    name: "bekescsabaAddress",
                    label: "Békéscsaba Address",
                },
            ],
        },
        {
            type: "object",
            name: "contactForm",
            label: "Contact Form",
            fields: [
                { type: "string", name: "title", label: "Title" },
                { type: "string", name: "subject", label: "Subject" },
                { type: "string", name: "telephone", label: "Telephone" },
                {
                    type: "string",
                    name: "telephonePlaceholder",
                    label: "Telephone Placeholder",
                },
                { type: "string", name: "email", label: "Email" },
                {
                    type: "string",
                    name: "emailPlaceholder",
                    label: "Email Placeholder",
                },
                { type: "string", name: "message", label: "Message" },
                {
                    type: "string",
                    name: "messagePlaceholder",
                    label: "Message Placeholder",
                },
                { type: "string", name: "send", label: "Send" },
                { type: "string", name: "sending", label: "Sending" },
                { type: "string", name: "success", label: "Success" },
                { type: "string", name: "error", label: "Error" },
                { type: "string", name: "required", label: "Required" },
                { type: "string", name: "minLength", label: "Min Length" },
                { type: "string", name: "maxLength", label: "Max Length" },
            ],
        },
        {
            type: "object",
            name: "languageDetection",
            label: "Language Detection",
            fields: [
                { type: "string", name: "title", label: "Title" },
                {
                    type: "string",
                    name: "message",
                    label: "Message",
                    ui: { component: "textarea" },
                },
                {
                    type: "string",
                    name: "switchEnglish",
                    label: "Switch English",
                },
                {
                    type: "string",
                    name: "stayHungarian",
                    label: "Stay Hungarian",
                },
            ],
        },
    ] as TinaField[];
}
