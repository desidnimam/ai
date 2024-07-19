import Products from "@/components/dashboard/products/order-products";
import { getOrderById } from "@/src/lib/actions/order.actions";
import { notFound } from "next/navigation";

const MyProducts = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  
  const order = await getOrderById(id);
  if (!order) notFound();
  return (
    <main className="mt-40">
      <Products order={order}/>
    </main>
  );
}
 
export default MyProducts
