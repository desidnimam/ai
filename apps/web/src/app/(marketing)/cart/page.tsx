import { getMyCart } from "@/lib/actions/cart.actions";
import { APP_NAME } from "@/lib/constants";

import CartForm from "./cart-form";

export const metadata = {
  title: `Cart - ${APP_NAME}`,
};

export default async function CartPage() {
  const cart = await getMyCart();

  return;
}
