import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-black mb-6">
              SUPES<span className="text-orange-500">ZONE</span>
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Elevate your performance with premium supplements designed for champions. 
              Your journey to peak performance starts here.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="bg-gray-800 hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-gray-800 hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-gray-800 hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="bg-gray-800 hover:bg-orange-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-orange-500 transition-colors duration-200 hover:translate-x-1 transform inline-block">Home</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-orange-500 transition-colors duration-200 hover:translate-x-1 transform inline-block">Products</Link></li>
              <li><Link href="/cart" className="text-gray-300 hover:text-orange-500 transition-colors duration-200 hover:translate-x-1 transform inline-block">Cart</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-orange-500 transition-colors duration-200 hover:translate-x-1 transform inline-block">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Categories</h4>
            <ul className="space-y-3">
              <li><Link href="/products?category=Protein" className="text-gray-300 hover:text-orange-500 transition-colors duration-200 hover:translate-x-1 transform inline-block">Protein</Link></li>
              <li><Link href="/products?category=Vitamins" className="text-gray-300 hover:text-orange-500 transition-colors duration-200 hover:translate-x-1 transform inline-block">Vitamins</Link></li>
              <li><Link href="/products?category=Performance" className="text-gray-300 hover:text-orange-500 transition-colors duration-200 hover:translate-x-1 transform inline-block">Performance</Link></li>
              <li><Link href="/products?category=Recovery" className="text-gray-300 hover:text-orange-500 transition-colors duration-200 hover:translate-x-1 transform inline-block">Recovery</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 SupesZone. All rights reserved. | Privacy Policy | Terms of Service
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Made with 💪 for champions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}