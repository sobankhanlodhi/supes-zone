'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types';
import { useCart } from '@/contexts/cart-context';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem, state } = useCart();
  
  const isInCart = state.items.some(item => item.product.id === product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative h-96 lg:h-[500px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
          {product.isBestSeller && (
            <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Best Seller
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.category}</p>
            <p className="text-4xl font-bold text-primary">${product.price}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Stock:</span>
                <span className={product.stock > 10 ? 'text-green-600' : 'text-orange-600'}>
                  {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Best Seller:</span>
                <span>{product.isBestSeller ? 'Yes' : 'No'}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full text-lg py-6"
              onClick={() => addItem(product)}
              disabled={isInCart || product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isInCart ? 'Already in Cart' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            
            {isInCart && (
              <p className="text-center text-sm text-gray-600">
                This item is already in your cart. You can only add one of each product.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}