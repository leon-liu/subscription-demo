'use client';

import UploadImage from '@/components/ui/UploadImage';
import { Database } from '@/types_db';
import { Session, User } from '@supabase/supabase-js';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  session: Session | null;
  user: User | null | undefined;
  subscription: SubscriptionWithProduct | null;
}

export default function Uploader({ session, user, subscription }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [userSubscription, setUserSubscription] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const handleFile = useCallback((e: any) => {
    const target = e.target as HTMLInputElement;
    let fileList = target.files;
    const len = fileList?.length;
    const fs = [];
    for (let i = 0; i < len; i++) {
      fs.push(fileList[i]);
    }
    setFiles(fs);
  }, []);

  const onDelete = (file: File) => {
    setFiles((prevState) => {
      return prevState.filter((e) => e !== file);
    });
  };

  useEffect(() => {
    const hasSubscription =
      session !== null &&
      user !== null &&
      subscription !== null &&
      Date.parse(subscription.current_period_end) >= Date.now();
    setUserSubscription(hasSubscription);
    setLoggedIn(session !== null);
  }, []);

  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Upscale Image
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Upload your image and give a try
          </p>
          <div className="relative  w-full md:w-1/2 self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
            <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer border-gray-400 border-dotted">
              <input
                type="file"
                onChange={handleFile}
                className="h-full w-full opacity-0 z-10 absolute"
                name="files[]"
                multiple
              />
              <div className="h-full w-full  absolute z-1 flex justify-center items-center top-0">
                <div className="flex flex-col">
                  <i className="mdi mdi-folder-open  text-center"></i>
                  <span>{`Upload or drag & drop an image`}</span>
                </div>
              </div>
            </div>
          </div>
          {!session && (
            <div className=" text-center py-8">
              <Link href="/signin" aria-label="login">
                Want to enlarge more images faster and with more stability?
                Login!
              </Link>
            </div>
          )}
          <div className=" my-4">
            {files &&
              files.map((file: File) => {
                return (
                  <UploadImage
                    file={file}
                    onDelete={onDelete}
                    key={file.name}
                    hasSubscription={userSubscription}
                    loggedIn={loggedIn}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
