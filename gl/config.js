const CDN = "https://framerusercontent.com";

export const config = {
  // Helix
  radius: 3.8,
  pitch: 1.27,
  angleStep: -0.8,
  curve: 0.0,
  cardWidth: 3. ,
  cardHeight: 2.47,
  cornerRadius: 0.12,
  shingle: 0.055,
  backfaceFade: 0,

  // Atmosphere
  fogNear: 8.0,
  fogFar: 20.6,
  fogStrength: 0,
  depthBlur: 0,
  lift: 0,

  // Camera
  cameraZ: 10,
  fov: 48,

  // Scroll
  wheelStrength: 0.0022,
  dragStrength: 0.007,
  ease: 0.075,
  autoSpin: 0.0,

  // Snap
  snap: true,
  snapSpeed: 0.02,
  snapDelay: 300,
  snapStiffness: 0.04,
  snapDamping: 0.54,

  // Entry — disabled so cards start visible and centred
  entry: false,
  entryDuration: 1050,
  entryStagger: 60,
  entryCurve: 1.0,
  entrySoftness: 0.45,
  entryScale: 9.5,
  entryRound: 1,
  entrySpin: 9.4,
  entrySpinDuration: 2400,
  entryEaseIn: 0.29,
  entryEaseOut: 0.94,
  entryDither: 0.45,
  entryDitherLevels: 4,
  entryDitherDissolve: 1.0,
  entryDitherInk: "#000000",
  entryDitherAccent: "#ffffff",
  entryDitherPaper: "#000000",
  entryDitherGamma: 1.5,
  entryDitherMono: 0.25,

  // Hover — rack focus
  hoverInEase: 0.095,
  hoverOutEase: 0.07,
  hoverCurve: 0.95,
  dimFade: 0.67,
  hoverClean: 1.0,
  hoverIntent: true,
  hoverSettleSpeed: 8,
  focusFalloff: 0.7,

  // Hover blur — disabled
  hoverBlur: 0,
  hoverBlurCurve: 1.0,

  // Hover dither
  hoverDither: 0,
  hoverDitherCurve: 1.9,
  hoverDitherLevels: 8,
  hoverDitherScale: 10,
  hoverDitherCutoff: 0.22,
  hoverDitherInk: "#000000",
  hoverDitherAccent: "#ffffff",
  hoverDitherPaper: "#000000",
  hoverDitherGamma: 1.8,
  hoverDitherMono: 0.22,

  // Click
  clickToFocus: true,
  clickSlop: 6,
  focusDuration: 1300,
  focusEaseIn: 0.35,
  focusEaseOut: 0.98,

  cardBufferScale: 0.5,

  // Motion bend
  bend: 0.0,
  bendMode: "horizontal",
  bendEase: 0.12,
  bendMaxVelocity: 0.07,

  // Edge treatment
  focusSize: 0.25,
  edgePower: 1.65,
  blurStrength: 0,
  streakAngle: 90,
  streakSpread: 4.5,
  streakAnisotropy: 0,

  // Dissolve staging
  coupling: 0.55,
  stageStreakEnd: 0.55,
  stageDitherBegin: 0.45,
  stageHandoff: 0.75,

  // Frame-edge dither
  dither: true,
  ditherAmount: 0,
  ditherStart: 0.64,
  ditherPower: 1.25,
  ditherDepth: 0,
  ditherScale: 7.5,
  maxLevels: 8,
  minLevels: 8,
  fadeStrength: 0,
  ditherInk: "#000000",
  ditherAccent: "#ffffff",
  ditherPaper: "#000000",
  ditherGamma: 1.8,
  ditherMono: 0.22,
  ditherDissolve: 0,

  // Cursor trail
  trail: false,
  trailRadius: 132,
  trailSpeedInfluence: 1,
  trailSpeedRange: 6,
  trailDecay: 0.962,
  trailDissipate: 1.6,
  trailSmoothing: 0.24,
  trailIdleDelay: 220,
  trailIdleDecay: 0.869,
  trailIdleDrift: false,
  trailAmount: 0.78,
  trailCutoff: 0.125,
  trailWarp: 0.36,
  trailAberration: 0,
  trailContrast: 0.77,
  trailScale: 8.5,
  trailLevels: 6,
  trailDissolve: 1.0,
  trailInk: "#1a1a1a",
  trailAccent: "#ffffff",
  trailPaper: "#000000",
  trailGamma: 2.0,
  trailMono: 0.29,
  trailRim: 0,
  trailRimColor: "#ffffff",
  trailRimThickness: 0.3,
  trailRimSoftness: 0.45,

  background: "#000000",
};

const BASE_VIDEOS = [
  `${CDN}/assets/dyPaPlBdqqtscTq3LGPgm5jPH9c.mp4`,
  `${CDN}/assets/88YT6Z2moYBbon529WtjZBj8.mp4`,
];
export const VIDEO_SOURCES = Array.from({ length: 8 }, (_, i) => BASE_VIDEOS[i % BASE_VIDEOS.length]);

// Project labels — indexed against the centred card
export const PROJECTS = [
  "KL Studios",
  "KL Post Labs",
  "KL AI Lab",
  "KL Design Labs",
  "KL Artist Collective",
  "Brand Film",
  "Commercial",
  "Music Video",
];
