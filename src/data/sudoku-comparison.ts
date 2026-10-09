import {
  appName,
  appStoreUrl,
  developer,
  languages,
} from "./sudoku";

export const pagePath = "/sudoku/which-sudoku-app-is-right-for-you/";
export const markdownPath = "/sudoku/which-sudoku-app-is-right-for-you.md";

export const pageTitle = "Sudoku Apps for iPhone & iPad Compared";

export const pageHeading =
  "Which Sudoku app is right for you? Six iPhone and iPad apps compared";

export const pageDescription =
  "Six Sudoku apps for iPhone and iPad compared on ads, price, difficulty levels, hints and sync, using facts from their App Store listings.";

export const publishedOn = "2026-10-06";
export const modifiedOn = "2026-10-06";

/*
  Every competitor fact below was read from the US App Store on checkedOn.
  Re-check each app now and then, and move checkedOn and modifiedOn forward:
    curl -s "https://itunes.apple.com/lookup?id=<id>&country=us" \
      | python3 -c "import json,sys; a=json.load(sys.stdin)['results'][0]; print(a['formattedPrice'], a['minimumOsVersion'], len(a['languageCodesISO2A']), a['currentVersionReleaseDate'])"
  The lookup does not return ads, in-app purchases or privacy labels. Open the
  listing (sources.listing) and read "Contains: Advertising" under Age Rating,
  the In-App Purchases list and the App Privacy section. Feature cells come from
  the listing description and the developer page in sources.site.
  Icons live in public/images/sudoku/comparison/. To refresh one, take
  artworkUrl512 from the lookup and end the URL in /160x160bb.webp.
  A cell is "Not confirmed" when none of those sources says it. A missing
  "Remove Ads" purchase does not prove an app has no ads.
*/
export const checkedOn = "2026-10-06";

export const notConfirmed = "Not confirmed";

const listing = (id: string) => `https://apps.apple.com/us/app/id${id}`;
const lookup = (id: string) =>
  `https://itunes.apple.com/lookup?id=${id}&country=us`;

export const attributes = [
  { key: "price", label: "Price" },
  { key: "ads", label: "Ads" },
  { key: "purchases", label: "In-app purchases" },
  { key: "subscription", label: "Subscription" },
  { key: "levels", label: "Difficulty levels" },
  { key: "hints", label: "Hints" },
  { key: "notes", label: "Notes" },
  { key: "daily", label: "Daily puzzle" },
  { key: "languages", label: "Languages" },
  { key: "requires", label: "Requires" },
  { key: "updated", label: "Last updated" },
] as const;

export type AttributeKey = (typeof attributes)[number]["key"];

export interface Cell {
  value: string;
  /** Where the value was read, as URLs. Checked on checkedOn. */
  sources: string[];
}

export interface ComparedApp {
  name: string;
  developer: string;
  /** True for the app made by the author of the page. */
  own?: boolean;
  /** The App Store icon, shown beside the name. See the re-check comment above checkedOn. */
  icon: string;
  /** The plain App Store link shown on the page. */
  url: string;
  /** A second page worth linking: the developer's own, or /sudoku/ for mine. */
  more?: { label: string; href: string };
  cells: Record<AttributeKey, Cell>;
  /* The same six fields at about the same length for every app, mine included. */
  brief: {
    what: string;
    money: string;
    difficulty: string;
    offers: string;
    limits: string;
    privacy: string;
  };
}

export const briefLabels: { key: keyof ComparedApp["brief"]; label: string }[] =
  [
    { key: "what", label: "What it is" },
    { key: "money", label: "How it makes money" },
    { key: "difficulty", label: "Difficulty" },
    { key: "offers", label: "What it offers" },
    { key: "limits", label: "Limits" },
    { key: "privacy", label: "App Store privacy label" },
  ];

const classic = {
  listing: listing("1488838275"),
  lookup: lookup("1488838275"),
};

const good = {
  listing: listing("1489118195"),
  lookup: lookup("1489118195"),
  site: "https://www.playgoodsudoku.com/",
  arcadeListing: listing("1551669399"),
  arcadeLookup: lookup("1551669399"),
};

const nyt = {
  listing: listing("307569751"),
  lookup: lookup("307569751"),
  site: "https://help.nytimes.com/360011158491-New-York-Times-Games/360052272251-New-York-Times-Games-Subscription",
};

