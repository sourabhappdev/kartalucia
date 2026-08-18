/**
 * All site copy in one place. Edit here to change wording everywhere.
 */

export const brand = {
  name: "Karta Lucia",
  tagline: "Creative Content Lab",
};

export const nav = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact Us", href: "#contact" },
];

export const hero = {
  actions: [
    { label: "About Us", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
  ],
};

export const partners = {
  label: "Creative Partners",
};

export const portfolio = {
  label: "Selected Works",
  heading: ["Creative", "Portfolio"],
  cta: "Explore More",
  ctaHref: "#portfolio",
};

export const about = {
  labelLeft: "About Us",
  labelCenter: "Karta Lucia",
  labelRight: "Creative Content Lab",
  intro: ["//", "Karta Lucia", "Is Our Creative", "Content Lab", "Based In India."],
  mission:
    "We partner with ambitious brands to craft bespoke, cinematic experiences. Our mission is to build immersive brand worlds that create a lasting cultural imprint.",
};

export type EcosystemCard = {
  n: string;
  title: string;
  description: string;
  tags: string[];
};

export const ecosystem = {
  headingLeft: "Ecosystem",
  labelRight: "What We Do",
  cards: [
    {
      n: "1",
      title: "KL Studios",
      description:
        "A full-service film production and photography studio crafting cinematic storytelling and visual experiences.",
      tags: [
        "Direction",
        "Pre-Production",
        "Creative Strategy",
        "Filmmaking",
        "Film Production",
        "Photography",
      ],
    },
    {
      n: "2",
      title: "KL Post Labs",
      description:
        "A precision-driven post-production studio specializing in video editing, color grading, CGI, VFX, and high-end animation.",
      tags: ["Colour Grading", "VFX", "CGI", "Cinematic Editing", "Motion Graphics"],
    },
    {
      n: "3",
      title: "KL AI Lab",
      description:
        "An innovation hub exploring generative AI to create cutting-edge visual content and creative solutions.",
      tags: ["Generative AI", "AI Filmmaking", "AI Production"],
    },
    {
      n: "4",
      title: "KL Design Labs",
      description:
        "A multidisciplinary design and creative direction studio shaping bold visual identities and narratives.",
      tags: ["Brand Strategy", "Brand Identity", "Creative Direction", "Visual Language"],
    },
    {
      n: "5",
      title: "KL Artist Collective",
      description:
        "A curated network managing and nurturing directors, DOPs, photographers, filmmakers, designers, and creative talent.",
      tags: ["Artist Management", "Talent", "Legal & Compliance", "Creative Careers"],
    },
  ] as EcosystemCard[],
};

export const social = {
  label: "Social",
  links: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Behance", href: "#" },
    { label: "Vimeo", href: "#" },
  ],
};

export const contact = {
  label: "Get in touch",
  heading: "Let's Connect",
  subheading: "Drop us a line — project, collab, or just a hello.",
  addressLabel: "Address",
  address: "Mumbai, India",
  submit: "Submit Now",
};

export const team = {
  label: "Meet Our Team",
  members: [
    {
      name: "Sourabh Sharma",
      role: "Founder & Creative Director",
      description:
        "Visionary storyteller driving the creative direction and production strategy behind every Karta Lucia project.",
      initials: "SS",
      accent: "#ff462e",
    },
    {
      name: "Arjun Mehta",
      role: "Head of Production",
      description:
        "Precision-obsessed producer who transforms bold ideas into flawless cinematic realities on time and on budget.",
      initials: "AM",
      accent: "#af231c",
    },
    {
      name: "Priya Nair",
      role: "Lead Designer",
      description:
        "Multidisciplinary creative shaping visual identities, motion systems, and immersive brand experiences.",
      initials: "PN",
      accent: "#ff6b4a",
    },
  ],
};

export const footer = {
  navTitle: "Navigation",
  nav,
};
