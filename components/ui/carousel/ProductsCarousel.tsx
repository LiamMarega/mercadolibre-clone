'use client'
import Carousel from 'react-multi-carousel';
import ProductCard from '../../card/ProductCard';
import useFetch from '@/hooks/useFetch';
import 'react-multi-carousel/lib/styles.css';
import { Product } from '@/context/CartContext';

export default function ProductsCarousel() {


    const { data, loading, error } = useFetch<{products: Product[]}>('https://fakestoreapi.in/api/products');


    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
          
        }
      };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
  return (
      
        <Carousel responsive={responsive}>
            {data?.products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))} 
        </Carousel>
  );
};
