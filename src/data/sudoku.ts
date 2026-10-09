export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/*
  The first entry is the shot beside the hero copy; the rest appear only in the
  structured data. Add files to public/images/sudoku/ and list them here.
*/
export const screenshots: Screenshot[] = [
  {
    src: "/images/sudoku/sudoku-no-ads-unlimited-by-edvin-linden-game-view.webp",
    alt: "Sudoku on iPhone showing a puzzle in progress, with the number pad below the grid",
    width: 603,
    height: 1311,
  },
];

/**
  What it costs, what it shows, what it asks for and what it never does. The
  pitch, kept apart from the features.
*/
export const promises = [
  {
    name: "Free",
    detail: "No purchase, no subscription, nothing locked away.",
  },
  {
    name: "No ads",
    detail: "No banners, no pop-ups, no videos to sit through.",
  },
  {
    name: "No account",
    detail: "Nothing to sign up for and no email to hand over.",
  },
  {
    name: "No nagging",
    detail:
      "No push notifications, no experience points, no streak to keep alive.",
  },
];

export interface Feature {
  name: string;
  detail: string;
  /** Optional until the artwork exists; a labelled placeholder stands in until then. */
  illustration?: string;
  /*
    Describes what the illustration shows, not what the feature does. The name
    and detail sit right beside it, so repeating them here would read twice.
  */
  illustrationAlt?: string;
}

/*
  Nine features in a nine-cell grid, which is the shape of a sudoku box. Keep the
  count at nine, and keep the details to a couple of lines so no card outgrows
  the row it sits in.
*/
export const features: Feature[] = [
  {
    name: "Natural controls",
    detail:
      "The number pad sits under the board within reach of a thumb, and every tap answers with haptic feedback.",
    illustration: "/images/sudoku/features/sudoku-no-ads-unlimited-by-edvin-linden-natural-controls.webp",
    illustrationAlt:
      "A number pad of nine large buttons below the board, with Undo, Erase and Notes in between",
  },
  {
    name: "Error highlighting",
    detail:
      "Turn it on and a wrong number is flagged as it goes in. Leave it off and nothing interrupts.",
    illustration: "/images/sudoku/features/sudoku-no-ads-unlimited-by-edvin-linden-error-highlighting.webp",
    illustrationAlt:
      "A sudoku board where two 1s in the same row are both marked in red",
  },
  {
    name: "Dark mode",
    detail:
      "The board follows the system appearance and turns dark with the rest of the device.",
    illustration: "/images/sudoku/features/sudoku-no-ads-unlimited-by-edvin-linden-dark-mode.webp",
    illustrationAlt:
      "A sudoku puzzle in dark mode, white numbers on a black board",
  },
  {
    name: "Statistics",
    detail: "Times and streaks per difficulty, so improvement is visible.",
    illustration: "/images/sudoku/features/sudoku-no-ads-unlimited-by-edvin-linden-statistics.webp",
    illustrationAlt:
      "A statistics screen charting solve rate per difficulty, from 86 percent on Easy to 40 on Extremely Hard",
  },
  {
    name: "Five difficulties",
    detail:
      "Easy to Extremely Hard, graded by the solving techniques each puzzle actually needs.",
    illustration: "/images/sudoku/features/sudoku-no-ads-unlimited-by-edvin-linden-five-difficulties.webp",
    illustrationAlt:
      "The difficulty menu listing Easy, Medium, Hard, Very Hard and Extremely Hard, numbered one to five",
  },
  {
    name: "Smart notes",
    detail: "Pencil marks update themselves as the board fills in.",
    illustration: "/images/sudoku/features/sudoku-no-ads-unlimited-by-edvin-linden-smart-notes.webp",
    illustrationAlt:
      "A sudoku board with small pencil marks in two empty cells and the Notes button switched on below",
  },
  {
    name: "Unlimited undo",
    detail: "Step back as far as you want, one move at a time.",
    illustration: "/images/sudoku/features/sudoku-no-ads-unlimited-by-edvin-linden-unlimited-undo.webp",
    illustrationAlt:
      "Three Undo buttons receding one behind the other into the distance",
  },
  {
    name: "iCloud sync",
    detail: "Start a puzzle on a phone and finish it on an iPad.",
    illustration: "/images/sudoku/features/sudoku-no-ads-unlimited-by-edvin-linden-icloud-sync.webp",
    illustrationAlt:
      "An iPad and an iPhone with arrows running to and from a cloud",
  },
  {
    name: "Plays offline",
    detail:
      "Every puzzle is generated and solved on the device. No connection, no interruptions.",
    illustration: "/images/sudoku/features/sudoku-no-ads-unlimited-by-edvin-linden-offline-play.webp",
    illustrationAlt: "A crossed-out wifi symbol beside an aeroplane symbol",
  },
];

