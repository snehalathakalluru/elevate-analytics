export type Tag =
  | "Nature"
  | "Abstract"
  | "Characters"
  | "Space"
  | "Fantasy"
  | "Retro"
  | "Horror"
  | "Vehicles"
  | "Animals"
  | "Buildings"
  | "Food"
  | "Sports"
  | "Sci-Fi"
  | "Magic";

export interface PixelArt {
  id: number;
  title: string;
  author: string;
  description: string;
  tags: Tag[];
  likes: number;
  views: number;
  createdAt: string;
  paletteId: number;
}

export const palettes: string[][] = [
  ["#00ffff", "#0080ff", "#001133", "#00ccaa", "#ffffff", "#002266"],
  ["#ff00aa", "#ff6600", "#330011", "#ffcc00", "#660033", "#ff3366"],
  ["#00ff44", "#004411", "#88cc00", "#002200", "#66ff22", "#003300"],
  ["#9900ff", "#220033", "#ff00ff", "#440066", "#cc66ff", "#110022"],
  ["#ffcc00", "#ff6600", "#663300", "#ffee88", "#aa4400", "#221100"],
  ["#aaeeff", "#0044aa", "#ffffff", "#88ccff", "#003388", "#002244"],
  ["#ff2200", "#ff6600", "#220000", "#ffaa00", "#880000", "#ff0044"],
  ["#aaff00", "#00ff66", "#003300", "#ffff00", "#006600", "#001100"],
  ["#ff66aa", "#ffaacc", "#ff0066", "#330011", "#ff99bb", "#660033"],
  ["#004466", "#0088aa", "#00cccc", "#001122", "#006688", "#00ffcc"],
  ["#cc4400", "#ff8844", "#221100", "#884422", "#ffcc88", "#110000"],
  ["#0044ff", "#0088ff", "#000022", "#00ccff", "#002299", "#88ddff"],
  // New palettes 12-17
  ["#ffee00", "#ff8800", "#220e00", "#ffe066", "#ff5500", "#44ff88"], // Animals - warm amber + green accent
  ["#00ffaa", "#0055ff", "#001122", "#88ffcc", "#003388", "#22ffee"], // Buildings - teal + electric blue
  ["#ff3300", "#ffcc00", "#3a1000", "#ff7700", "#ffe066", "#00ff99"], // Food - hot tomato + cheese yellow
  ["#00eeff", "#ff00bb", "#00001a", "#88ffff", "#ff66ee", "#ffff00"], // Sports - electric cyan + magenta
  ["#44ff00", "#00ccff", "#001100", "#aaffcc", "#0088ff", "#ff44ff"], // Sci-Fi - acid green + laser blue
  ["#cc00ff", "#ff44aa", "#110022", "#ff99ff", "#8800cc", "#ffee00"], // Magic - deep violet + gold sparkle
];

export type PatternFn = (row: number, col: number, seed: number) => number;

