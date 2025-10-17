import fs from "fs";
import matter from "gray-matter";
import path from "path";

import type {
    ContactKeys,
    ContentType,
    HomePageKeys,
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
        case "fooldal":
            return path.join(process.cwd(), `cms/pages/${locale}`);
        case "kapcsolat":
            return path.join(process.cwd(), "cms/kapcsolat");

        default:
            return null;
    }
};

type Fields = PostKeys[] | ProductKeys[] | ContactKeys[] | HomePageKeys[];

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

    const posts = slugs
        .map((slug) => getContentBySlug(type, slug, fields, locale))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