export interface Difficulty {
  name: string;
  detail: string;
}

export const difficultyIntro =
  "The difficulty of each Sudoku puzzle is based on the solving techniques it requires, rather than simply how many numbers are given at the start. Each level introduces more advanced ways of eliminating candidates.";

/* Easiest first. */
export const difficulties: Difficulty[] = [
  {
    name: "Easy",
    detail:
      "Every square can be solved by scanning alone. Look for a row, column, or block where a number has only one possible place. Notes are never needed.",
  },
  {
    name: "Medium",
    detail:
      "Scanning still does most of the work, but some steps require an extra piece of reasoning. By ruling a number out from part of a block or line, a square can be left with only one possible place for that number.",
  },
  {
    name: "Hard",
    detail:
      "This is where notes start to become useful. Instead of placing numbers directly, you narrow down candidates. Some puzzles require patterns such as two squares sharing the same two candidates, or a number being restricted to a rectangle across two rows and two columns.",
  },
  {
    name: "Very Hard",
    detail:
      "The puzzles require longer chains of eliminations. You may need to identify three squares that together contain only three candidates, or use a three-square wing to eliminate a candidate elsewhere in the grid.",
  },
  {
    name: "Extremely Hard",
    detail:
      "The hardest puzzles in the app require advanced patterns and chains. These include chains linking squares through a shared block and coloring, where a single candidate is followed through the grid until a contradiction reveals which possibility must be eliminated.",
  },
];

export interface Language {
  flag: string;
  /** The language's name in itself, which is the point of the section. */
  endonym: string;
  name: string;
}

export const languages: Language[] = [
  { flag: "🇬🇧", endonym: "English", name: "English" },
  { flag: "🇩🇪", endonym: "Deutsch", name: "German" },
  { flag: "🇪🇸", endonym: "Español", name: "Spanish" },
  { flag: "🇫🇷", endonym: "Français", name: "French" },
  { flag: "🇯🇵", endonym: "日本語", name: "Japanese" },
  { flag: "🇸🇪", endonym: "Svenska", name: "Swedish" },
];

/*
  The App Store figures as of checkedOn. Refresh now and then with:
    curl -s "https://itunes.apple.com/lookup?id=6757938217&country=us" \
      | python3 -c "import json,sys; a=json.load(sys.stdin)['results'][0]; print(a['averageUserRating'], a['userRatingCount'])"
*/
export const rating = {
  value: 4.5,
  count: 335,
  checkedOn: "2026-10-03",
};

export interface Review {
  rating: number;
  title: string;
  body: string;
  author: string;
}

/*
  Quoted verbatim from the US App Store, under the names Apple shows. Nothing
  goes in here that a customer did not write, and a review by the developer is
  not a customer review.
    curl -s "https://itunes.apple.com/us/rss/customerreviews/id=6757938217/sortby=mostrecent/json"
*/
export const reviews: Review[] = [
  {
    rating: 5,
    title: "Just Sudoku",
    body: "No ads, no gimmicks, no constant calls to upgrade. And it's available offline. What's not to like?",
    author: "Lady the Rook",
  },
  {
    rating: 5,
    title: "Simple, Effective",
    body: "There is no lie in the title. Just Sudoku. No ads, no limits, no in app purchases. Perfect sudoku app.",
    author: "A11Ethan",
  },
  {
    rating: 5,
    title: "Love",
    body: "Love how simple and straight forward the app is and I'm so glad I found it after searching and searching for a great app that didn't want so much information from me. Thank you for that!",
    author: "Yellowbird4",
  },
  {
    rating: 5,
    title: "Love this app",
    body: "Great app, NO ADS, can play offline. Exactly what I was looking for. Thank you!",
    author: "Jess035",
  },
  {
    rating: 5,
    title: "no ads",
    body: "i love this sudoku app it's clean and no ads",
    author: "undefynedd",
  },
  {
    rating: 5,
    title: "Thank you for this app!",
    body: "Free app, no ads, good interface and game options - best sudoku game you could ask for.",
    author: "pif_256",
  },
];

/** The App Store listing. The pt and ct parameters attribute downloads to this site in App Analytics. */
export const appStoreUrl = "https://apps.apple.com/app/apple-store/id6757938217?pt=2191183&ct=edvinlinden-se&mt=8";

export const appName = "Sudoku – No Ads, Unlimited";

export const pageTitle = "Free Sudoku App for iPhone & iPad — No Ads, No Account";

export const pageDescription =
  "A free sudoku app with no ads, no account and no internet needed. Five difficulty levels, smart notes, unlimited undo and iCloud sync across iPhone and iPad.";

