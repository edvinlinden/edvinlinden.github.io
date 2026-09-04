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
    src: "/images/sudoku/game_view_light.webp",
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
    illustration: "/images/sudoku/features/natural-controls.webp",
    illustrationAlt:
      "A number pad of nine large buttons below the board, with Undo, Erase and Notes in between",
  },
  {
    name: "Error highlighting",
    detail:
      "Turn it on and a wrong number is flagged as it goes in. Leave it off and nothing interrupts.",
    illustration: "/images/sudoku/features/error-highlighting.webp",
    illustrationAlt:
      "A sudoku board where two 1s in the same row are both marked in red",
  },
  {
    name: "Dark mode",
    detail:
      "The board follows the system appearance and turns dark with the rest of the device.",
    illustration: "/images/sudoku/features/dark-mode.webp",
    illustrationAlt:
      "A sudoku puzzle in dark mode, white numbers on a black board",
  },
  {
    name: "Statistics",
    detail: "Times and streaks per difficulty, so improvement is visible.",
    illustration: "/images/sudoku/features/statistics.webp",
    illustrationAlt:
      "A statistics screen charting solve rate per difficulty, from 86 percent on Easy to 40 on Extremely Hard",
  },
  {
    name: "Five difficulties",
    detail:
      "Easy to Extremely Hard, graded by the solving techniques each puzzle actually needs.",
    illustration: "/images/sudoku/features/five-difficulties.webp",
    illustrationAlt:
      "The difficulty menu listing Easy, Medium, Hard, Very Hard and Extremely Hard, numbered one to five",
  },
  {
    name: "Smart notes",
    detail: "Pencil marks update themselves as the board fills in.",
    illustration: "/images/sudoku/features/smart-notes.webp",
    illustrationAlt:
      "A sudoku board with small pencil marks in two empty cells and the Notes button switched on below",
  },
  {
    name: "Unlimited undo",
    detail: "Step back as far as you want, one move at a time.",
    illustration: "/images/sudoku/features/unlimited-undo.webp",
    illustrationAlt:
      "Three Undo buttons receding one behind the other into the distance",
  },
  {
    name: "iCloud sync",
    detail: "Start a puzzle on a phone and finish it on an iPad.",
    illustration: "/images/sudoku/features/icloud-sync.webp",
    illustrationAlt:
      "An iPad and an iPhone with arrows running to and from a cloud",
  },
  {
    name: "Plays offline",
    detail:
      "Every puzzle is generated and solved on the device. No connection, no interruptions.",
    illustration: "/images/sudoku/features/offline-play.webp",
    illustrationAlt: "A crossed-out wifi symbol beside an aeroplane symbol",
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
  value: 4.42,
  count: 104,
  checkedOn: "2026-09-04",
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
];

/** The App Store listing. Site links append a ref parameter; machine-readable copies use it bare. */
export const appStoreUrl = "https://apps.apple.com/app/id6757938217";

export const appName = "Sudoku – No Ads, Unlimited";

export const pageTitle = "Free sudoku app with no ads for iPhone and iPad";

export const pageDescription =
  "A free sudoku app with no ads, no account and no internet needed. Five difficulty levels, smart notes, unlimited undo and iCloud sync across iPhone and iPad.";

export interface Faq {
  q: string;
  a: string;
}

/* Answers the App Store listing does not have room for. Shared with /sudoku.md. */
export const faqs: Faq[] = [
  {
    q: "Is Sudoku really free?",
    a:
      "Yes. It costs nothing to download, there are no in-app purchases, no subscription and no paid tier. Every difficulty and every feature is there from the first launch.",
  },
  {
    q: "Are there any ads?",
    a:
      "No. There are no banners, no full-screen ads between puzzles and no videos to watch before you can carry on. The app has no advertising in it at all.",
  },
  {
    q: "Does it work offline?",
    a:
      "Yes. Puzzles are generated and solved on the device, so the app works on a plane, on the underground and in aeroplane mode.",
  },
  {
    q: "Do I need an account to play?",
    a:
      "No. There is no sign-up, no login and no email address to give. Open the app and start a puzzle.",
  },
  {
    q: "How many difficulty levels are there?",
    a:
      "Five, from Easy to Extremely Hard. Each puzzle is graded by the solving techniques it actually requires, so Easy stays easy and Extremely Hard earns the name.",
  },
  {
    q: "Does it have pencil marks?",
    a:
      "Yes. Notes update themselves as numbers go into the board, so a possibility that is no longer valid disappears on its own.",
  },
  {
    q: "Is there a dark mode?",
    a:
      "Yes. The board and the number pad follow the appearance set on the device, so Sudoku turns dark when the rest of the system does.",
  },
  {
    q: "Which languages does it speak?",
    a:
      "English, German, Spanish, French, Japanese and Swedish. The app follows the language set on the device.",
  },
  {
    q: "Which devices does it run on?",
    a:
      "iPhone on iOS 18.6 or later and iPad on iPadOS 18.6 or later. A puzzle started on one carries over to the other through iCloud.",
  },
  {
    q: "Is there an Android version?",
    a:
      "No. Sudoku is written for Apple platforms only and there is no Android or web version.",
  },
  {
    q: "What data does the app collect?",
    a:
      "Anonymous usage data, so I can see which parts of the app people use. It is not tied to an identity, it cannot be matched against any other app, and it can be switched off in the app's Privacy screen.",
  },
];