const brainium = {
  listing: listing("418044512"),
  lookup: lookup("418044512"),
  site: "https://brainium.com/games/sudoku/",
};

const mine = {
  listing: listing("6757938217"),
  lookup: lookup("6757938217"),
  /* src/data/sudoku.ts, which this page renders. */
  site: "https://edvinlinden.se/sudoku/",
};

const sudokuCom = {
  listing: listing("1193508329"),
  lookup: lookup("1193508329"),
  site: "https://easybrain.com/sudoku",
};

export const appleArcadeUrl = "https://www.apple.com/apple-arcade/";

/* Mine first, then the other five alphabetically. The order is not a ranking. */
export const apps: ComparedApp[] = [
  {
    name: appName,
    icon: "/images/sudoku/sudoku-no-ads-unlimited-by-edvin-linden-app-icon.webp",
    developer: developer.name,
    own: true,
    url: appStoreUrl,
    more: { label: `More about ${appName}`, href: "/sudoku/" },
    cells: {
      price: { value: "Free", sources: [mine.lookup] },
      ads: { value: "No", sources: [mine.site] },
      purchases: { value: "None", sources: [mine.site, mine.listing] },
      subscription: { value: "No", sources: [mine.site] },
      levels: { value: "5", sources: [mine.site] },
      /* Hints and daily puzzle: confirmed absent by Edvin, 2026-10-06. */
      hints: { value: "No", sources: [mine.site] },
      notes: { value: "Yes", sources: [mine.site] },
      daily: { value: "No", sources: [mine.site] },
      languages: {
        value: `${languages.length} languages`,
        sources: [mine.site],
      },
      requires: { value: "iOS 18.6", sources: [mine.lookup] },
      updated: { value: "October 2026", sources: [mine.lookup] },
    },
    brief: {
      what: "The app I make. It is a classic Sudoku app for iPhone and iPad that generates every puzzle on the device.",
      money:
        "It does not. The app is free, with no ads, no in-app purchases and no subscription. I build it as a passion project.",
      difficulty:
        "Five levels from Easy to Extremely Hard, graded by the solving techniques each puzzle needs.",
      offers:
        "I designed it to be free of distractions, with a familiar number pad and simple controls. It plays offline, needs no account and syncs between iPhone and iPad through iCloud. Notes update themselves, undo is unlimited and there are statistics per difficulty.",
      limits:
        "There are no hints, no technique lessons and no daily puzzle, and it plays classic Sudoku only. It needs iOS 18.6, the newest requirement of the six, and there is no Android or web version.",
      privacy:
        "The label lists a device ID and usage data, not linked to identity. The app collects anonymous usage data by default, which can be switched off in its Privacy screen.",
    },
  },
  {
    name: "Classic Sudoku!",
    icon: "/images/sudoku/comparison/classic-sudoku-app-icon.webp",
    developer: "Cracking the Cryptic (Nick Carney)",
    url: classic.listing,
    cells: {
      price: { value: "$4.99", sources: [classic.lookup] },
      ads: { value: notConfirmed, sources: [classic.listing] },
      purchases: { value: "None listed", sources: [classic.listing] },
      subscription: { value: "None listed", sources: [classic.listing] },
      levels: {
        value: "No named levels, 100 puzzles",
        sources: [classic.listing],
      },
      hints: { value: "Yes", sources: [classic.listing] },
      notes: { value: notConfirmed, sources: [classic.listing] },
      daily: { value: notConfirmed, sources: [classic.listing] },
      languages: { value: "English", sources: [classic.lookup] },
      requires: { value: "iOS 10.0", sources: [classic.lookup] },
      updated: { value: "November 2020", sources: [classic.lookup] },
    },
    brief: {
      what: "A collection of 100 hand-made classic Sudoku puzzles presented by Cracking the Cryptic, the YouTube Sudoku channel hosted by Simon Anthony and Mark Goodliffe.",
      money:
        "It costs $4.99 up front. The listing shows no in-app purchases.",
      difficulty:
        "There are no named levels. The listing says the puzzles cover a wide range of difficulty and were play-tested by people instead of a computer. Solving puzzles earns stars, and stars unlock more puzzles.",
      offers:
        "Every puzzle was chosen by a person, and the hints are written by the two hosts. The listing says the advanced puzzles are designed to help solvers understand the techniques involved.",
      limits:
        "The collection ends at 100 puzzles. The app is in English only and was last updated in November 2020. Notes and ads are not mentioned on the listing.",
      privacy: "The developer has not provided privacy details to Apple.",
    },
  },
  {
    name: "Good Sudoku",
    icon: "/images/sudoku/comparison/good-sudoku-app-icon.webp",
    developer: "Zach Gage",
    url: good.listing,
    more: { label: "playgoodsudoku.com", href: good.site },
    cells: {
      price: { value: "Free to download", sources: [good.lookup] },
      ads: { value: notConfirmed, sources: [good.listing] },
      purchases: {
        value: "Full Game Unlock, $4.99",
        sources: [good.listing],
      },
      subscription: { value: "None listed", sources: [good.listing] },
      levels: { value: "5", sources: [good.listing] },
      hints: { value: "Yes", sources: [good.listing, good.site] },
      notes: { value: "Yes", sources: [good.listing] },
      daily: { value: "Yes", sources: [good.listing] },
      languages: { value: "English", sources: [good.lookup] },
      requires: { value: "iOS 13.0", sources: [good.lookup] },
      updated: { value: "July 2025", sources: [good.lookup] },
    },
    brief: {
      what: "A classic Sudoku app by Zach Gage built around learning the game, with more than 70,000 puzzles.",
      money:
        "It is free to download, with one in-app purchase called Full Game Unlock at $4.99. The listing does not say what is playable before the unlock. A separate edition, Good Sudoku+, is part of Apple Arcade.",
      difficulty:
        "Five levels, graded by technique. The developer says the app lays out which techniques each level requires, and names XYZ Wings, Hidden Quadruples, Jellyfish and Swordfish for the hardest puzzles.",
      offers:
        "Techniques can be practised one at a time outside puzzles, and the app keeps track of the ones already learned. Hints point to the next technique a puzzle needs. There are three daily modes with global leaderboards, a custom mode for entering a puzzle from elsewhere, and iCloud sync.",
      limits:
        "The app is in English only and was last updated in July 2025. Whether the free version shows ads is not confirmed.",
      privacy:
        "The label lists data not linked to identity, including a device ID and advertising data under third-party advertising.",
    },
  },
  {
    name: "NYT Games",
    icon: "/images/sudoku/comparison/nyt-games-app-icon.webp",
    developer: "The New York Times Company",
    url: nyt.listing,
    more: { label: "What a Games subscription includes", href: nyt.site },
    cells: {
      price: { value: "Free to download", sources: [nyt.lookup, nyt.site] },
      ads: { value: "Yes", sources: [nyt.listing] },
      purchases: { value: "Subscriptions", sources: [nyt.listing] },
      subscription: {
        value: "Optional, monthly plans listed from $4.99",
        sources: [nyt.listing, nyt.site],
      },
      levels: { value: "3", sources: [nyt.listing] },
      hints: { value: notConfirmed, sources: [nyt.listing] },
      notes: { value: notConfirmed, sources: [nyt.listing] },
      daily: { value: "Yes, daily puzzles only", sources: [nyt.listing] },
      languages: { value: "English", sources: [nyt.lookup] },
      requires: { value: "iOS 18.0", sources: [nyt.lookup] },
      updated: { value: "September 2026", sources: [nyt.lookup] },
    },
    brief: {
      what: "The New York Times puzzle app. Sudoku is one of eleven games named on the listing, next to Wordle, the Crossword and Connections.",
      money:
        "It is free to download, and the Times help center lists Sudoku among the games playable without a subscription. A Games subscription, with monthly plans listed from $4.99, opens the full catalog. The listing declares advertising.",
      difficulty:
        "One new puzzle a day at each of three levels: easy, medium and hard. The Times has not published how they are graded.",
      offers:
        "Sudoku sits in the same app as the other Times games. Progress syncs through a New York Times account, and playing without one keeps progress on the device.",
      limits:
        "There are three Sudoku puzzles a day. The app is in English only and needs iOS 18.0 or later. Hints and notes for Sudoku are not mentioned on the listing.",
      privacy:
        "The label includes data that may be used to track you across apps and websites owned by other companies.",
    },
  },
  {
    name: "Sudoku by Brainium",
    icon: "/images/sudoku/comparison/sudoku-by-brainium-app-icon.webp",
    developer: "Brainium Studios",
    url: brainium.listing,
    more: { label: "brainium.com", href: brainium.site },
    cells: {
      price: { value: "Free", sources: [brainium.lookup] },
      ads: { value: "Yes", sources: [brainium.listing] },
      purchases: { value: "Remove Ads, $11.99", sources: [brainium.listing] },
      subscription: { value: "None listed", sources: [brainium.listing] },
      levels: { value: "5", sources: [brainium.listing, brainium.site] },
      hints: { value: "Yes", sources: [brainium.listing, brainium.site] },
      notes: { value: "Yes", sources: [brainium.listing] },
      daily: { value: "Yes", sources: [brainium.listing, brainium.site] },
      languages: { value: "17 languages", sources: [brainium.lookup] },
      requires: { value: "iOS 15.0", sources: [brainium.lookup] },
      updated: { value: "June 2026", sources: [brainium.lookup] },
    },
    brief: {
      what: "A classic Sudoku app from Brainium Studios with an unlimited supply of puzzles, in 17 languages.",
      money:
        "It is free and shows ads. One in-app purchase, Remove Ads, costs $11.99.",
      difficulty:
        "Five levels: Breezy, Easy, Medium, Hard and Expert. Brainium has not published how they are graded.",
      offers:
        "The Hint button explains the technique behind the next step with animations, which Brainium describes as teaching why the answer is what it is. The app also has daily puzzles, statistics, achievements, leaderboards, auto-fill notes, landscape play and iPad keyboard support.",
      limits:
        "The listing declares advertising, which the Remove Ads purchase addresses. Offline play and syncing between devices are not mentioned on the listing.",
      privacy:
        "The label includes data that may be used to track you across apps and websites owned by other companies.",
    },
  },
  {
    name: "Sudoku.com",
    icon: "/images/sudoku/comparison/sudoku-com-app-icon.webp",
    developer: "Easybrain",
    url: sudokuCom.listing,
    more: { label: "easybrain.com/sudoku", href: sudokuCom.site },
    cells: {
      price: { value: "Free", sources: [sudokuCom.lookup] },
      ads: { value: "Yes", sources: [sudokuCom.listing] },
      purchases: {
        value: "Sudoku.com No Ads, $14.99",
        sources: [sudokuCom.listing],
      },
      subscription: { value: "None listed", sources: [sudokuCom.listing] },
      levels: { value: "6", sources: [sudokuCom.site] },
      hints: { value: "Yes", sources: [sudokuCom.listing, sudokuCom.site] },
      notes: { value: "Yes", sources: [sudokuCom.listing] },
      daily: { value: "Yes", sources: [sudokuCom.listing, sudokuCom.site] },
      languages: { value: "17 languages", sources: [sudokuCom.lookup] },
      requires: { value: "iOS 15.0", sources: [sudokuCom.lookup] },
      updated: { value: "September 2026", sources: [sudokuCom.lookup] },
    },
    brief: {
      what: "A classic Sudoku app from Easybrain with thousands of puzzles, in 17 languages.",
      money:
        "It is free and shows ads. One in-app purchase, Sudoku.com No Ads, costs $14.99.",
      difficulty:
        "Six levels, which Easybrain describes as running from quick and easy puzzles to extremely challenging grids. Easybrain has not published how they are graded.",
      offers:
        "Daily Challenges with trophies, Seasonal Events, and tournaments with a leaderboard. The app also has hints, notes that update themselves, optional auto-check and statistics.",
      limits:
        "The listing declares advertising, which the No Ads purchase addresses. Offline play and syncing between devices are not mentioned on the listing.",
      privacy:
        "The label includes data that may be used to track you across apps and websites owned by other companies.",
    },
  },
];

