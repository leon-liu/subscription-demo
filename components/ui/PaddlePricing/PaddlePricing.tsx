'use client';

import usePaddle from '@/app/hooks/usePaddle';

export default function CheckoutButton() {
  const paddle = usePaddle();

  const openCheckout = () => {
    paddle?.Checkout.open({
      items: [
        {
          priceId: 'pri_01hympnpb0vff47wcvpcz5pddy', // you can find it in the product catalog
          quantity: 1
        }
      ],
      customer: {
        email: 'tacticcsteam@gmail.com' // email of your current logged in user
      },
      customData: {
        // other custom metadata you want to pass
      },
      settings: {
        // settings like successUrl and theme
      }
    });
  };

  return <button onClick={openCheckout}>Checkout</button>;
}
