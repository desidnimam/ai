import Link from "next/link";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Button } from "@designali/ui/button";

import { Icons } from "../../icons";

export default async function CartButton() {
  const cart = await getMyCart();
  return (
    <Button asChild size="icon" variant="ghost">
      <Link href="/cart" className="relative">
        <Icons.shoppingbag strokeWidth={1} className="h-5 w-5" />
        {cart && cart.items.length > 0 && (
          <p className="absolute mb-4 ml-4 flex h-3 w-3 items-center justify-center rounded-full bg-ali text-center text-[7px] text-white">
            {cart.items.reduce((a, c) => a + c.qty, 0)}
          </p>
        )}
      </Link>
    </Button>
  );
}