export const patterns: PatternFn[] = [
  // Pattern 0: Dragon
  (r, c) => {
    const body = r >= 4 && r <= 12 && c >= 3 && c <= 13;
    const wing = r >= 2 && r <= 8 && (c <= 5 || c >= 11);
    const head = r >= 1 && r <= 4 && c >= 6 && c <= 10;
    const eye = r === 2 && (c === 7 || c === 9);
    if (eye) return 5;
    if (head) return 1;
    if (wing) return 2;
    if (body) return 0;
    return 3;
  },
  // Pattern 1: Spaceship
  (r, c) => {
    const ship =
      r >= 3 && r <= 11 && c >= 5 && c <= 11 && Math.abs(c - 8) <= r - 2;
    const cockpit = r >= 5 && r <= 8 && c >= 6 && c <= 10;
    const engine = r >= 11 && r <= 13 && (c === 5 || c === 11);
    const thruster = r >= 13 && r <= 15 && c >= 6 && c <= 10;
    if (cockpit) return 5;
    if (engine) return 1;
    if (thruster) return 2;
    if (ship) return 0;
    return 3;
  },
  // Pattern 2: Castle
  (r, c) => {
    const base = r >= 8 && r <= 15 && c >= 2 && c <= 14;
    const tower1 = r >= 3 && r <= 8 && c >= 2 && c <= 5;
    const tower2 = r >= 3 && r <= 8 && c >= 11 && c <= 14;
    const gate = r >= 10 && r <= 15 && c >= 6 && c <= 10;
    const battlements = r === 3 && c % 2 === 0 && c >= 2 && c <= 14;
    if (battlements) return 5;
    if (gate) return 3;
    if (tower1 || tower2) return 1;
    if (base) return 0;
    return 4;
  },
  // Pattern 3: Tree
  (r, c) => {
    const trunk = r >= 10 && r <= 15 && c >= 6 && c <= 10;
    const crown = r < 10 && Math.abs(c - 8) <= (10 - r) / 2;
    const fruit = crown && (r + c) % 5 === 0;
    if (fruit) return 5;
    if (crown) return 0;
    if (trunk) return 1;
    return 4;
  },
  // Pattern 4: Robot
  (r, c) => {
    const head = r >= 1 && r <= 5 && c >= 4 && c <= 12;
    const body = r >= 6 && r <= 11 && c >= 3 && c <= 13;
    const eye = r === 3 && (c === 6 || c === 10);
    const mouth = r === 5 && c >= 5 && c <= 11;
    const arm = r >= 7 && r <= 10 && (c <= 2 || c >= 14);
    const antenna = r <= 1 && c === 8;
    if (antenna || eye) return 5;
    if (mouth) return 1;
    if (arm) return 2;
    if (head) return 0;
    if (body) return 3;
    return 4;
  },
  // Pattern 5: Planet
  (r, c) => {
    const cx = 8;
    const cy = 8;
    const r2 = 6;
    const dist = Math.sqrt((c - cx) ** 2 + (r - cy) ** 2);
    const ring = Math.abs(dist - 8.5) < 1.5 && Math.abs(r - cy) < 3;
    const planet = dist < r2;
    const crater = planet && ((r === 6 && c === 7) || (r === 9 && c === 10));
    const cloud =
      planet &&
      ((r === 5 && c >= 8 && c <= 11) || (r === 11 && c >= 5 && c <= 8));
    if (crater) return 5;
    if (ring) return 2;
    if (cloud) return 1;
    if (planet) return 0;
    return 3;
  },
  // Pattern 6: Skull
  (r, c) => {
    const head = r <= 11 && Math.sqrt((c - 8) ** 2 + (r - 6) ** 2) < 6;
    const jaw = r >= 9 && r <= 14 && c >= 4 && c <= 12;
    const eye =
      r >= 4 && r <= 6 && ((c >= 4 && c <= 6) || (c >= 10 && c <= 12));
    const nose = r >= 7 && r <= 8 && c >= 7 && c <= 9;
    const teeth = r >= 11 && r <= 13 && c >= 4 && c <= 12 && c % 2 === 0;
    if (eye || nose) return 3;
    if (teeth) return 5;
    if (head || jaw) return 0;
    return 4;
  },
  // Pattern 7: Car
  (r, c) => {
    const body = r >= 7 && r <= 12 && c >= 1 && c <= 15;
    const top = r >= 4 && r <= 7 && c >= 4 && c <= 12;
    const wheel =
      r >= 11 && r <= 14 && ((c >= 2 && c <= 5) || (c >= 11 && c <= 14));
    const window =
      r >= 5 && r <= 7 && ((c >= 5 && c <= 7) || (c >= 9 && c <= 11));
    const headlight = r >= 8 && r <= 10 && (c <= 2 || c >= 14);
    if (window) return 5;
    if (wheel) return 3;
    if (headlight) return 1;
    if (top) return 2;
    if (body) return 0;
    return 4;
  },
  // Pattern 8: Mushroom
  (r, c) => {
    const stem = r >= 10 && r <= 15 && c >= 5 && c <= 11;
    const cap = r < 10 && Math.sqrt((c - 8) ** 2 + (r - 8) ** 2 * 0.6) < 6;
    const spot =
      cap &&
      ((r === 4 && c === 6) || (r === 5 && c === 10) || (r === 7 && c === 7));
    const stemDetail = stem && c % 2 === 0;
    if (spot) return 5;
    if (cap) return 1;
    if (stemDetail) return 2;
    if (stem) return 0;
    return 3;
  },
  // Pattern 9: Wave
  (r, c, seed) => {
    const wave = Math.sin((c + seed * 0.5) * 0.8) * 3 + 8;
    const foam = Math.abs(r - wave) < 1;
    const water = r > wave;
    const deep = r > wave + 3;
    if (foam) return 5;
    if (deep) return 3;
    if (water) return 0;
    return 4;
  },
  // Pattern 10: Crystal
  (r, c) => {
    const cx = 8;
    const crystal1 =
      c >= cx - 2 &&
      c <= cx + 2 &&
      r >= 2 &&
      r <= 14 &&
      Math.abs(c - cx) <= (14 - r) / 2;
    const crystal2 = c >= cx - 5 && c <= cx - 3 && r >= 5 && r <= 14;
    const crystal3 = c >= cx + 3 && c <= cx + 5 && r >= 5 && r <= 14;
    const shine = crystal1 && r <= 5 && c === cx - 1;
    if (shine) return 5;
    if (crystal1) return 0;
    if (crystal2) return 1;
    if (crystal3) return 2;
    return 4;
  },
  // Pattern 11: Fox
  (r, c) => {
    const body = r >= 7 && r <= 14 && c >= 3 && c <= 13;
    const head = r >= 3 && r <= 8 && c >= 4 && c <= 12;
    const ear1 = r >= 1 && r <= 4 && c >= 4 && c <= 6;
    const ear2 = r >= 1 && r <= 4 && c >= 10 && c <= 12;
    const eye = r === 5 && (c === 6 || c === 10);
    const nose = r === 7 && c === 8;
    const tail = r >= 9 && r <= 14 && c >= 13 && c <= 15;
    if (eye || nose) return 5;
    if (ear1 || ear2) return 1;
    if (tail) return 2;
    if (head || body) return 0;
    return 4;
  },
  // Pattern 12: Bird (wings spread, beak, tail)
  (r, c) => {
    const body = r >= 6 && r <= 10 && c >= 5 && c <= 11;
    const wingL = r >= 5 && r <= 8 && c >= 1 && c <= 5 && r + c <= 12;
    const wingR = r >= 5 && r <= 8 && c >= 11 && c <= 15 && r - c <= -8;
    const head = r >= 3 && r <= 6 && c >= 7 && c <= 10;
    const beak = r === 4 && (c === 11 || c === 12);
    const tail =
      r >= 9 && r <= 13 && c >= 6 && c <= 10 && Math.abs(c - 8) <= 13 - r;
    const eye = r === 4 && c === 9;
    if (eye) return 5;
    if (beak) return 4;
    if (head) return 1;
    if (wingL || wingR) return 2;
    if (tail) return 3;
    if (body) return 0;
    return 4;
  },
  // Pattern 13: House (roof triangle, walls, door, windows)
  (r, c) => {
    const wall = r >= 8 && r <= 15 && c >= 3 && c <= 13;
    const roof = r >= 2 && r <= 8 && Math.abs(c - 8) <= 8 - r;
    const door = r >= 11 && r <= 15 && c >= 6 && c <= 10;
    const winL = r >= 9 && r <= 11 && c >= 4 && c <= 6;
    const winR = r >= 9 && r <= 11 && c >= 10 && c <= 12;
    const chimney = r >= 1 && r <= 4 && c >= 11 && c <= 12;
    if (chimney) return 3;
    if (winL || winR) return 5;
    if (door) return 2;
    if (roof) return 1;
    if (wall) return 0;
    return 4;
  },
  // Pattern 14: Pizza (circle shape, slice lines, toppings dots)
  (r, c) => {
    const cx = 8;
    const cy = 8;
    const dist = Math.sqrt((c - cx) ** 2 + (r - cy) ** 2);
    const crust = dist >= 5.5 && dist < 7;
    const cheese = dist < 5.5;
    const sliceLine =
      cheese &&
      (Math.abs(r - cy) < 0.6 ||
        Math.abs(c - cx) < 0.6 ||
        Math.abs(Math.abs(r - cy) - Math.abs(c - cx)) < 0.8);
    const topping =
      cheese &&
      !sliceLine &&
      ((r === 5 && c === 6) ||
        (r === 6 && c === 10) ||
        (r === 9 && c === 7) ||
        (r === 10 && c === 11) ||
        (r === 7 && c === 5));
    if (topping) return 5;
    if (sliceLine) return 3;
    if (crust) return 1;
    if (cheese) return 0;
    return 4;
  },
  // Pattern 15: Trophy (cup shape, base, handles, star on cup)
  (r, c) => {
    const base = r >= 13 && r <= 15 && c >= 4 && c <= 12;
    const stem = r >= 11 && r <= 13 && c >= 7 && c <= 9;
    const cup =
      r >= 4 &&
      r <= 11 &&
      c >= 4 &&
      c <= 12 &&
      Math.abs(c - 8) <= (11 - r) * 0.6 + 2;
    const handle = r >= 6 && r <= 10 && (c === 3 || c === 13) && cup === false;
    const rim = r === 4 && c >= 4 && c <= 12;
    const star =
      cup &&
      ((r === 7 && c === 8) ||
        (r === 6 && c === 7) ||
        (r === 6 && c === 9) ||
        (r === 8 && c === 7) ||
        (r === 8 && c === 9));
    if (star) return 5;
    if (rim) return 4;
    if (handle) return 2;
    if (cup) return 0;
    if (stem) return 1;
    if (base) return 3;
    return 4;
  },
  // Pattern 16: UFO (saucer disk shape, dome on top, beam below, lights)
  (r, c) => {
    const dome =
      r >= 3 && r <= 7 && Math.sqrt((c - 8) ** 2 + (r - 7) ** 2 * 1.8) < 3.2;
    const disk = r >= 7 && r <= 9 && Math.abs(c - 8) <= 6 - (r - 7);
    const beam =
      r >= 9 &&
      r <= 15 &&
      Math.abs(c - 8) <= (r - 9) * 0.9 + 1 &&
      (r + c) % 2 === 0;
    const light =
      r === 8 && (c === 4 || c === 6 || c === 8 || c === 10 || c === 12);
    if (light) return 5;
    if (dome) return 1;
    if (disk) return 0;
    if (beam) return 2;
    return 3;
  },
  // Pattern 17: Wizard (tall hat, robe body, staff, magic sparkles)
  (r, c) => {
    const hat =
      r >= 1 &&
      r <= 6 &&
      c >= 5 &&
      c <= 11 &&
      Math.abs(c - 8) <= (6 - r) * 0.7 + 1;
    const hatBrim = r === 6 && c >= 4 && c <= 12;
    const robe = r >= 7 && r <= 15 && Math.abs(c - 8) <= (r - 7) * 0.55 + 2;
    const staff = c === 13 && r >= 5 && r <= 14;
    const staffTop = r >= 3 && r <= 5 && c >= 12 && c <= 14;
    const star =
      (r === 2 && c === 3) ||
      (r === 3 && c === 5) ||
      (r === 5 && c === 2) ||
      (r === 8 && c === 14) ||
      (r === 10 && c === 15) ||
      (r === 12 && c === 2);
    if (star) return 5;
    if (staffTop) return 4;
    if (staff) return 3;
    if (hatBrim) return 1;
    if (hat) return 2;
    if (robe) return 0;
    return 4;
  },
];

