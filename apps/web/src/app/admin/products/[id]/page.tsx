import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/product-form";
import { getProductById } from "@/lib/actions/product.actions";
import { APP_NAME } from "@/lib/constants";
import PageTitle from "@/src/components/mdx/page-title";

export const metadata: Metadata = {
  title: `Update product - ${APP_NAME}`,
};

export default async function UpdateProductPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const product = await getProductById(id);
  if (!product) notFound();
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6">
      <PageTitle
        title="Update Products"
        description={`Manage your account settings and set e-mail preferences.`}
      />
      <ProductForm type="Update" product={product} productId={product.id} />
    </div>
  );
}
