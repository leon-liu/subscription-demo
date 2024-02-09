import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export const runtime = 'edge';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || ''
});

export async function POST(req: Request) {
  const { scale, img } = await req.json();
  const output = await replicate.run(
    'xinntao/realesrgan:1b976a4d456ed9e4d1a846597b7614e79eadad3032e9124fa63859db0fd59b56',
    {
      input: {
        img,
        tile: 0,
        scale,
        version: 'General - v3',
        face_enhance: true
      }
    }
  );
  return NextResponse.json(output);
}
