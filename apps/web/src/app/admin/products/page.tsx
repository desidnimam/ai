import type { Metadata } from "next";
import Link from "next/link";
import DeleteDialog from "@/components/admin/delete-dialog";
import Paginations from "@/components/ui/pagination";
import { deleteProduct, getAllProducts } from "@/lib/actions/product.actions";
import { APP_NAME } from "@/lib/constants";
import { formatCurrency, formatId } from "@/lib/dutils";
import PageTitle from "@/src/components/mdx/page-title";
import { Button } from "@designali/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@designali/ui/table";

export const metadata: Metadata = {
  title: `Admin Products - ${APP_NAME}`,
};

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: {
    page: string;
    query: string;
    category: string;
  };
}) {
  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";
  const category = searchParams.category || "";
  const products = await getAllProducts({
    query: searchText,
    category,
    page,
  });
  return (
    <div className="px-6">
      <PageTitle
        title="Products"
        description={`Manage your account settings and set e-mail preferences.`}
      />
      <div className="flex justify-center">
        <Button asChild variant="default">
          <Link href="/admin/products/create">Create Product</Link>
        </Button>
      </div>
      <div className="mt-10 rounded-3xl border p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>STOCK</TableHead>
              <TableHead>RATING</TableHead>
              <TableHead className="w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{formatId(product.id)}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/products/${product.id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={product.id} action={deleteProduct} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {products.totalPages > 1 && (
          <Paginations page={page} totalPages={products.totalPages} />
        )}
      </div>
    </div>
  );
}
