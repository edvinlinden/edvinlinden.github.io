import type { APIRoute } from "astro";
import {
  appName,
  appStoreUrl,
  faqs,
  features,
  languages,
  pageDescription,
  promises,
  rating,
  reviews,
} from "../data/sudoku";

/*
  A plain-text copy of /sudoku/ for language models, linked from /llms.txt and
  from the page itself with rel="alternate". Everything comes from the same data
  the page renders, so the two cannot drift apart.
*/
export const GET: APIRoute = ({ site }) => {
  const base = site!;
  const url = (path: string) => new URL(path, base).href;

  const lines = [
    `# ${appName}`,
    ``,
    `> ${pageDescription}`,
    ``,
    `- Page: ${url("/sudoku/")}`,
    `- App Store: ${appStoreUrl}`,
    `- Price: free, with no in-app purchases and no subscription`,
    `- Platforms: iPhone on iOS 18.6 or later, iPad on iPadOS 18.6 or later. No Android and no web version.`,
    `- Rating: ${rating.value.toFixed(1)} out of 5 from ${rating.count} ratings on the US App Store, checked ${rating.checkedOn}`,
    `- Developer: Edvin Lindén, ${url("/about/")}`,
    `- Privacy policy: ${url("/sudoku/privacy/")}`,
    ``,
    `## What it costs and what it leaves out`,
    ``,
    ...promises.map((promise) => `- **${promise.name}.** ${promise.detail}`),
    ``,
    `## Features`,
    ``,
    ...features.map((feature) => `- **${feature.name}.** ${feature.detail}`),
    ``,
    `## Languages`,
    ``,
    `The app follows the language set on the device: ${languages
      .map((language) => language.name)
      .join(", ")}.`,
    ``,
    `## Reviews`,
    ``,
    ...reviews.flatMap((review) => [
      `> ${review.body}`,
      ``,
      `— ${review.author}, ${review.rating} stars, "${review.title}"`,
      ``,
    ]),
    `## Questions and answers`,
    ``,
    ...faqs.flatMap((faq) => [`### ${faq.q}`, ``, faq.a, ``]),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