const ownLink = `[${appName}](/sudoku/)`;

export const intro =
  "Every Sudoku app has the same grid and the same rules. They differ in whether they show ads, how they charge, how they grade difficulty, how they feel to use and what they add on top, such as hints, daily puzzles or technique lessons. This page compares six of them for iPhone and iPad.";

/* Prose strings may carry [text](path) links; see toHtml and toMarkdown below. */
export const disclosure = [
  `I am ${developer.name} and I make one of the six, ${ownLink}. Everything this page says about the other five comes from official sources, meaning their US App Store listings and their developers' own websites, and none of it from my own impressions. Where those sources say nothing, the page says "${notConfirmed}".`,
  "Prices are in US dollars from the US App Store.",
];

export const tableCaption =
  "Six Sudoku apps for iPhone and iPad compared on price, ads, purchases, difficulty levels and features";

export const tableNote =
  "All six run on both iPhone and iPad. \"None listed\" means the App Store listing shows no such purchase. A table cannot show how an app feels to use, so the screenshots on each listing are worth a look before choosing.";

export interface Need {
  name: string;
  detail: string;
}

export const needsIntro =
  "Start from what matters to you. Each answer names every app whose listing or developer confirms it.";

export const needs: Need[] = [
  {
    name: "No ads",
    detail: `${appName} has no ads and nothing to buy. Good Sudoku+ is part of Apple Arcade, where Apple states there are no ads and no in-app purchases. Sudoku.com and Sudoku by Brainium show ads and each sells a one-time removal, at $14.99 and $11.99. NYT Games declares advertising on its listing. For Good Sudoku and Classic Sudoku! the listings do not say either way.`,
  },
  {
    name: "Costs nothing at all",
    detail: `${appName} is free with nothing to buy. Sudoku.com and Sudoku by Brainium are free to play with ads. The Sudoku in NYT Games is playable without a subscription. Good Sudoku is free to download, and its listing does not say how much is playable before the $4.99 unlock.`,
  },
  {
    name: "Plays offline",
    detail: `${appName} generates every puzzle on the device and works without a connection. Apple says Apple Arcade games play online or offline, which covers Good Sudoku+. The other listings do not mention offline play, which is different from saying they need a connection.`,
  },
  {
    name: "Stays simple",
    detail: `${appName} is classic Sudoku with notes, undo and statistics, and has no daily challenges, events or leaderboards. Classic Sudoku! lists three features: 100 puzzles, themes and hints.`,
  },
  {
    name: "A daily puzzle",
    detail: `Sudoku.com, Sudoku by Brainium and Good Sudoku all have daily puzzles next to their regular ones, and Good Sudoku adds global leaderboards for them. NYT Games offers daily puzzles only, three a day. ${appName} has no daily puzzle.`,
  },
  {
    name: "Hard puzzles",
    detail: `Good Sudoku names the techniques its hardest puzzles require, including Jellyfish and Swordfish. Classic Sudoku! says its advanced puzzles are built around difficult techniques. The Extremely Hard level in ${appName} requires chains and coloring. Sudoku.com has six levels and Sudoku by Brainium tops out at Expert, without a published grading method. NYT Games stops at hard.`,
  },
  {
    name: "Learning techniques",
    detail: `Good Sudoku lets you practise techniques one at a time and tracks which ones you have learned. The hints in Sudoku by Brainium explain the reasoning behind each step. The hints in Classic Sudoku! are written by its two hosts. ${appName} has no hints and no lessons.`,
  },
];

