import type { APIRoute } from "astro";
import { difficulties, difficultyIntro } from "../../data/sudoku";
import {
  apps,
  attributes,
  briefLabels,
  briefsIntro,
  checkedOn,
  closing,
  difficultyHeading,
  difficultyLevelsLead,
  difficultyLink,
  difficultyParagraphs,
  disclosure,
  faqs,
  formatDate,
  intro,
  models,
  modelsHeading,
  modelsIntro,
  needs,
  needsIntro,
  pageDescription,
  pageHeading,
  pagePath,
  tableNote,
  toMarkdown,
} from "../../data/sudoku-comparison";

/*
  A plain-text copy of the comparison page for language models, linked from
  /llms.txt and from the page itself with rel="alternate". Everything comes from
  the same data the page renders, so the two cannot drift apart.
*/
export const GET: APIRoute = ({ site }) => {
  const base = site!;
  const url = (path: string) => new URL(path, base).href;
  const md = (text: string) => toMarkdown(text, base);

  const row = (cells: string[]) => `| ${cells.join(" | ")} |`;

  const lines = [
    `# ${pageHeading}`,
    ``,
    `> ${pageDescription}`,
    ``,
    intro,
    ``,
    ...disclosure.flatMap((paragraph) => [md(paragraph), ``]),
    `- Page: ${url(pagePath)}`,
    `- Facts checked: ${formatDate(checkedOn)}, US App Store`,
    ``,
    `## The six apps side by side`,
    ``,
    row(["", ...apps.map((app) => (app.own ? `${app.name} (made by the author)` : app.name))]),
    row(["---", ...apps.map(() => "---")]),
    ...attributes.map((attribute) =>
      row([
        attribute.label,
        ...apps.map((app) => app.cells[attribute.key].value),
      ]),
    ),
    row(["App Store", ...apps.map((app) => `[Get app](${app.url})`)]),
    ``,
    tableNote,
    ``,
    `## Which app fits which need`,
    ``,
    needsIntro,
    ``,
    ...needs.map((need) => `- **${need.name}.** ${need.detail}`),
    ``,
    `## Each app in brief`,
    ``,
    briefsIntro,
    ``,
    ...apps.flatMap((app) => [
      `### ${app.name}`,
      ``,
      `By ${app.developer}.`,
      ``,
      ...briefLabels.map(
        (item) => `- **${item.label}.** ${app.brief[item.key]}`,
      ),
      `- App Store: ${app.url}`,
      ...(app.more
        ? [
            `- ${app.more.label}: ${app.more.href.startsWith("/") ? url(app.more.href) : app.more.href}`,
          ]
        : []),
      ``,
    ]),
    `## ${difficultyHeading}`,
    ``,
    ...difficultyParagraphs.flatMap((paragraph) => [paragraph, ``]),
    `### ${difficultyLevelsLead}`,
    ``,
    difficultyIntro,
    ``,
    ...difficulties.map(
      (difficulty, index) =>
        `${index + 1}. **${difficulty.name}.** ${difficulty.detail}`,
    ),
    ``,
    `[${difficultyLink.label}](${url(difficultyLink.path)})`,
    ``,
    `## ${modelsHeading}`,
    ``,
    modelsIntro,
    ``,
    ...models.map((model) => `- **${model.name}.** ${md(model.detail)}`),
    ``,
    `## Questions about choosing a Sudoku app`,
    ``,
    ...faqs.flatMap((faq) => [`### ${faq.q}`, ``, faq.a, ``]),
    `## ${closing.heading}`,
    ``,
    md(closing.text),
    ``,
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
