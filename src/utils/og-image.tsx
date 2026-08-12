import { readFileSync } from 'fs';
import { join } from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// import.meta.url is rewritten by Vite in SSR context and does not reliably
// resolve to the source-tree path. process.cwd() is stable because Astro
// always runs from the project root during `astro build`.
//
// Arimo is metric-compatible with Arial, so the card matches the system sans
// the site renders in. Satori needs an embeddable file, which rules out the
// system font itself.
const fontRegular = readFileSync(join(process.cwd(), 'src/fonts/arimo-latin-400.woff'));
const fontBold = readFileSync(join(process.cwd(), 'src/fonts/arimo-latin-700.woff'));

function OgTemplate({ title }: { title: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor: '#fafafa',
        paddingTop: 76,
        paddingRight: 120,
        paddingBottom: 60,
        paddingLeft: 120,
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 20,
          letterSpacing: '0.12em',
          color: '#737373',
          fontWeight: 400,
          fontFamily: 'Arimo',
        }}
      >
        EDVINLINDEN.SE
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: '#171717',
          lineHeight: 1.1,
          fontFamily: 'Arimo',
          maxWidth: 960,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'flex',
          width: 40,
          height: 3,
          backgroundColor: '#0369a1',
          borderRadius: 2,
        }}
      />
    </div>
  );
}

export async function generateOgImage(title: string): Promise<Buffer> {
  const svg = await satori(<OgTemplate title={title} />, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Arimo', data: fontRegular, weight: 400, style: 'normal' },
      { name: 'Arimo', data: fontBold, weight: 700, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg);
  return Buffer.from(resvg.render().asPng());
}
