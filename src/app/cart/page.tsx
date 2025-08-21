'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';

export default function CartPage() {
  const { state, removeItem, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl p-12 shadow-xl">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Discover our premium supplements and start building your perfect stack!
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black mb-4">SHOPPING CART</h1>
          <p className="text-gray-300">Review your items and proceed to checkout</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item) => (
              <Card key={item.product.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-xl shadow-md"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900 mb-1">{item.product.name}</h3>
                      <p className="text-orange-600 text-sm font-medium bg-orange-50 px-3 py-1 rounded-full inline-block mb-2">
                        {item.product.category}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">${item.product.price}</p>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Quantity</p>
                        <span className="text-lg font-semibold text-gray-900">{item.quantity}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300 rounded-full"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <Button variant="outline" onClick={clearCart} className="rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">
                Clear Cart
              </Button>
              <Link href="/products">
                <Button variant="outline" className="rounded-full">Continue Shopping</Button>
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-xl sticky top-8">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">{item.product.name}</span>
                        <span className="text-gray-500 text-sm ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span className="font-semibold">${(state.total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-orange-600">${(state.total * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block">
                  <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 rounded-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}