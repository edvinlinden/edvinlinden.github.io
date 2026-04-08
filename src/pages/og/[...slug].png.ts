import type { APIRoute, GetStaticPaths } from 'astro';
import { generateOgImage } from '../../utils/og-image';

export const getStaticPaths: GetStaticPaths = async () => {
  const articleFiles = import.meta.glob('../writing/*.md', { eager: true }) as Record<
    string,
    { frontmatter: { title: string } }
  >;

  const articlePaths = Object.entries(articleFiles).map(([path, mod]) => {
    const slug = path.replace('../writing/', 'writing/').replace('.md', '');
    return { params: { slug }, props: { title: mod.frontmatter.title } };
  });

  const staticPaths = [
    {
      params: { slug: 'home' },
      props: { title: 'Edvin Lindén — Product Leader & App Developer' },
    },
    { params: { slug: 'about' }, props: { title: 'About me' } },
    { params: { slug: 'writing' }, props: { title: 'Writing' } },
    {
      params: { slug: 'the-impossible-safe' },
      props: { title: 'The Impossible Safe' },
    },
  ];

  return [...staticPaths, ...articlePaths];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await generateOgImage(props.title as string);
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
