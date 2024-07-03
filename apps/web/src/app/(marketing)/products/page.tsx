import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";
import ProductList from "@/src/components/admin/product/product-list";

export default async function Home() {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <div>
      <div className="mx-auto mt-20 max-w-7xl space-y-8">
        <ProductList title="Newest Arrivals" data={latestProducts} />
      </div>
    </div>
  );
}
