export type BurstParticle = {
  id: string;
  x: number;
  y: number;
  /** Longest edge in px; the other edge follows aspectRatio or the image file. */
  size: number;
  /** Width divided by height. Omit when using src — read from the image on load. */
  aspectRatio?: number;
  /** Path under /public, e.g. /identities/p1-a.jpg */
  src?: string;
  gradient?: string;
  rotation: number;
};

export type IdentityProject = {
  id: string;
  label: string;
  name: string;
  date: string;
  country: string;
  scope: string;
  description: string;
  brandColor: string;
  backgroundGradient?: string;
  gradient: string;
  thumbGradient: string;
  iconSrc: string;
  blastImages: string[];
  frameImages: string[];
  particles: BurstParticle[];
};

export const identityProjects: IdentityProject[] = [
  {
    id: "p1",
    label: "Mark",
    name: "Proyecto Indigeno",
    date: "2026",
    country: "USA/Ecuador",
    scope: "Visual identity, website, communication",
    description:
      "A visual identity for a plant medicine retreat in Ecuador, built around the geometry of the Andean Chakana cross.\n\nThe system combines restrained typography, earthy tones and modular graphic structures to position the project away from the visual clichés of contemporary spiritual branding.\n\nDesigned across identity, website and communication systems.",
    brandColor: "#24212d",
    backgroundGradient: "linear-gradient(to top, #141319, #24212d)",
    gradient: "linear-gradient(160deg, #1a1a1a 20%, #e63946 95%)",
    thumbGradient: "linear-gradient(160deg, #1a1a1a 30%, #c92a38 100%)",
    iconSrc: "/Identities projects/01 - Proyecto Indigeno/Icon-1.webp",
    blastImages: [
      "/Identities projects/01 - Proyecto Indigeno/Blast-1.webp",
      "/Identities projects/01 - Proyecto Indigeno/Blast-2.webp",
      "/Identities projects/01 - Proyecto Indigeno/Blast-4.webp",
      "/Identities projects/01 - Proyecto Indigeno/Blast-5.webp",
      "/Identities projects/01 - Proyecto Indigeno/Blast-6.webp",
    ],
    frameImages: [
      "/Identities projects/01 - Proyecto Indigeno/Frame-1.webp",
      "/Identities projects/01 - Proyecto Indigeno/frame-2.webp",
      "/Identities projects/01 - Proyecto Indigeno/frame-3.webp",
      "/Identities projects/01 - Proyecto Indigeno/frame-4.webp",
      "/Identities projects/01 - Proyecto Indigeno/frame-5.webp",
      "/Identities projects/01 - Proyecto Indigeno/frame-6.webp",
      "/Identities projects/01 - Proyecto Indigeno/frame-7.webp",
      "/Identities projects/01 - Proyecto Indigeno/frame-8.webp",
      "/Identities projects/01 - Proyecto Indigeno/frame-9.webp",
      "/Identities projects/01 - Proyecto Indigeno/frame-10.webp",
    ],
    particles: [
      { id: "p1-a", x: 8, y: 14, size: 96, src: "/Identities projects/01 - Proyecto Indigeno/Blast-1.webp", rotation: -8 },
      { id: "p1-b", x: 82, y: 18, size: 72, src: "/Identities projects/01 - Proyecto Indigeno/Blast-2.webp", rotation: 12 },
      { id: "p1-c", x: 6, y: 62, size: 64, src: "/Identities projects/01 - Proyecto Indigeno/Blast-4.webp", rotation: 6 },
      { id: "p1-d", x: 88, y: 58, size: 110, src: "/Identities projects/01 - Proyecto Indigeno/Blast-5.webp", rotation: -14 },
      { id: "p1-e", x: 72, y: 78, size: 56, src: "/Identities projects/01 - Proyecto Indigeno/Blast-6.webp", rotation: 18 },
    ],
  },
  {
    id: "p2",
    label: "Type",
    name: "Cringe",
    date: "2025",
    country: "Georgia",
    scope: "Identity, interior concept, launch strategy, marketing, event graphics, menu design",
    description:
      "A nightlife and cultural space in Tbilisi with a flexible identity system built around a recurring burning heart symbol.\n\nThe identity shifts with each event, reinterpreting its visual language through a loud and unstable system influenced by Y2K and 90s design culture.\n\nDesigned to support constant transformation while maintaining a recognizable core.",
    brandColor: "#eaa7c1",
    backgroundGradient: "linear-gradient(to top, #ee5d9c, #fffbd8)",
    gradient: "linear-gradient(to top, #ee5d9c, #fffbd8)",
    thumbGradient: "linear-gradient(145deg, #111 30%, #40916c 100%)",
    iconSrc: "/Identities projects/02 - Cringe/Icon-2.webp",
    blastImages: [
      "/Identities projects/02 - Cringe/Blast-1.webp",
      "/Identities projects/02 - Cringe/Blast-2.webp",
      "/Identities projects/02 - Cringe/Blast-3.webp",
      "/Identities projects/02 - Cringe/Blast-4.webp",
      "/Identities projects/02 - Cringe/Blast-5.webp",
    ],
    frameImages: [
      "/Identities projects/02 - Cringe/Frame-1.webp",
      "/Identities projects/02 - Cringe/Frame-2.webp",
      "/Identities projects/02 - Cringe/Frame-3.webp",
      "/Identities projects/02 - Cringe/Frame-4.webp",
      "/Identities projects/02 - Cringe/Frame-5.webp",
      "/Identities projects/02 - Cringe/Frame-6.webp",
      "/Identities projects/02 - Cringe/Frame-7.webp",
      "/Identities projects/02 - Cringe/Frame-8.webp",
      "/Identities projects/02 - Cringe/Frame-9.webp",
      "/Identities projects/02 - Cringe/Frame-10.webp",
      "/Identities projects/02 - Cringe/Frame-11.webp",
    ],
    particles: [
      { id: "p2-a", x: 10, y: 22, size: 80, src: "/Identities projects/02 - Cringe/Blast-1.webp", rotation: 10 },
      { id: "p2-b", x: 78, y: 12, size: 98, src: "/Identities projects/02 - Cringe/Blast-2.webp", rotation: -6 },
      { id: "p2-c", x: 14, y: 72, size: 68, src: "/Identities projects/02 - Cringe/Blast-3.webp", rotation: -12 },
      { id: "p2-d", x: 85, y: 68, size: 74, src: "/Identities projects/02 - Cringe/Blast-4.webp", rotation: 8 },
      { id: "p2-e", x: 48, y: 8, size: 52, src: "/Identities projects/02 - Cringe/Blast-5.webp", rotation: 15 },
      { id: "p2-f", x: 62, y: 82, size: 86, src: "/Identities projects/02 - Cringe/Blast-1.webp", rotation: -10 },
    ],
  },
  {
    id: "p3",
    label: "Voice",
    name: "Oyster Bar",
    date: "2025",
    country: "Israel",
    scope: "Visual Identity",
    description:
      "A visual identity for an oyster bar in Israel.\n\nThe logo combines references to a wine glass, oyster shell, menorah and setting sun into a single compact symbol.\n\nPearlescent and deep green tones create a balance between a refined, posh atmosphere and a handmade, tactile feel. The mark is designed to function across both digital and physical applications, including packaging and stickers.",
    brandColor: "#2b3636",
    gradient: "linear-gradient(155deg, #1c1c1c 25%, #8fbc3f 95%)",
    thumbGradient: "linear-gradient(155deg, #1c1c1c 35%, #c9f06a 95%)",
    iconSrc: "/Identities projects/03 - Oyster/Icon-3.webp",
    blastImages: [
      "/Identities projects/03 - Oyster/Blast-1.webp",
      "/Identities projects/03 - Oyster/Blast-2.webp",
      "/Identities projects/03 - Oyster/Blast-3.webp",
      "/Identities projects/03 - Oyster/Blast-4.webp",
    ],
    frameImages: [
      "/Identities projects/03 - Oyster/Frame-1.webp",
      "/Identities projects/03 - Oyster/Frame-2.webp",
      "/Identities projects/03 - Oyster/Frame-3.webp",
      "/Identities projects/03 - Oyster/Frame-4.webp",
      "/Identities projects/03 - Oyster/Frame-5.webp",
      "/Identities projects/03 - Oyster/Frame-6.webp",
      "/Identities projects/03 - Oyster/Frame-7.webp",
      "/Identities projects/03 - Oyster/Frame-8.webp",
    ],
    particles: [
      { id: "p3-a", x: 12, y: 16, size: 70, src: "/Identities projects/03 - Oyster/Blast-1.webp", rotation: -5 },
      { id: "p3-b", x: 80, y: 24, size: 90, src: "/Identities projects/03 - Oyster/Blast-2.webp", rotation: 11 },
      { id: "p3-c", x: 5, y: 55, size: 102, src: "/Identities projects/03 - Oyster/Blast-3.webp", rotation: 7 },
      { id: "p3-d", x: 90, y: 70, size: 58, src: "/Identities projects/03 - Oyster/Blast-4.webp", rotation: -16 },
    ],
  },
  {
    id: "p4",
    label: "System",
    name: "Arak Keter",
    date: "2021",
    country: "Russia",
    scope: "Identity, packaging, merchandise, communication, strategy",
    description:
      "A brand identity for an arak producer covering packaging, merchandise, events and communication systems, including strategic positioning for expansion into the US market.\n\nThe system operates between two poles: a restrained, pharmaceutical-like bottle designed for clarity and shelf impact, and an expressive visual layer built around bold red and white graphics.\n\nNaïve, energetic illustrations introduce a raw, street-influenced aesthetic, creating tension between control and expression across all brand touchpoints.",
    brandColor: "#e32213",
    backgroundGradient: "linear-gradient(to top, #e32213, #efeee6)",
    gradient: "linear-gradient(to top, #e32213, #efeee6)",
    thumbGradient: "linear-gradient(140deg, #0f0f0f 40%, #6ec8ff 100%)",
    iconSrc: "/Identities projects/04 - Keter/Icon-4.webp",
    blastImages: [
      "/Identities projects/04 - Keter/blast-1.webp",
      "/Identities projects/04 - Keter/blast-2.webp",
      "/Identities projects/04 - Keter/blast-3.webp",
      "/Identities projects/04 - Keter/blast-4.webp",
    ],
    frameImages: [
      "/Identities projects/04 - Keter/Frame-1.webp",
      "/Identities projects/04 - Keter/Frame-2.webp",
      "/Identities projects/04 - Keter/Frame-3.webp",
      "/Identities projects/04 - Keter/Frame-4.webp",
      "/Identities projects/04 - Keter/Frame-5.webp",
      "/Identities projects/04 - Keter/Frame-6.webp",
      "/Identities projects/04 - Keter/Frame-7.webp",
      "/Identities projects/04 - Keter/Frame-8.webp",
    ],
    particles: [
      { id: "p4-a", x: 7, y: 20, size: 84, src: "/Identities projects/04 - Keter/blast-1.webp", rotation: 9 },
      { id: "p4-b", x: 86, y: 15, size: 66, src: "/Identities projects/04 - Keter/blast-2.webp", rotation: -11 },
      { id: "p4-c", x: 18, y: 78, size: 76, src: "/Identities projects/04 - Keter/blast-3.webp", rotation: 4 },
      { id: "p4-d", x: 75, y: 65, size: 94, src: "/Identities projects/04 - Keter/blast-4.webp", rotation: -8 },
      { id: "p4-e", x: 42, y: 10, size: 48, src: "/Identities projects/04 - Keter/blast-1.webp", rotation: 14 },
    ],
  },
  {
    id: "p5",
    label: "Print",
    name: "Llamita Burrito",
    date: "2021",
    country: "Russia",
    scope: "Identity, spatial concept",
    description:
      "A playful identity system for a Mexican street food brand, centered around a piñata-inspired llama character and animated typography.\n\nThe design focuses on immediate recognition and clarity, prioritizing readability and impact over conceptual depth.\n\nIncludes a 3D interior concept developed without on-site supervision.",
    brandColor: "#f5dc8e",
    gradient: "linear-gradient(165deg, #151515 40%, #e85d04 95%)",
    thumbGradient: "linear-gradient(165deg, #151515 40%, #ffb347 100%)",
    iconSrc: "/Identities projects/05 - Llamita/icon-5.webp",
    blastImages: [
      "/Identities projects/05 - Llamita/blast-1.webp",
      "/Identities projects/05 - Llamita/Blast-2.webp",
      "/Identities projects/05 - Llamita/blast-3.webp",
      "/Identities projects/05 - Llamita/blast-4.webp",
    ],
    frameImages: [
      "/Identities projects/05 - Llamita/Frame-1.webp",
      "/Identities projects/05 - Llamita/Frame-2.webp",
      "/Identities projects/05 - Llamita/Frame-3.webp",
      "/Identities projects/05 - Llamita/Frame-4.webp",
      "/Identities projects/05 - Llamita/Frame-5.webp",
      "/Identities projects/05 - Llamita/Frame-6.webp",
      "/Identities projects/05 - Llamita/Frame-7.webp",
    ],
    particles: [
      { id: "p5-a", x: 9, y: 28, size: 92, src: "/Identities projects/05 - Llamita/blast-1.webp", rotation: -7 },
      { id: "p5-b", x: 84, y: 20, size: 60, src: "/Identities projects/05 - Llamita/Blast-2.webp", rotation: 13 },
      { id: "p5-c", x: 11, y: 68, size: 78, src: "/Identities projects/05 - Llamita/blast-3.webp", rotation: 6 },
      { id: "p5-d", x: 79, y: 74, size: 104, src: "/Identities projects/05 - Llamita/blast-4.webp", rotation: -12 },
    ],
  },
  {
    id: "p6",
    label: "Pack",
    name: "Vinegret",
    date: "2025",
    country: "USA",
    scope: "Identity, event design",
    description:
      "A visual identity for a series of Russian-themed events in New York, inspired by NEP-era Soviet poster design.\n\nA simple yellow triangle and dot form the core of a flexible system that shifts between multiple symbolic interpretations while maintaining a consistent graphic language across all event materials.",
    brandColor: "#cfc0ab",
    gradient: "linear-gradient(130deg, #121212 45%, #7b2cbf 100%)",
    thumbGradient: "linear-gradient(130deg, #121212 45%, #c77dff 100%)",
    iconSrc: "/Identities projects/06 - Vinegret/icon-6.webp",
    blastImages: [
      "/Identities projects/06 - Vinegret/blast-1.webp",
      "/Identities projects/06 - Vinegret/blast-2.webp",
      "/Identities projects/06 - Vinegret/blast-3.webp",
    ],
    frameImages: [
      "/Identities projects/06 - Vinegret/frame-1.webp",
      "/Identities projects/06 - Vinegret/frame-2.webp",
      "/Identities projects/06 - Vinegret/Frame-3.webp",
      "/Identities projects/06 - Vinegret/frame-4.webp",
      "/Identities projects/06 - Vinegret/frame-5.webp",
    ],
    particles: [
      { id: "p6-a", x: 6, y: 18, size: 74, src: "/Identities projects/06 - Vinegret/blast-1.webp", rotation: 10 },
      { id: "p6-b", x: 88, y: 26, size: 88, src: "/Identities projects/06 - Vinegret/blast-2.webp", rotation: -9 },
      { id: "p6-c", x: 15, y: 58, size: 62, src: "/Identities projects/06 - Vinegret/blast-3.webp", rotation: 5 },
      { id: "p6-d", x: 82, y: 62, size: 96, src: "/Identities projects/06 - Vinegret/blast-1.webp", rotation: -15 },
      { id: "p6-e", x: 38, y: 84, size: 54, src: "/Identities projects/06 - Vinegret/blast-2.webp", rotation: 12 },
      { id: "p6-f", x: 58, y: 6, size: 70, src: "/Identities projects/06 - Vinegret/blast-3.webp", rotation: -6 },
    ],
  },
  {
    id: "p7",
    label: "Space",
    name: "Jewish Bar",
    date: "2021-2024",
    country: "Russia",
    scope: "Visual identity, art direction, marketing, operational design",
    description:
      "A visual identity for a Jewish bar in Moscow built around the tension between sacred and commercial, historic and contemporary.\n\nFrom a logo that simultaneously resembles a stained-glass window and a modern app icon to labels referencing niche art movements, the system explores contrasts between cultural memory and present-day nightlife aesthetics.",
    brandColor: "#8ec8dd",
    backgroundGradient: "linear-gradient(to top, #8ec8dd, #f5f5f0)",
    gradient: "linear-gradient(to top, #8ec8dd, #f5f5f0)",
    thumbGradient: "linear-gradient(150deg, #1a1a1a 35%, #8ec8dd 100%)",
    iconSrc: "/Identities projects/07 - Zionist/Icon-7.webp",
    blastImages: [
      "/Identities projects/07 - Zionist/blast - 01.webp",
      "/Identities projects/07 - Zionist/blast - 02.webp",
      "/Identities projects/07 - Zionist/blast - 03.webp",
      "/Identities projects/07 - Zionist/blast - 04.webp",
      "/Identities projects/07 - Zionist/blast - 05.webp",
    ],
    frameImages: [
      "/Identities projects/07 - Zionist/Frame - 01.webp",
      "/Identities projects/07 - Zionist/Frame - 02.webp",
      "/Identities projects/07 - Zionist/Frame - 03.webp",
      "/Identities projects/07 - Zionist/frame - 04.webp",
      "/Identities projects/07 - Zionist/frame - 05.webp",
      "/Identities projects/07 - Zionist/frame - 06.webp",
      "/Identities projects/07 - Zionist/frame - 07.webp",
      "/Identities projects/07 - Zionist/frame -08.webp",
      "/Identities projects/07 - Zionist/frame - 09.webp",
    ],
    particles: [
      { id: "p7-a", x: 8, y: 16, size: 88, src: "/Identities projects/07 - Zionist/blast - 01.webp", rotation: -7 },
      { id: "p7-b", x: 84, y: 22, size: 72, src: "/Identities projects/07 - Zionist/blast - 02.webp", rotation: 11 },
      { id: "p7-c", x: 12, y: 68, size: 64, src: "/Identities projects/07 - Zionist/blast - 03.webp", rotation: 8 },
      { id: "p7-d", x: 90, y: 62, size: 98, src: "/Identities projects/07 - Zionist/blast - 04.webp", rotation: -12 },
      { id: "p7-e", x: 45, y: 82, size: 56, src: "/Identities projects/07 - Zionist/blast - 05.webp", rotation: 15 },
    ],
  },
];

export function getProjectDetailText(project: IdentityProject): string {
  return `Project Name: ${project.name}\nDate: ${project.date}\nCountry: ${project.country}\nScope: ${project.scope}\n\n${project.description}`;
}
