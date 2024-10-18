import { Request, Response } from "express";
import stripe from "./stripe";
import { PaymentRequest } from "./payment.interface";

export const createPaymentIntent = async (
  req: Request<{}, {}, PaymentRequest>,
  res: Response
) => {
  const { price } = req.body;
  const amount = Math.round(price * 100);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: "Payment intent creation failed." });
  }
};
