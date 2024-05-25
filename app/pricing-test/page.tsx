import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import PaddlePricing from '@/components/ui/PaddlePricing/PaddlePricing';

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  return (
      <PaddlePricing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}/>
  );
}
