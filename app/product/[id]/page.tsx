import { Product } from "@/context/CartContext";
import ProductDetails from "./ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`https://fakestoreapi.in/api/products/${id}`);
  const { product: data }: { product: Product } = await response.json();
  
  return <ProductDetails data={data} />;
}
