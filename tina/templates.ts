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
                "heating technology",
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
