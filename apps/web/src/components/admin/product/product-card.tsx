import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@designali/ui/button";
import { Card, CardContent, CardHeader } from "@designali/ui/card";

import ProductPrice from "./product-price";
import Rating from "./rating";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="h-auto w-full">
      <CardHeader className="h-auto items-center p-2">
        <Link href={`/products/${product.slug}`}>
          <Image
            alt={product.name}
            className="rounded-lg object-cover object-center"
            height={500}
            src={product.images[0]}
            width={500}
          />
        </Link>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        <div>
          <p className="text-xs">{product.brand}</p>
        </div>
        <div>
          <Link href={`/products/${product.slug}`}>
            <h2 className="text-2xl font-medium">{product.name}</h2>
          </Link>
        </div>
        <div className="flex-between gap-4">
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
        <div>
          <Link
            href={`/products/${[product.slug]}`}
            className="flex w-full gap-2"
          >
            <Button variant="outline" size="lg" className="flex w-full gap-2">
              <span>Add to cart</span>
            </Button>
            <Button variant="outline" size="lg" className="flex w-full gap-2">
              <span>Buy Now</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
