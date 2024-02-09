'use client';

import Button from '@/components/ui/Button';
import { deleteImageData } from '@/utils/helpers';
import { useRouter } from 'next/navigation';

export default function RemoveImagesButton({}) {
  const router = useRouter();
  const removeImagesHandler = async () => {
    try {
      const result = await deleteImageData({
        url: '/api/image'
      });
      router.push("/account");
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  };
  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <p className="pb-4 sm:pb-0">Manage your generate items.</p>
      <Button variant="slim" onClick={removeImagesHandler}>
        Remove all images
      </Button>
    </div>
  );
}
