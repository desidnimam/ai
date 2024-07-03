import { env } from "../../env";

export const PAYMENT_METHODS = env.PAYMENT_METHODS
  ? env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "CashOnDelivery"];
