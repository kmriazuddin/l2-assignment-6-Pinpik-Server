import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe Key Not Found!");
}

export const stripe = new Stripe(stripeSecretKey);
export default stripe;
