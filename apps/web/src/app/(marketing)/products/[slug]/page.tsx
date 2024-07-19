import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/admin/product/add-to-cart";
import ProductImages from "@/components/admin/product/product-images";
import ProductPrice from "@/components/admin/product/product-price";
import Rating from "@/components/admin/product/rating";
import { getMyCart } from "@/lib/actions/cart.actions";
import {
  getLatestProducts,
  getProductBySlug,
} from "@/lib/actions/product.actions";
import { APP_NAME } from "@/lib/constants";
import { round2 } from "@/lib/dutils";
import ProductList from "@/src/components/admin/product/product-list";
import { auth } from "@designali/auth";
import { Button } from "@designali/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@designali/ui/breadcrumb";

import ReviewList from "./review-list";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: `${product.name} - ${APP_NAME}`,
    description: product.description,
  };
}

const ProductDetails = async ({
  params: { slug },
}: {
  params: { slug: string };
  searchParams: { page: string; color: string; size: string };
}) => {
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const cart = await getMyCart();
  const session = await auth();
  const latestProducts = await getLatestProducts();
  return (
    <div className="mx-auto mt-20 max-w-7xl px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/products">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="py-4 text-3xl font-semibold md:py-10 md:text-5xl">
        {product.name}
      </h1>
      <section>
        <div className="grid rounded-3xl border">
          <div className="">
            <ProductImages images={product.images} />
          </div>

          <div className=" flex w-full flex-col gap-4 p-5">
            <div className="flex flex-wrap justify-between gap-6">
              <h1 className="text-xl font-semibold md:text-4xl">
                {product.name}
              </h1>
              <p className="">
                {product.brand} {product.category}
              </p>
            </div>

            <div className="flex flex-wrap justify-between gap-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <ProductPrice value={Number(product.price)} className="" />
                </div>
              </div>
              <Rating
                value={Number(product.rating)}
                caption={`${product.numReviews} reviews`}
              />
            </div>
          </div>
          <div className="grid w-full justify-center gap-2 px-4 md:flex">
            <Link
              href={`/products/${[product.slug]}`}
              className="grid w-full gap-2 md:flex "
            >
              <Button
                variant="outline"
                size="lg"
                className="grid w-full gap-2 md:flex "
              >
                <span>Buy Now</span>
              </Button>
            </Link>
            <div className="w-sm flex justify-center">
              {product.stock !== 0 && (
                <AddToCart
                  cart={cart}
                  item={{
                    productId: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: round2(product.price),
                    qty: 1,
                    image: product.images[0],
                  }}
                />
              )}
            </div>
            <Link
              href={`/products/${[product.slug]}`}
              className="grid w-full gap-2 md:flex "
            >
              <Button
                variant="outline"
                size="lg"
                className="grid w-full gap-2 md:flex "
              >
                <span>Get full access</span>
              </Button>
            </Link>
          </div>

          <div className="mt-8 p-4">
            <p className="py-4 text-slate-600 dark:text-slate-400">
              Description:
            </p>
            <p>{product.description}</p>
          </div>
        </div>
      </section>
      <h1 className="py-20 text-center text-4xl">Latest Products</h1>
      <ProductList title="" data={latestProducts} />
      <section className="mt-10">
        <h2 className=" mb-5 text-slate-600 dark:text-slate-400">
          Customer Reviews
        </h2>
        {session ? (
        <ReviewList
          productId={product.id}
          productSlug={product.slug}
          userId={session.user.id}
        />
      ) : (
        <Button variant="outline" size="lg">
          <Link href="/login">
            Login to see the reviews
            <span className="sr-only">Buy now</span>
          </Link>
        </Button>
      )}
      </section>
    </div>
  );
};

export default ProductDetails;