export const briefsIntro =
  "The same six points for each app.";

export const difficultyHeading =
  "Why difficulty labels do not compare across apps";

export const difficultyParagraphs = [
  "An Easy puzzle in one app and an Easy puzzle in another are not the same measurement. There are two common ways to grade a Sudoku. One counts the numbers given at the start, on the idea that fewer givens make a harder puzzle. The other runs a solver over the puzzle and records which techniques it needs. The two can disagree, because a puzzle with few givens can still fall to plain scanning, and a puzzle with many can hide one step that needs an advanced technique.",
  `Two of the six developers say they grade by technique. Good Sudoku states that it lays out which techniques each level requires. ${appName} does the same, and its five levels are summarized below. Classic Sudoku! has no grades of that kind, since its 100 puzzles were made and play-tested by people. Easybrain, Brainium and The New York Times have not published how they grade, so a Hard in those apps cannot be mapped onto a Hard anywhere else.`,
];

export const difficultyLevelsLead = `The five levels in ${appName}`;

export const difficultyLink = {
  label: "Read the full description of each level",
  path: "/sudoku/#difficulty",
};

export interface Model {
  name: string;
  detail: string;
}

export const modelsHeading = "What \"free\" means";

export const modelsIntro =
  "Five of the six apps cost nothing to download, and they pay for themselves in different ways.";

