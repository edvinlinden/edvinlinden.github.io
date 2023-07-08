import rss from "@astrojs/rss";

export async function get(context) {
  const articlesImport = import.meta.glob("./writing/*.md", { eager: true });
  const articles = Object.values(articlesImport);

  return rss({
    title: "Things written by Edvin Lindén",
    description:
      "I write mostly about my side projects but I'll also cover topics regarding product management and technology.",
    site: context.site,
    items: articles.map((post) => ({
      title: post.frontmatter.title,
      pubDate: post.frontmatter.date,
      description: post.frontmatter.description,
      readingTime: post.frontmatter.readingTime,
      link: post.url,
    })),
    stylesheet: "/public/rss/styles.xsl",
  });
}
