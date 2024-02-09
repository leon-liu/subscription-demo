import { Database } from '@/types_db';

type Price = Database['public']['Tables']['prices']['Row'];

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export const postData = async ({
  url,
  data
}: {
  url: string;
  data?: { price: Price };
}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res.json();
};

export const deleteImageData = async ({
  url,
  data
}: {
  url: string;
  data?: { image_id: string };
}) => {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res.json();
};

export const postImageData = async ({
  url,
  data
}: {
  url: string;
  data?: { img: string; scale: number };
}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res.json();
};

export const postImageRecord = async ({
  url,
  data
}: {
  url: string;
  data?: {
    url: string;
    settings: { fn: string; scale: number; size: string; dimension: string };
  };
}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res.json();
};

export const postImageFile = async ({
  url,
  file
}: {
  url: string;
  file: string;
}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ file })
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res.json();
};

export const getImageFile = async ({
  url,
  data
}: {
  url: string;
  data?: { path: string };
}) => {
  const res = await fetch(`${url}?path=${data?.path}`, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin'
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res.blob();
};

export const toDateTime = (secs: number) => {
  var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};
