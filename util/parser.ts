import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type {
    ContactKeys,
    ContentType,
    HomePageKeys,
    PartnerKeys,
    PostKeys,
    ProductKeys,
} from "../types";

const getDirectory = (type: ContentType, locale: string = "hu") => {
    switch (type) {
        case "posts":
            return path.join(process.cwd(), `cms/posts/${locale}`);
        case "references":
            return path.join(process.cwd(), `cms/references/${locale}`);
        case "feluletkezeles":
            return path.join(
                process.cwd(),
                `cms/termekek/feluletkezeles/${locale}`,
            );
        case "fenyezofulkek":
            return path.join(
                process.cwd(),
                `cms/termekek/fenyezofulkek/${locale}`,
            );
        case "tuzelestechnika":
            return path.join(
                process.cwd(),
                `cms/termekek/tuzelestechnika/${locale}`,
            );
        case "szorastechnika":
            return path.join(
                process.cwd(),
                `cms/termekek/szorastechnika/${locale}`,
            );
        case "szerviz":
            return path.join(process.cwd(), `cms/termekek/szerviz/${locale}`);
        case "fooldal":
            return path.join(process.cwd(), `cms/pages/${locale}`);
        case "kapcsolat":
            return path.join(process.cwd(), "cms/kapcsolat");
        case "partnerek":
            return path.join(process.cwd(), "cms/partnerek");

        default:
            return null;
    }
};

type Fields =
    | PostKeys[]
    | ProductKeys[]
    | ContactKeys[]
    | HomePageKeys[]
    | PartnerKeys[];

export function getContentSlugs(type: ContentType, locale: string = "hu") {
    return fs.readdirSync(getDirectory(type, locale));
}

export function getContentBySlug(
    type: ContentType,
    slug: string,
    fields: Fields,
    locale: string = "hu",
) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = path.join(getDirectory(type, locale), `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const items: { [key: string]: string } = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === "slug") {
            items[field] = realSlug;
        }
        if (field === "content") {
            items[field] = content;
        }

        if (data[field]) {
            items[field] = data[field];
        }
    });

    return items;
}

export function getAllContents(
    type: ContentType,
    fields: Fields,
    locale: string = "hu",
) {
    const slugs = getContentSlugs(type, locale);

    const contents = slugs.map((slug) =>
        getContentBySlug(type, slug, fields, locale),
    );

    // Sort by date for posts/references, by sorrend for partners, or keep original order
    if (type === "partnerek") {
        return contents.sort((a, b) => {
            const aSort = typeof a.sorrend === "number" ? a.sorrend : 999;
            const bSort = typeof b.sorrend === "number" ? b.sorrend : 999;
            return aSort - bSort;
        });
    }

    // sort posts/references by date in descending order
    return contents.sort((post1, post2) => {
        const date1 = new Date(post1.date);
        const date2 = new Date(post2.date);
        return date2.getTime() - date1.getTime();
    });
}
