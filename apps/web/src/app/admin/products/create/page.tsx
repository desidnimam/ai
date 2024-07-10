import type { Metadata } from "next";
import ProductForm from "@/components/admin/product-form";
import { APP_NAME } from "@/lib/constants";
import PageTitle from "@/src/components/mdx/page-title";

export const metadata: Metadata = {
  title: `Create product - ${APP_NAME}`,
};

export default async function UpdateProductPage() {
  return (
    <>
      <PageTitle
        title="Create Products"
        description={`Manage your account settings and set e-mail preferences.`}
      />
      <div className="my-8 px-6">
        <ProductForm type="Create" />
      </div>
    </>
  );
}
