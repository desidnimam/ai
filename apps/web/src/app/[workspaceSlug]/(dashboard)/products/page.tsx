import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/src/components/icons";
import PageTitle from "@/src/components/mdx/page-title";
import { getMyOrders } from "@/src/lib/actions/order.actions";
import { Badge } from "@designali/ui/badge";
import { Button } from "@designali/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@designali/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@designali/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@designali/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@designali/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@designali/ui/tabs";
import { TooltipProvider } from "@designali/ui/tooltip";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";

export default async function MyProducts({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = Number(searchParams.page) || 1;
  const orders = await getMyOrders({
    page,
    limit: 10,
  });

  return (
    <div className="mx-auto mt-40 flex w-full max-w-7xl flex-col">
      <PageTitle
        title="Products"
        description={`Manage your products and view their sales performance.`}
      />

      <TooltipProvider>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="grid gap-2 items-center md:flex">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
                <div className="md:ml-auto justify-center flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Archived
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Export
                    </span>
                  </Button>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Product
                    </span>
                  </Button>
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Price
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Created at
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.data.map((order) => (
                          <TableRow>
                            <TableCell className="hidden sm:table-cell">
                              <Image
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="/placeholder.svg"
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium"></TableCell>
                            <TableCell className="font-medium">
                              {order.id.substring(20, 24)}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Icons.dot
                                      strokeWidth={5}
                                      className="h-5 w-5 text-ali"
                                    />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                  {order.id}
                                </PopoverContent>
                              </Popover>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">Draft</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {order.itemsPrice}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {order.isDelivered}
                            </TableCell>
                            <TableCell>
                              <Link href={`/dashboard/products/${order.id}`} className="hidden md:block">
                                <Button variant="outline" size="sm">View product</Button>
                              </Link>
                              <Link href={`/dashboard/products/${order.id}`} className="block md:hidden">
                                <Button variant="outline" size="icon">
                                  <Icons.eye className="w-4 h-4" />
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                      products
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </TooltipProvider>
    </div>
  );
}
