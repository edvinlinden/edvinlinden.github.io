import { readFileSync } from 'fs';
import { join } from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const fontData400 = readFileSync(join(process.cwd(), 'public/fonts/geologica-latin-400.ttf'));
const fontData900 = readFileSync(join(process.cwd(), 'public/fonts/geologica-latin-900.ttf'));

function OgTemplate({ title }: { title: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
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
          letterSpacing: '0.18em',
          color: '#a3a3a3',
          fontWeight: 400,
          fontFamily: 'Geologica',
        }}
      >
        EDVINLINDEN.SE
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 72,
          fontWeight: 900,
          color: '#171717',
          lineHeight: 1.1,
          fontFamily: 'Geologica',
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
          backgroundColor: '#171717',
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
      { name: 'Geologica', data: fontData400, weight: 400, style: 'normal' },
      { name: 'Geologica', data: fontData900, weight: 900, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg);
  return Buffer.from(resvg.render().asPng());
}
