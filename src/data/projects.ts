export interface Project {
  title: string;
  href: string;
  linkText: string;
  image?: string;
  imageAltText?: string;
  years: string;
  badge?: string;
  description: string[];
  external?: boolean;
}

export const projects: Project[] = [
  {
    title: "Sudoku for iPhone & iPad",
    href: "/sudoku/",
    linkText: "Download Sudoku",
    image: "/images/sudoku-screenshot.png",
    imageAltText: "Screenshot of the app Sudoku by Edvin Lindén",
    years: "2026 –",
    description: [
      "I have been playing a lot of Sudoku on my phone, but all the apps I tried were either full of ads or required a purchase.",
      "So I decided to create my own - a free Sudoku app without ads, push notifications or unneccisary experience points.",
      "I just want to pick up my phone, play some Sudoku and then go on with my life.",
    ],
  },
  {
    title: "Box Timer – Workout Timer",
    href: "https://boxtimer.app/?ref=edvinlinden.se",
    linkText: "Download Box Timer",
    image: "/images/boxtimer-screenshot.png",
    imageAltText: "Screenshot of the app Box Timer by Edvin Lindén",
    years: "2021 –",
    external: true,
    description: [
      "2020 was a strange year to say the least, it forced a lot of us to workout at home or outside. Due to the situation I went looking for a good workout timer to keep track of my workouts.",
      "All the apps I tested was either too complicated, bloated with features or had way too many ads(let's face it, no one likes ads). So I took it upon myself to create a simple workout timer, free from ads and unnecessary features.",
    ],
  },
  {
    title: "The Impossible Safe",
    href: "/the-impossible-safe/",
    linkText: "Download The Impossible Safe",
    image: "/images/the-impossible-safe-screenshot.webp",
    imageAltText: "Screenshot of the app The Impossible Safe by Edvin Lindén",
    years: "2022 –",
    description: [
      "A safe cracking game for iPhone inspired by the Apple Watch game Break This Safe from Rafael Conde.",
      "The project was my second one using Swift and it's based around the haptic feedback in the iPhone. By feeling different vibrations you'll be able to find the correct combination to the safe.",
    ],
  },
  {
    title: "Killedby.tech",
    href: "https://github.com/edvinlinden/killedby.tech/?ref=edvinlinden.se",
    linkText: "Killedby.tech on GitHub",
    years: "2022 – 2025",
    badge: "Deprecated",
    external: true,
    description: [
      "We all know about the Google Graveyard, the list of products that Google have discontinued through the years.",
      "While stumbling over a graveyard dedicated for Microsoft I was inspired to create a page where discontinued products from all major tech companies where listed.",
    ],
  },
];
