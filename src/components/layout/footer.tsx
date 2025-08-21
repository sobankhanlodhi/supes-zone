import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SupplementStore</h3>
            <p className="text-gray-400">
              Your trusted source for high-quality supplements and nutrition products.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products?category=Protein" className="hover:text-white">Protein</Link></li>
              <li><Link href="/products?category=Vitamins" className="hover:text-white">Vitamins</Link></li>
              <li><Link href="/products?category=Performance" className="hover:text-white">Performance</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-white">Returns</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 SupplementStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}