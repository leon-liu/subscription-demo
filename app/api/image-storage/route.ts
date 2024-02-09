import { Database } from '@/types_db';
import { createImageFile, retrieveImageFile } from '@/utils/supabase-admin';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const supabase = createRouteHandlerClient<Database>({ cookies });
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) throw Error('Could not get user');

      const { file } = await req.json();

      const fileName = 'out.jpg';
      const response = await fetch(file);
      const blob = await response.blob();

      const contentType = response.headers.get('content-type') || undefined;
      const f = new File([blob], fileName, { type: contentType });
      const path = await createImageFile({
        uuid: user.id || '',
        file: f
      });

      return new Response(JSON.stringify({ path }), {
        status: 200
      });
    } catch (err: any) {
      console.log(err);
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } }),
        {
          status: 500
        }
      );
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405
    });
  }
}

export async function GET(req: Request) {
  if (req.method === 'GET') {
    try {
      const supabase = createRouteHandlerClient<Database>({ cookies });
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) throw Error('Could not get user');

      const url = new URL(req.url);
      const searchParams = new URLSearchParams(url.search);

      const path = searchParams.get('path') || '';

      const data = await retrieveImageFile({
        uuid: user.id || '',
        path
      });

      return new Response(data, {
        status: 200
      });
    } catch (err: any) {
      console.log(err);
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } }),
        {
          status: 500
        }
      );
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'GET' },
      status: 405
    });
  }
}
