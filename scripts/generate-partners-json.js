#!/usr/bin/env node

/**
 * Build script to generate static JSON file from partners CMS content
 * Runs before Next.js build to create public/data/partners.json
 *
 * Usage: node scripts/generate-partners-json.js
 */

const fs = require("node:fs");
const path = require("node:path");
const matter = require("gray-matter");

// Read all partner markdown files from CMS
const partnersDir = path.join(process.cwd(), "cms/partnerek");
const files = fs.readdirSync(partnersDir);

const partners = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
        const filePath = path.join(partnersDir, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
            slug: file.replace(/\.md$/, ""),
            nev: data.nev,
            logo: data.logo,
            sorrend: data.sorrend || 999,
        };
    })
    // Sort by sorrend (display order)
    .sort((a, b) => a.sorrend - b.sorrend);

// Ensure output directory exists
const outputDir = path.join(process.cwd(), "public/data");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Write JSON file
const outputPath = path.join(outputDir, "partners.json");
fs.writeFileSync(outputPath, JSON.stringify(partners, null, 2));

console.log(
    `✅ Generated ${partners.length} partners → public/data/partners.json`,
);
