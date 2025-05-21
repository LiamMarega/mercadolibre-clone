import ProductsCarousel from "../../components/ui/carousel/ProductsCarousel";

export default function Products() {
  return (
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Productos</h1>
        <ProductsCarousel />
      </main>
  );
}
