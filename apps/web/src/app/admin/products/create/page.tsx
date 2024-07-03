import { Metadata } from "next";
import ProductForm from "@/components/admin/product-form";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Create product - ${APP_NAME}`,
};

export default async function UpdateProductPage() {
  return (
    <>
      <h1 className="h2-bold">Create Product</h1>

      <div className="my-8">
        <ProductForm type="Create" />
      </div>
    </>
  );
}
