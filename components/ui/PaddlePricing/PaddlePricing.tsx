'use client';

import usePaddle from '@/app/hooks/usePaddle';
import Button from '@/components/ui/Button';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

export default function PaddlePricing({
  session,
  user,
  products,
  subscription
}: Props) {
  const router = useRouter();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const [basicPrice, setBasicPrice] = useState<string>();
  const [standardPrice, setStandardPrice] = useState<string>();
  const [premiumPrice, setPremiumPrice] = useState<string>();
  const paddle = usePaddle();
  
  var itemsList = [
    {
      quantity: 1,
      priceId: 'pri_01hympnpb0vff47wcvpcz5pddy' // standard
    },
    {
      quantity: 1,
      priceId: 'pri_01hympmpbg65ja2tt07scf0awn' // basic
    },
    {
      quantity: 1,
      priceId: 'pri_01hymppcb26cmepzpq8e7bnmjx' // premium
    }
  ];

  var basicItems = [
    {
      quantity: 1,
      priceId: 'pri_01hympmpbg65ja2tt07scf0awn' // basic
    }
  ];
  var standardItems = [
    {
      quantity: 1,
      priceId: 'pri_01hympnpb0vff47wcvpcz5pddy' // standard
    }
  ];
  var premiumItems = [
    {
      quantity: 1,
      priceId: 'pri_01hymppcb26cmepzpq8e7bnmjx' // premium
    }
  ];

  var request = {
    items: itemsList
  };
  // define products and prices
  var premiumProduct = 'pro_01hympj4z3pbwzqwhncg6jj6g1';
  var standardProduct = 'pro_01hympjmt95jsmbp4r1mvy441d';
  var basicProduct = 'pro_01hympk3acaaspps624egwdj02';

  useEffect(() => {
    paddle?.PricePreview(request).then((result) => {
      console.log("asdadasda222", result);

      var items = result.data.details.lineItems;
      for (let item of items) {
        if (item.product.id === basicProduct) {
          setBasicPrice(item.formattedUnitTotals.subtotal);
          console.log('basic ' + item.formattedUnitTotals.subtotal);
        } else if (item.product.id === standardProduct) {
          console.log('standard ' + item.formattedUnitTotals.subtotal);
          setStandardPrice(item.formattedUnitTotals.subtotal);
        } else if (item.product.id === premiumProduct) {
          console.log('premium ' + item.formattedUnitTotals.subtotal);
          setPremiumPrice(item.formattedUnitTotals.subtotal);
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  });

  const handleCheckout = async (items: any, customer?: any) => {
    paddle?.Checkout.open({
      items: items,
      customer: customer
    });
  };

  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>
        </div>
      </div>
      <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
        {/* <div
                className={cn(
                  'rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
                  {
                    'border border-pink-500': subscription
                      ? product.name === subscription?.prices?.products?.name
                      : product.name === 'Freelancer'
                  }
                )}
              > */}
        <div
          className={cn(
            'rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
            {
              'border border-pink-500': !session
            }
          )}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold leading-6 text-white">
              Free
            </h2>
            
            <p className="mt-4 font-semibold text-zinc-300">Pictures / Month: 20</p>
                <p className=" text-zinc-300">Speed: Slow</p>
                <p className=" text-zinc-300">Server: Shared</p>
                <p className=" text-zinc-300">Max Upload Size: 5MB</p>
                <p className=" text-zinc-300">Max Enlarging Ratio: 4x</p>
                <p className=" text-zinc-300">Offline Enlarging: Yes</p>
            <p className="mt-8 ">
              <span className="text-5xl font-extrabold white">$0.00</span>
            </p>
            <Button
              variant="slim"
              type="button"
              onClick={() => router.push('/signin')}
              className={cn(
' w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900', {
  ' !hidden': !!session,
  'block': !session,
})}
            >
              Sign in to enjoy more pictures
            </Button>
          </div>
        </div>

        <div
          className={cn(
            'rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
            {
              'border border-pink-500': !!session
            }
          )}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold leading-6 text-white">
              Basic
            </h2>
            <div className=" text-zinc-300">

            <p className="mt-4 font-semibold">Duration: 2 Months</p>
                <p  className="font-semibold">Pictures / Month: 500</p>
                <p>One time payment</p>
                <p>Speed: Top priority</p>
                <p>Server: HighPerformance</p>
                <p>Max Upload Size: 50MB</p>
                <p>Max Enlarging Ratio: 16x</p>
                <p>Offline Enlarging: Yes</p>
                <p>Parallel Enlarging: Yes</p>
                <p>Batch mode: Yes</p>
            </div>
            <p className="mt-8">
              <span className="text-5xl font-extrabold white">
                {basicPrice}
              </span>
            </p>
            <Button
              variant="slim"
              type="button"
              disabled={!session}
              // loading={priceIdLoading === price.id}
              onClick={() => handleCheckout(basicItems)}
              className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
            >
              {subscription ? 'Subscribed' : 'Subscribe'}
            </Button>
          </div>
        </div>


        <div
          className={cn(
            'rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
            {
              'border border-pink-500': !!session
            }
          )}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold leading-6 text-white">
              Standard
            </h2>
            <p className="mt-4 font-semibold text-zinc-300">Duration: 6 Months</p>
                <p className="font-semibold text-zinc-300">Pictures / Month: 1000</p>
                <p className=" text-zinc-300">One time payment</p>
                <p className=" text-zinc-300">Speed: Top priority</p>
                <p className=" text-zinc-300">Server: HighPerformance</p>
                <p className=" text-zinc-300">Max Upload Size: 50MB</p>
                <p className=" text-zinc-300">Max Enlarging Ratio: 16x</p>
                <p className=" text-zinc-300">Offline Enlarging: Yes</p>
                <p className=" text-zinc-300">Parallel Enlarging: Yes</p>
                <p className=" text-zinc-300">Batch mode: Yes</p>
            <p className="mt-8">
              <span className="text-5xl font-extrabold white">
                {standardPrice}
              </span>
            </p>
            <Button
              variant="slim"
              type="button"
              disabled={!session}
              // loading={priceIdLoading === price.id}
              onClick={() => handleCheckout(standardItems)}
              className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
            >
              {subscription ? 'Subscribed' : 'Subscribe'}
            </Button>
          </div>
        </div>



        <div
          className={cn(
            'rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
            {
              'border border-pink-500': !!session
            }
          )}
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold leading-6 text-white">
              Premium
            </h2>
            <p className="mt-4 font-semibold text-zinc-300">Duration: 12 Months</p>
                <p className=" font-semibold text-zinc-300">Pictures / Month: 2000</p>
                <p className=" text-zinc-300">One time payment</p>
                <p className=" text-zinc-300">Speed: Top priority</p>
                <p className=" text-zinc-300">Server: HighPerformance</p>
                <p className=" text-zinc-300">Max Upload Size: 50MB</p>
                <p className=" text-zinc-300">Max Enlarging Ratio: 16x</p>
                <p className=" text-zinc-300">Offline Enlarging: Yes</p>
                <p className=" text-zinc-300">Parallel Enlarging: Yes</p>
                <p className=" text-zinc-300">Batch mode: Yes</p>
            <p className="mt-8">
              <span className="text-5xl font-extrabold white">
                {premiumPrice}
              </span>
            </p>
            <Button
              variant="slim"
              type="button"
              disabled={!session}
              // loading={priceIdLoading === price.id}
              onClick={() => handleCheckout(premiumItems)}
              className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
            >
              {subscription ? 'Subscribed' : 'Subscribe'}
            </Button>
          </div>
        </div>




      </div>
    </section>
  );
}
