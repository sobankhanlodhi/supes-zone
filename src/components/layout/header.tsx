'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { useState } from 'react';

export default function Header() {
  const { state } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-black text-gray-900 tracking-tight">
            SUPES<span className="text-orange-500">ZONE</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link href="/provider" className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group">
              Provider Portal
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative hover:bg-orange-50 transition-colors duration-200">
                <ShoppingCart className="h-5 w-5" />
                {state.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                    {state.items.length}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="hover:bg-orange-50 transition-colors duration-200">
              <User className="h-5 w-5" />
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/provider" 
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Provider Portal
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}