/* One sentence that still says what the app is when quoted without the page around it. */
export const appSummary =
  "Sudoku – No Ads, Unlimited is a free sudoku app for iPhone and iPad with no ads, no in-app purchases, no account and offline play, made by Edvin Lindén.";

/* Who makes the app. Shared by the page, its structured data and /sudoku.md. */
export const developer = {
  name: "Edvin Lindén",
  profilePath: "/about/",
  appsPath: "/",
  portrait: "/images/edvin-linden-2024-square.webp",
  bio: "I am Edvin Lindén, a developer based in Sweden. I have been building small apps for iPhone and iPad for over five years, and Sudoku is one of them.",
};

export interface Faq {
  q: string;
  /** Paragraphs are separated by a blank line. */
  a: string;
  /** A site page to read further on, shown after the answer. */
  link?: { label: string; path: string };
}

/* Answers the App Store listing does not have room for. Shared with /sudoku.md. */
export const faqs: Faq[] = [
  {
    q: `Is ${appName} really free?`,
    a:
      `Yes. ${appName} by ${developer.name} costs nothing to download, and there are no in-app purchases, no subscription and no paid tier. Every difficulty and every feature is there from the first launch.`,
  },
  {
    q: "Are there any ads?",
    a:
      `No. ${appName} has no advertising in it at all. There are no banners, no full-screen ads between puzzles and no videos to watch before you can carry on. Totally ad-free!`,
  },
  {
    q: "Does it work offline?",
    a:
      `Yes. ${appName} generates and solves every puzzle on the device, so the app works on a plane, on the underground and in aeroplane mode.`,
  },
  {
    q: "Do I need an account to play?",
    a:
      `No. ${appName} has no sign-up, no login and no email address to give. Open the app and start a puzzle.`,
  },
  {
    q: "How many difficulty levels are there?",
    a:
      `${appName} has five difficulty levels, from Easy to Extremely Hard. Each puzzle is graded by the solving techniques it actually requires, so Easy stays easy and Extremely Hard earns the name.`,
  },
  {
    q: "Does it have pencil marks?",
    a:
      `Yes. ${appName} has pencil marks, which the app calls notes. They update themselves as numbers go into the board, so a possibility that is no longer valid disappears on its own.`,
  },
  {
    q: "Is there a dark mode?",
    a:
      `Yes. ${appName} follows the appearance set on the device, so the board and the number pad turn dark when the rest of the system does.`,
  },
  {
    q: "Which languages does it speak?",
    a:
      `${appName} is available in English, German, Spanish, French, Japanese and Swedish. The app follows the language set on the device.`,
  },
  {
    q: "Which devices does it run on?",
    a:
      `${appName} runs on iPhone with iOS 18.6 or later and on iPad with iPadOS 18.6 or later. A puzzle started on one carries over to the other through iCloud.`,
  },
  {
    q: "Is there an Android version?",
    a:
      `No. ${appName} is written for Apple platforms only and there is no Android or web version.`,
  },
  {
    q: "What data does the app collect?",
    a:
      `${appName} collects anonymous usage data, so its developer ${developer.name} can see which parts of the app people use. The data is not tied to an identity, it cannot be matched against any other app, and it can be switched off in the app's Privacy screen.`,
    link: { label: "Read the privacy policy", path: "/sudoku/privacy/" },
  },
  {
    q: "How does it compare with other Sudoku apps?",
    a:
      `${developer.name} has compared ${appName} with five other Sudoku apps for iPhone and iPad on ads, price, difficulty levels, hints and sync. The comparison uses only what each app's App Store listing and developer site confirm, and it lists what this app lacks as well.`,
    link: {
      label: "Compare six Sudoku apps",
      path: "/sudoku/which-sudoku-app-is-right-for-you/",
    },
  },
  {
    q:`What is ${appName}?`,
    a: `${appName} is a simple Sudoku puzzle app for iPhone and iPad, made by ${developer.name}. It is designed for people who want to solve Sudoku without advertising, subscriptions, accounts or other distractions. Puzzles are generated and solved on the device, with five difficulty levels ranging from Easy to Extremely Hard. The app works offline and supports iCloud sync between iPhone and iPad.`,
  },
  {
    q: "Who is this app for?",
    a:
      `${appName} is for anyone who wants to solve sudoku on an iPhone or iPad without ads, subscriptions or accounts in the way. Beginners can start on Easy, where every square can be solved by scanning alone, and experienced solvers get Extremely Hard puzzles that need advanced patterns and chains. The app also suits a commute or a flight, since every puzzle works offline.`,
  },
];
