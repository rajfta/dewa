require("dotenv").config();

module.exports = {
  images: {
    domains: ["images.unsplash.com"],
  },
  i18n: {
    locales: ['en', 'hu'],
    defaultLocale: 'hu',
  },
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
};