export const mockArtworks: PixelArt[] = [
  {
    id: 1,
    title: "Neon Dragon",
    author: "pixelwitch",
    description:
      "A fearsome dragon rendered in neon hues, breathing electric fire across the night sky.",
    tags: ["Fantasy", "Characters"],
    likes: 342,
    views: 2841,
    createdAt: "2026-02-14",
    paletteId: 0,
  },
  {
    id: 2,
    title: "Galaxy Racer",
    author: "starforge",
    description: "A sleek spacecraft slicing through the cosmos at warp speed.",
    tags: ["Space", "Vehicles"],
    likes: 218,
    views: 1502,
    createdAt: "2026-02-20",
    paletteId: 1,
  },
  {
    id: 3,
    title: "Haunted Keep",
    author: "darkpixels",
    description: "An ancient castle looms over a misty valley at midnight.",
    tags: ["Fantasy", "Horror"],
    likes: 189,
    views: 1203,
    createdAt: "2026-02-22",
    paletteId: 2,
  },
  {
    id: 4,
    title: "Elder Willow",
    author: "forestbit",
    description: "A thousand-year-old tree glowing with ancient magic.",
    tags: ["Nature", "Fantasy"],
    likes: 156,
    views: 987,
    createdAt: "2026-02-25",
    paletteId: 3,
  },
  {
    id: 5,
    title: "RX-7000",
    author: "mechpunk",
    description:
      "A retro-futuristic battle robot with glowing optical sensors.",
    tags: ["Characters", "Retro"],
    likes: 275,
    views: 2100,
    createdAt: "2026-02-28",
    paletteId: 4,
  },
  {
    id: 6,
    title: "Kepler-9b",
    author: "cosmobyte",
    description:
      "An alien world with twin rings visible in the upper atmosphere.",
    tags: ["Space", "Abstract"],
    likes: 431,
    views: 3200,
    createdAt: "2026-03-01",
    paletteId: 5,
  },
  {
    id: 7,
    title: "Cursed Skull",
    author: "darkpixels",
    description: "The ominous grin of a pixelated skull from the underworld.",
    tags: ["Horror", "Characters"],
    likes: 198,
    views: 1450,
    createdAt: "2026-03-02",
    paletteId: 6,
  },
  {
    id: 8,
    title: "Pixel Roadster",
    author: "racebit",
    description:
      "A classic 8-bit sports car ready to burn rubber on neon streets.",
    tags: ["Vehicles", "Retro"],
    likes: 143,
    views: 876,
    createdAt: "2026-03-03",
    paletteId: 7,
  },
  {
    id: 9,
    title: "Magic Spore",
    author: "forestbit",
    description: "A glowing mushroom from an enchanted forest floor.",
    tags: ["Nature", "Fantasy"],
    likes: 321,
    views: 2400,
    createdAt: "2026-03-04",
    paletteId: 8,
  },
  {
    id: 10,
    title: "Ocean Pulse",
    author: "wavemaker",
    description: "Hypnotic waves crash across a pixelated seascape.",
    tags: ["Nature", "Abstract"],
    likes: 267,
    views: 1890,
    createdAt: "2026-03-05",
    paletteId: 9,
  },
  {
    id: 11,
    title: "Prism Shard",
    author: "crystalcoder",
    description:
      "Fractured crystal formations catching and splitting neon light.",
    tags: ["Abstract"],
    likes: 389,
    views: 2750,
    createdAt: "2026-03-06",
    paletteId: 10,
  },
  {
    id: 12,
    title: "Ember Fox",
    author: "pixelwitch",
    description: "A cunning fox with a coat as bright as burning embers.",
    tags: ["Nature", "Characters"],
    likes: 502,
    views: 4100,
    createdAt: "2026-03-07",
    paletteId: 11,
  },
  {
    id: 13,
    title: "Sunrise Sparrow",
    author: "wingpixel",
    description:
      "A pixel sparrow soaring through dawn light, wings fully spread.",
    tags: ["Animals"],
    likes: 284,
    views: 1930,
    createdAt: "2026-03-08",
    paletteId: 12,
  },
  {
    id: 14,
    title: "Neon Bungalow",
    author: "archbyte",
    description: "A cozy pixel house glowing under a neon skyline.",
    tags: ["Buildings"],
    likes: 197,
    views: 1420,
    createdAt: "2026-03-09",
    paletteId: 13,
  },
  {
    id: 15,
    title: "Slice of Paradise",
    author: "foodpixel",
    description: "A perfectly rendered pixel pizza with all the neon toppings.",
    tags: ["Food"],
    likes: 463,
    views: 3560,
    createdAt: "2026-03-10",
    paletteId: 14,
  },
  {
    id: 16,
    title: "Gold Cup",
    author: "champbit",
    description:
      "The ultimate pixel trophy, earned through countless 8-bit battles.",
    tags: ["Sports"],
    likes: 311,
    views: 2200,
    createdAt: "2026-03-11",
    paletteId: 15,
  },
  {
    id: 17,
    title: "Zeta Harvester",
    author: "cosmobyte",
    description: "An alien saucer scanning the surface with its tractor beam.",
    tags: ["Sci-Fi", "Space"],
    likes: 528,
    views: 4700,
    createdAt: "2026-03-12",
    paletteId: 16,
  },
  {
    id: 18,
    title: "Arcane Sage",
    author: "spellpixel",
    description:
      "An ancient wizard channeling pure arcane energy through his staff.",
    tags: ["Magic", "Fantasy"],
    likes: 619,
    views: 5200,
    createdAt: "2026-03-13",
    paletteId: 17,
  },
];

export const ALL_TAGS: Tag[] = [
  "Nature",
  "Abstract",
  "Characters",
  "Space",
  "Fantasy",
  "Retro",
  "Horror",
  "Vehicles",
  "Animals",
  "Buildings",
  "Food",
  "Sports",
  "Sci-Fi",
  "Magic",
];
