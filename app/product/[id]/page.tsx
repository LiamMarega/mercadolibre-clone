import { Product } from "@/context/CartContext";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await fetch(`https://fakestoreapi.in/api/products/${id}`);
  const { product: data }: { product: Product } = await response.json();
  
  return (
    <div>
     <img src={data.image} alt={data.title} width={500} height={500} />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <p>{data.price}</p>
      <p>{data.category}</p>
      
    </div>
  )
}
