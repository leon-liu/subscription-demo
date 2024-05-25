"use client";

import { initializePaddle, InitializePaddleOptions, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

export default function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle>();
  console.log(process.env.NEXT_PUBLIC_PADDLE_SANDBOX === 'production' ? "production" : "sandbox")
  useEffect(() => {
    initializePaddle({
      environment: process.env.NEXT_PUBLIC_PADDLE_SANDBOX === 'production' ? "production" : "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
      // seller: Number(process.env.NEXT_PUBLIC_PADDLE_SELLER_ID),
    } as unknown as InitializePaddleOptions).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  console.log('==============', paddle)
  return paddle;
}