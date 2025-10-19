export type ContentType =
    | "posts"
    | "references"
    | "feluletkezeles"
    | "fenyezofulkek"
    | "tuzelestechnika"
    | "szorastechnika"
    | "szerviz"
    | "fooldal"
    | "kapcsolat"
    | "partnerek";

export type SeoType = {
    title: string;
    description: string;
};

export type HomePageType = {
    "hero-subtitle": string;
    "hero-image": string;
    "about-title": string;
    "about-subtitle": string;
    "about-kep": string;
    "services-title": string;
    "serv-image": string;
    "services-subtitle": string;
    "fenyezo-description": string;
    "szoras-desc": string;
    "tuzeles-desc": string;
    "felulet-desc": string;
};

export type HomePageKeys = keyof HomePageType;

export type ContactType = {
    slug: string;
    nev: string;
    role?: string;
    role_en?: string;
    reszleg: string;
    reszleg_en?: string;
    helyszin: string;
    email?: string;
    telefonszam?: string;
};

export type ContactKeys = keyof ContactType;

export type PostType = {
    slug: string;
    title: string;
    date: string;
    coverImage: string;
    gallery?: string[];
    companyName?: string;
    excerpt: string;
    content: string;
    seo: SeoType;
    _template: string;
};

export type PostKeys = keyof PostType;

export type ProductType = {
    nev: string;
    alkategoria: string;
    divizio: string;
    leiras: string;
    boritokep: string;
    slug: string;
};

export type ProductKeys = keyof ProductType;

export type PartnerType = {
    slug: string;
    nev: string;
    logo: string;
    sorrend?: number;
};

export type PartnerKeys = keyof PartnerType;
