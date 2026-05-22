export type StrategySlide = {
  id: string;
  name: string;
  date: string;
  country: string;
  description: string;
  gradient: string;
  src?: string;
};

export const strategySlides: StrategySlide[] = [
  {
    id: "st-1",
    name: "Mobile Bar Market Research",
    date: "2026",
    country: "USA",
    description:
      "An in-depth analysis of the mobile bar market across New York and the tri-state area, covering pricing structures, operational models, advertising approaches and emerging search trends.",
    gradient: "linear-gradient(155deg, #2a2a2a 20%, #ff4d6d 95%)",
    src: "/strategy/1/Strategy-01.webp",
  },
  {
    id: "st-2",
    name: "Nest",
    date: "2025",
    country: "Israel",
    description:
      "Marketing overview and brand positioning for a café concept in Tel Aviv designed for young parents, focused on audience behavior, communication tone and community-oriented identity.",
    gradient: "linear-gradient(145deg, #1a1a1a 30%, #8b2635 100%)",
    src: "/strategy/2/Strategy-02.webp",
  },
  {
    id: "st-3",
    name: "Proyecto Indigeno",
    date: "2026",
    country: "USA/Ecuador",
    description:
      "Brand positioning and communication strategy for a plant medicine retreat in Ecuador, focused on building a calm, grounded alternative to overly mystical wellness branding.",
    gradient: "linear-gradient(160deg, #222 35%, #ff758f 100%)",
    src: "/strategy/3/Strategy-03.webp",
  },
  {
    id: "st-4",
    name: "Cocktail Express Catering",
    date: "2022",
    country: "Russia",
    description:
      "A detailed photo and video production guideline for a bar catering company in Moscow, defining visual tone, shooting structure and content direction across platforms.",
    gradient: "linear-gradient(150deg, #0f0f0f 25%, #6ec8ff 100%)",
    src: "/strategy/4/Strategy-04.webp",
  },
  {
    id: "st-5",
    name: "Fats",
    date: "2025",
    country: "USA",
    description:
      "Visual identity, guest experience logic and market positioning for a jazz bar in New York, shaping a distinct cultural tone and audience perception.",
    gradient: "linear-gradient(165deg, #151515 40%, #ffb347 100%)",
    src: "/strategy/5/Strategy-05.webp",
  },
  {
    id: "st-6",
    name: "Kult",
    date: "2025",
    country: "USA",
    description:
      "Market analysis, marketing strategy and communication framework for a New York nail salon, including guest engagement logic and social media direction.",
    gradient: "linear-gradient(140deg, #1a1a1a 30%, #e85d04 95%)",
    src: "/strategy/6/Strategy-06.webp",
  },
  {
    id: "st-7",
    name: "Cringe",
    date: "2025",
    country: "Georgia",
    description:
      "Launch strategy for a nightlife venue in Tbilisi, covering pop-up events, offline promotion, collaborations and guerrilla marketing tactics to build early audience engagement.",
    gradient: "linear-gradient(150deg, #1a1a1a 35%, #ee5d9c 95%)",
    src: "/strategy/7/Strategy-7.webp",
  },
];

export function getStrategyMetaText(slide: StrategySlide): string {
  return `Project Name: ${slide.name}\nDate: ${slide.date}\nCountry: ${slide.country}`;
}