export const models: Model[] = [
  {
    name: "Free with ads and a paid removal",
    detail:
      "Sudoku.com and Sudoku by Brainium. Playing costs nothing and the app shows advertising. A one-time purchase, $14.99 or $11.99, removes the ads for good.",
  },
  {
    name: "Free download with a one-time unlock",
    detail:
      "Good Sudoku. The download is free and a single $4.99 purchase unlocks the full game. The listing does not describe the free part.",
  },
  {
    name: "Paid up front",
    detail:
      "Classic Sudoku! costs $4.99 before the first puzzle, and its listing shows nothing further to buy.",
  },
  {
    name: "Part of a wider subscription",
    detail: `NYT Games lets you play its daily Sudoku without paying, and sells a subscription to the rest of its catalog. Good Sudoku+ comes with [Apple Arcade](${appleArcadeUrl}), which Apple prices at $6.99 a month for a catalog of more than 200 games with no ads and no in-app purchases.`,
  },
  {
    name: "Free with nothing to buy",
    detail: `${appName}. There are no ads and no purchases, so the app earns nothing.`,
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Is there a free Sudoku app for iPhone without ads?",
    a: `${appName} is free and has no ads and no in-app purchases. Of the other five apps compared here, none is confirmed as both free and ad-free by its App Store listing. Sudoku.com and Sudoku by Brainium are free with ads and sell a one-time removal, NYT Games declares advertising, and the Good Sudoku listing does not say.`,
  },
  {
    q: "Which Sudoku apps run on an older iPhone or iPad?",
    a: `Classic Sudoku! needs iOS 10.0 or later and Good Sudoku needs iOS 13.0. Sudoku.com and Sudoku by Brainium need iOS 15.0. NYT Games needs iOS 18.0 and ${appName} needs iOS 18.6, so those two only run on recent devices.`,
  },
  {
    q: "Do these Sudoku apps need an account?",
    a: `${appName} has no account at all. NYT Games can be played without logging in, in which case progress stays on the device, and a New York Times account syncs it. The other four listings do not say whether an account is needed.`,
  },
  {
    q: "Which Sudoku apps sync between iPhone and iPad?",
    a: `${appName} and Good Sudoku both sync through iCloud. NYT Games syncs through a New York Times account. Syncing is not mentioned on the listings for Sudoku.com, Sudoku by Brainium or Classic Sudoku!.`,
  },
  {
    q: "Is the New York Times Sudoku free?",
    a: "Yes. The Times help center lists Sudoku among the games that can be played without a Games subscription. The NYT Games app offers one new puzzle a day at each of three levels: easy, medium and hard.",
  },
  {
    q: "Is Good Sudoku on Apple Arcade?",
    a: "Yes, as a separate app called Good Sudoku+. Its listing describes six difficulty levels where the standard edition describes five. Good Sudoku+ was last updated in October 2021 and the standard edition in July 2025.",
  },
];

export const closing = {
  heading: `Get ${appName}`,
  text: `If the app I make sounds like the right fit, it is free on the App Store for iPhone and iPad. [Read more about ${appName}](/sudoku/).`,
};

/* Sources for the Good Sudoku+ and Apple Arcade statements above. */
export const extraSources = [
  good.arcadeListing,
  good.arcadeLookup,
  appleArcadeUrl,
];

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Turns the [text](path) links in a prose string into anchors for the page. */
export const toHtml = (text: string) =>
  escapeHtml(text).replace(linkPattern, (_, label, href) =>
    href.startsWith("/")
      ? `<a class="link" href="${href}">${label}</a>`
      : `<a class="link" href="${href}" rel="noopener noreferrer">${label}</a>`,
  );

/** Makes the [text](path) links in a prose string absolute for the markdown copy. */
export const toMarkdown = (text: string, site: URL) =>
  text.replace(linkPattern, (_, label, href) =>
    `[${label}](${href.startsWith("/") ? new URL(href, site).href : href})`,
  );

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
