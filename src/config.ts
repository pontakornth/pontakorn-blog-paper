import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://pontakorn.dev/", // replace this with your deployed domain
  author: "Pontakorn Paesaeng",
  desc: "Developers who like reading, writing, and gaming too.",
  title: "Pontakorn's Blog",
  // TODO: Find actual OG image instead
  // ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/pontakornth/",
    linkTitle: `My GitHub`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://th.linkedin.com/in/pontakorn-paesaeng-a461911b6",
    linkTitle: `My LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:pontakorn.psng@gmail.com",
    linkTitle: `Send an email to me`,
    active: false,
  },
];
