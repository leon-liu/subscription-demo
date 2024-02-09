'use client';

import Button from '@/components/ui/Button';
import { Button as ButtonUI } from '@/components/ui/button-ui';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { postImageData, postImageRecord, postImageFile } from '@/utils/helpers';
import React, { useCallback, useEffect, useState } from 'react';


const convertBase64 = (file: Blob): Promise<{base64File: string; height: number; width: number}> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e: any) => {
      //Initiate the JavaScript Image object.
      var image = new Image();

      //Set the Base64 string return from FileReader as source.
      image.src = e.target.result;

      //Validate the File Height and Width.
      image.onload = function (ee) {
        const height = (ee.target as HTMLImageElement).height;
        const width = (ee.target as HTMLImageElement).width;
        resolve({ base64File: fileReader.result as string, height, width });
      };
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const getFileSizeWithUnit = (size: number): string => {
  var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
    i = 0;
  //check if file is in GB,MB,KB or Bytes
  while (size > 900) {
    size /= 1024; //divide file size
    i++;
  }
  //get exact size
  var exactSize = Math.round(size * 100) / 100 + ' ' + fSExt[i];
  return exactSize;
};

const sizeLimit = 1024 * 1024;
const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

export default function UploadImage({
  file,
  onDelete,
  hasSubscription,
  loggedIn
}: {
  file: File;
  onDelete: (file: File) => void;
  hasSubscription: boolean;
  loggedIn: boolean;
}) {
  const [message, setMessage] = useState<string>();
  const [result, setResult] = useState('');
  const [imageObj, setImageObj] = useState('');
  const [processing, setProcessing] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [scale, setScale] = useState(2);

  const dimension = `${imageWidth}x${imageHeight}px`;
  const { name, size } = file;
  const formattedSize = getFileSizeWithUnit(size);

  useEffect(() => {
    const fileType = file['type'];
    if (!validImageTypes.includes(fileType)) {
      setMessage('only images in gif, jpeg and png accepted');
      if (!hasSubscription) {
        setIsValid(false);
      }
    }
    if (size > sizeLimit) {
      setMessage('over size');
      if (!hasSubscription) {
        setIsValid(false);
      }
    }

    convertBase64(file).then(({ base64File, height, width }) => {
      setImageHeight(height);
      setImageWidth(width);
      setImageObj(base64File);
    });
  }, []);

  const handleGenerate = useCallback(async () => {
    try {
      setProcessing(true);
      const generatedImageUrl = await postImageData({
        url: '/api/generate-upscale-image',
        data: { img: imageObj, scale }
      });
      if (isValid && loggedIn) {
        const { path } = await postImageFile({
          url: '/api/image-storage',
          file: generatedImageUrl
        });
        const r = await postImageRecord({
          url: '/api/image',
          data: {
            url: path,
            settings: { fn: name, scale, dimension, size: formattedSize }
          }
        });
      }
      setResult(generatedImageUrl);
    } catch (err) {
      throw err;
    } finally {
      setProcessing(false);
    }
  }, [imageObj]);

  const handleDelete = useCallback(() => {
    onDelete(file);
  }, [imageObj]);

  const handleDownload = useCallback(async (imgUrl: string, fn: string) => {
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fn;
    link.click();
    window.URL.revokeObjectURL(url);
  }, []);

  return (
    <>
      <div className="w-full flex items-center justify-center rounded">
        <div className="flex flex-row items-center gap-2 my-2 rounded-md border-solid border-2 border-r-stone-400  w-full md:w-2/3">
          <div className="grid grid-rows-3 grid-cols-3 grid-flow-col gap-4 w-full py-3">
            <div className="row-span-3 grid justify-center items-center">
              {!hasSubscription && (
                <p className=" text-red-500 col-start-1 row-start-1 z-10 text-center">
                  {message}
                </p>
              )}
              {imageObj && (
                <img
                  className={`${
                    !isValid ? 'blur-sm' : ''
                  } w-32 rounded col-start-1 row-start-1`}
                  src={imageObj}
                />
              )}
            </div>
            <div className="col-span-2 text-xs">
              <div> {name} </div>
              <Separator orientation="horizontal" />
              <div className="flex items-center space-x-2">
                <div>{formattedSize}</div>
                <Separator orientation="vertical" />
                <div>{dimension}</div>
              </div>
            </div>
            <div className="row-span-2 col-span-2 flex flex-col gap-2">
              {result ? (
                <>
                  <p
                    className="font-bold uppercase text-sm cursor-pointer"
                    onClick={() => handleDownload(result, name)}
                  >
                    download
                  </p>
                  <p className="text-xs">
                    After upgrading, you can Enlarge images 8x / 16x much more
                    quickly and stably!
                  </p>
                </>
              ) : (
                <div>
                  {isValid && (
                    <div>
                      <div className="flex gap-4">
                        <span className=" text-xs">Upscaling</span>
                        <RadioGroup
                          className="grid-flow-col"
                          orientation="horizontal"
                          defaultValue="2"
                          onValueChange={(e) => setScale(Number(e))}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2" id="r1" defaultChecked />
                            <Label htmlFor="r1" className=" text-xs">
                              2x
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="4"
                              id="r2"
                              disabled={!hasSubscription}
                            />
                            <Label htmlFor="r2" className=" text-xs">
                              4x
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="8"
                              id="r3"
                              disabled={!hasSubscription}
                            />
                            <Label htmlFor="r3" className=" text-xs">
                              8x
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="16"
                              id="r4"
                              disabled={!hasSubscription}
                            />
                            <Label htmlFor="r4" className=" text-xs">
                              16x
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {!hasSubscription && (
                        <p className="text-xs pt-1">
                          <Link href="/signin" className="font-bold">
                            <span>Upgrade to use 4x/8x/16x !</span>
                          </Link>
                        </p>
                      )}
                    </div>
                  )}
                  <div className=" flex gap-4 pt-4">
                    {isValid && (
                      <>
                        <Button
                          variant="flat"
                          type="button"
                          disabled={!file}
                          loading={processing}
                          onClick={() => handleGenerate()}
                          className=" h-4 text-xs font-semibold text-center  rounded-md hover:bg-zinc-900 "
                        >
                          Generate
                        </Button>
                      </>
                    )}
                    <Button
                      variant="flat"
                      type="button"
                      disabled={processing}
                      onClick={() => handleDelete()}
                      className="  h-4 text-xs font-semibold text-center  rounded-md hover:bg-zinc-900 "
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
