import { Product } from "@/context/CartContext";
import ProductDetails from "./ProductDetails";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const response = await fetch(`https://fakestoreapi.in/api/products/${id}`);
  const { product: data }: { product: Product } = await response.json();
  
  return <ProductDetails data={data} />;
}
