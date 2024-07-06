import { notFound } from "next/navigation";
import AddToCart from "@/components/admin/product/add-to-cart";
import ProductImages from "@/components/admin/product/product-images";
import ProductPrice from "@/components/admin/product/product-price";
import Rating from "@/components/admin/product/rating";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { APP_NAME } from "@/lib/constants";
import { round2 } from "@/lib/dutils";
import { auth } from "@designali/auth";

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
  return (
    <div className="mx-auto mt-40 max-w-7xl px-6">
      <h1 className="py-10 text-center text-5xl font-semibold">
        {product.name}
      </h1>
      <section>
        <div className="grid rounded-3xl border">
          <div className="">
            <ProductImages images={product.images} />
          </div>

          <div className=" flex w-full flex-col gap-8 p-5">
            <div className="flex flex-col gap-6">
              <p className="">
                {product.brand} {product.category}
              </p>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <Rating
                value={Number(product.rating)}
                caption={`${product.numReviews} reviews`}
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <ProductPrice value={Number(product.price)} className="" />
                </div>
              </div>
              <div className="mb-2 flex justify-between">
                {product.stock !== 0 && (
                  <div className=" flex-center">
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
                  </div>
                )}
              </div>
            </div>

            <div>
              <p>Description:</p>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <h2 className="h2-bold  mb-5">Customer Reviews</h2>
        <ReviewList
          productId={product.id}
          productSlug={product.slug}
          userId={session.user.id}
        />
      </section>
    </div>
  );
};

export default ProductDetails;
