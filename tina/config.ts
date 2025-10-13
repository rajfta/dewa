/* eslint-disable camelcase */
import { defineConfig } from "tinacms";
import {
  fenyezofulkekFields,
  homepageFields,
  ipari_feluletkezeles_termekFields,
  kapcsolat_egyenFields,
  postFields,
  reference_galleryFields,
  reference_hall_of_fameFields,
  szorastechnika_termekFields,
  tuzelestechnika_termekFields,
} from "./templates";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINACMS_PUBLIC_CLIENT_ID,
  token: process.env.TINACMS_TOKEN,
  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        format: "md",
        label: "Fenyezofulke termekek",
        name: "fenyezofulke_termekek",
        path: "cms/termekek/fenyezofulkek",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...fenyezofulkekFields(),
        ],
      },
      {
        format: "md",
        label: "Ipari feluletkezeles termekek",
        name: "ipari_feluletkezeles_termekek",
        path: "cms/termekek/feluletkezeles",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...ipari_feluletkezeles_termekFields(),
        ],
      },
      {
        format: "md",
        label: "Tuzelestechnika",
        name: "tuzelestechnika",
        path: "cms/termekek/tuzelestechnika",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...tuzelestechnika_termekFields(),
        ],
      },
      {
        format: "md",
        label: "Szorastechnika",
        name: "szorastechnika",
        path: "cms/termekek/szorastechnika",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...szorastechnika_termekFields(),
        ],
      },
      {
        format: "md",
        label: "Posts",
        name: "posts",
        path: "cms/posts",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...postFields(),
        ],
      },
      {
        format: "md",
        label: "References",
        name: "references",
        path: "cms/references",
        match: {
          include: "**/*",
        },
        templates: [
          {
            fields: [
              {
                type: "rich-text",
                name: "body",
                label: "Body of Document",
                description: "This is the markdown body",
                isBody: true,
              },
              ...reference_galleryFields(),
            ],
            label: "reference-gallery",
            name: "reference_gallery",
          },
          {
            fields: [
              {
                type: "rich-text",
                name: "body",
                label: "Body of Document",
                description: "This is the markdown body",
                isBody: true,
              },
              ...reference_hall_of_fameFields(),
            ],
            label: "referencia",
            name: "referencia",
          },
        ],
      },
      {
        format: "md",
        label: "Home",
        name: "home",
        path: "cms/pages",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...homepageFields(),
        ],
      },
      {
        format: "md",
        label: "Kapcsolat",
        name: "kapcsolat",
        path: "cms/kapcsolat",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...kapcsolat_egyenFields(),
        ],
      },
    ],
  },
});
