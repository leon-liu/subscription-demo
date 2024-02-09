import Uploader from '@/components/ui/Uploader';
import FAQ from '@/components/ui/FAQ';
import {
  getSession,
  getSubscription,
} from '@/app/supabase-server';

export default async function HomePage() {
  const [session, subscription] = await Promise.all([
    getSession(),
    getSubscription()
  ]);

  return (
    <>
      <Uploader
        session={session}
        user={session?.user}
        subscription={subscription}
      />
      <FAQ />
    </>
  );
}
