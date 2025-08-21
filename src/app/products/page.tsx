'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products } from '@/lib/data';
import { useCart } from '@/contexts/cart-context';

export default function ProductsPage() {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [bestSellerFilter, setBestSellerFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = [...new Set(products.map(product => product.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      
      const matchesPrice = 
        priceFilter === 'all' ||
        (priceFilter === 'under-25' && product.price < 25) ||
        (priceFilter === '25-50' && product.price >= 25 && product.price <= 50) ||
        (priceFilter === 'over-50' && product.price > 50);
      
      const matchesBestSeller = 
        bestSellerFilter === 'all' ||
        (bestSellerFilter === 'true' && product.isBestSeller) ||
        (bestSellerFilter === 'false' && !product.isBestSeller);

      return matchesSearch && matchesCategory && matchesPrice && matchesBestSeller;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'best-sellers':
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, categoryFilter, priceFilter, bestSellerFilter, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under-25">Under $25</SelectItem>
            <SelectItem value="25-50">$25 - $50</SelectItem>
            <SelectItem value="over-50">Over $50</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={bestSellerFilter} onValueChange={setBestSellerFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Best Sellers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="true">Best Sellers Only</SelectItem>
            <SelectItem value="false">Regular Products</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Alphabetical</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="best-sellers">Best Sellers First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <div className="relative h-48 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
                {product.isBestSeller && (
                  <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Best Seller
                  </span>
                )}
              </div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription className="text-sm">{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">${product.price}</span>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div>
            </CardContent>
            <CardFooter className="space-x-2">
              <Link href={`/products/${product.id}`} className="flex-1">
                <Button variant="outline" className="w-full">View Details</Button>
              </Link>
              <Button onClick={() => addItem(product)} className="flex-1">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}