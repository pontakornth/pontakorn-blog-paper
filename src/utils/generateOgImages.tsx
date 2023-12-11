import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

const fetchFonts = async () => {
  // For some reason, it cannot get import.meta.url in the build time
  // I ran out of idea for now.
  // I don't know if there is any safe place that I can just download ttf for Thai fonts, so I just use GitHub as temporary CDN

  // Regular Font
  // const fontRegularUrl = new URL(
  //   "../assets/fonts/IBMPlexSansThai-Regular.ttf",
  //   import.meta.url
  // );
  // const fontRegular = await fs.readFile(fontRegularUrl);
  const fontFileRegular = await fetch(
    "https://cdn.jsdelivr.net/gh/pontakornth/pontakorn-blog-paper/src/assets/fonts/IBMPlexSansThai-Regular.ttf"
  );
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

  // Bold Font
  // const fontBoldUrl = new URL(
  //   "../assets/fonts/IBMPlexSansThai-Bold.ttf",
  //   import.meta.url
  // );
  // const fontBold = await fs.readFile(fontBoldUrl);
  const fontFileBold = await fetch(
    "https://cdn.jsdelivr.net/gh/pontakornth/pontakorn-blog-paper/src/assets/fonts/IBMPlexSansThai-Bold.ttf"
  );
  const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

  return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await fetchFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  // Thai font support
  embedFont: true,
  fonts: [
    {
      name: "IBM Plex Sans Thai",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Sans Thai",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
