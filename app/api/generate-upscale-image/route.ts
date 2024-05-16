import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import Replicate from 'replicate';

export const runtime = 'edge';

// Object to store the request count for each unique identifier
const requestCount: { [key: string]: number } = {};

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || ''
});

export async function POST(request: NextRequest) {
  // Get the unique identifier for the anonymous user
  const uniqueIdentifier = getUniqueIdentifier(request);
  // Check if the unique identifier has been used more than twice
  if (requestCount[uniqueIdentifier] >= 2) {
    return NextResponse.json({ error: 'You can only send this request twice.' }, { status: 429 });
  }
  // Increment the request count for the unique identifier
  requestCount[uniqueIdentifier] = (requestCount[uniqueIdentifier] || 0) + 1;

  // Process the request
  const { scale, img } = await request.json();
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
  // return NextResponse.json({ message: 'Request processed successfully.' });
}

function getUniqueIdentifier(request: NextRequest): string {
  // Generate a unique identifier based on the user's IP address and user agent
  return `${request.ip}-${request.headers.get('user-agent')}`;
}
