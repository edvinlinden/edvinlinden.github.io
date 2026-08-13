export interface Project {
  title: string;
  href: string;
  image: string;
  years: string;
  badge?: string;
  description: string[];
  external?: boolean;
}

export const projects: Project[] = [
  {
    title: "Sudoku for iPhone & iPad",
    href: "https://apps.apple.com/us/app/sudoku-puzzle-game-offline/id6757938217?ref=edvinlinden.se",
    image: "/images/sudoku-screenshot.webp",
    years: "2026 – 20░░",
    external: true,
    description: [
      "I have been playing a lot of Sudoku on my phone, but all the apps I tried were either full of ads or required a purchase.",
      "So I decided to create my own - a free Sudoku app without ads, push notifications or unneccisary experience points.",
      "I just want to pick up my phone, play some Sudoku and then go on with my life.",
    ],
  },
  {
    title: "Killedby.tech",
    href: "https://github.com/edvinlinden/killedby.tech/?ref=edvinlinden.se",
    image: "/images/killedbytech-2023-compressed.webp",
    years: "2022 – 2025",
    badge: "Deprecated",
    external: true,
    description: [
      "We all know about the Google Graveyard, the list of products that Google have discontinued through the years.",
      "While stumbling over a graveyard dedicated for Microsoft I was inspired to create a page where discontinued products from all major tech companies where listed.",
    ],
  },
  {
    title: "The Impossible Safe",
    href: "/the-impossible-safe/",
    image: "/images/impossiblesafe-screenshot.webp",
    years: "2022 – 20░░",
    description: [
      "A safe cracking game for iPhone inspired by the Apple Watch game Break This Safe from Rafael Conde.",
      "The project was my second one using Swift and it's based around the haptic feedback in the iPhone. By feeling different vibrations you'll be able to find the correct combination to the safe.",
    ],
  },
  {
    title: "Box Timer – Workout Timer",
    href: "https://boxtimer.app/?ref=edvinlinden.se",
    image: "/images/boxtimer-screenshot.webp",
    years: "2021 – 20░░",
    external: true,
    description: [
      "2020 was a strange year to say the least, it forced a lot of us to workout at home or outside. Due to the situation I went looking for a good workout timer to keep track of my workouts.",
      "All the apps I tested was either too complicated, bloated with features or had way too many ads(let's face it, no one likes ads). So I took it upon myself to create a simple workout timer, free from ads and unnecessary features.",
    ],
  },
];
