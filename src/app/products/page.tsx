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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-black mb-4">PREMIUM SUPPLEMENTS</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our complete range of scientifically-formulated supplements designed to optimize your performance
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
      
        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-full border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-12 rounded-full border-gray-200 focus:border-orange-500">
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
              <SelectTrigger className="h-12 rounded-full border-gray-200 focus:border-orange-500">
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
              <SelectTrigger className="h-12 rounded-full border-gray-200 focus:border-orange-500">
                <SelectValue placeholder="Best Sellers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="true">Best Sellers Only</SelectItem>
                <SelectItem value="false">Regular Products</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-12 rounded-full border-gray-200 focus:border-orange-500">
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
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredAndSortedProducts.length}</span> products
            </p>
            <Button 
              variant="ghost" 
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setPriceFilter('all');
                setBestSellerFilter('all');
                setSortBy('name');
              }}
              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.isBestSeller && (
                    <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                      Best Seller
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {product.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-2">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full font-medium">
                    {product.category}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 space-x-3">
                <Link href={`/products/${product.id}`} className="flex-1">
                  <Button variant="outline" className="w-full rounded-full border-gray-300 hover:border-orange-500 hover:text-orange-600 transition-colors">
                    View Details
                  </Button>
                </Link>
                <Button 
                  onClick={() => addItem(product)} 
                  className="flex-1 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setPriceFilter('all');
                  setBestSellerFilter('all');
                  setSortBy('name');
                }}
                className="bg-orange-500 hover:bg-orange-600 rounded-full px-8"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    
  );
}