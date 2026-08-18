/**
 * Central map of media assets.
 *
 * For now these point at the live kartalucia.com (Framer) CDN so the rebuild
 * matches the original pixel-for-pixel. Swap these for your own hosted assets
 * later (drop files in /public and change the paths here) — nothing else needs
 * to change.
 *
 * NOTE: Some assets (portfolio spiral clips, ecosystem BTS clips, the full
 * partner-logo set) lazy-load on the original site and are harvested from the
 * live DOM as each section is built. Extend the arrays below as needed.
 */

const CDN = "https://framerusercontent.com";

export const assets = {
  heroVideo: `${CDN}/assets/dyPaPlBdqqtscTq3LGPgm5jPH9c.mp4`,
  altVideo: `${CDN}/assets/88YT6Z2moYBbon529WtjZBj8.mp4`,

  // Preloader mark (Framer serves the spinning logo as a gif)
  preloaderGif: `${CDN}/images/vBUdEn6sqaxqyNHCvdvoBn4OQ.gif`,

  // Partner / client logos (transparent) — harvested from the live site
  partnerLogos: [
    `${CDN}/images/B6rf6yLS9jB7Y36CyXFiL0t3aZI.svg`,
    `${CDN}/images/ekJOy0Dk8B0nlYk38WBOPuBU.svg`,
    `${CDN}/images/gHJrbFKAXfHcbOAJIz6prP4Qs6k.svg`,
    `${CDN}/images/a7qLgTjSnUPvQvtRhlF2CmYamQ.svg`,
    `${CDN}/images/745OXOGx1sZqS17RkTBgowWlrDE.svg`,
    `${CDN}/images/pdiB7RXz9QaVtQyJuq37pk6F4g.svg`,
    `${CDN}/images/BO680ZkbfY5E3Stba3lSSP1Lks.svg`,
    `${CDN}/images/HXy4cc3LchNgEqXo3TZP6TCU0.png`,
    `${CDN}/images/GYG7w8mue3zAgTmoIOHwPDI5s.png`,
  ],

  // Portfolio carousel clips (placeholder set — refine with real harvested URLs)
  portfolio: [
    `${CDN}/assets/dyPaPlBdqqtscTq3LGPgm5jPH9c.mp4`,
    `${CDN}/assets/88YT6Z2moYBbon529WtjZBj8.mp4`,
    `${CDN}/assets/dyPaPlBdqqtscTq3LGPgm5jPH9c.mp4`,
    `${CDN}/assets/88YT6Z2moYBbon529WtjZBj8.mp4`,
    `${CDN}/assets/dyPaPlBdqqtscTq3LGPgm5jPH9c.mp4`,
  ],

  // BTS clips shown on the right of each ecosystem card (index-aligned to cards)
  ecosystem: [
    `${CDN}/assets/88YT6Z2moYBbon529WtjZBj8.mp4`,
    `${CDN}/assets/dyPaPlBdqqtscTq3LGPgm5jPH9c.mp4`,
    `${CDN}/assets/88YT6Z2moYBbon529WtjZBj8.mp4`,
    `${CDN}/assets/dyPaPlBdqqtscTq3LGPgm5jPH9c.mp4`,
    `${CDN}/assets/88YT6Z2moYBbon529WtjZBj8.mp4`,
  ],
};

export type Assets = typeof assets;
