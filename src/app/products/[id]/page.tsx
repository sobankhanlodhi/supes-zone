import { notFound } from 'next/navigation';
import ProductDetails from './product-details';
import { products } from '@/lib/data';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}