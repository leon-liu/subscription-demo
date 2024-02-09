'use client';

import Button from '@/components/ui/Button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getImageFile } from '@/utils/helpers';
import { useCallback } from 'react';
import { saveBlob } from '@/utils/client';

export default function ImageList({ images }: { images: any }) {
  const handleDownload = useCallback(async (path: string, fn: string) => {
    const result = await getImageFile({
      url: '/api/image-storage',
      data: { path }
    });

    saveBlob(result, fn);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Settings</TableHead>
          <TableHead>Created Time</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {images &&
          images.map((image: any) => {
            return (
              <TableRow key={image.url}>
                <TableCell>
                  <p>{image.settings.fn}</p>
                  <div className="flex gap-2">
                    <span>{image.settings.size}</span>|
                    <span>{image.settings.dimension}</span>|
                    <span>{image.settings.scale}</span>
                  </div>
                </TableCell>
                <TableCell>{image.created_at}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="slim"
                    onClick={() => handleDownload(image.url, image.settings.fn)}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
