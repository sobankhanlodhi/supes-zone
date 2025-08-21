'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/cart-context';
import { useOrders } from '@/contexts/orders-context';
import { Order } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useCart();
  const { addOrder } = useOrders();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No items in cart</h1>
          <p className="text-gray-600 mb-8">Add some products before checking out.</p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
    if (!formData.customerEmail.trim()) newErrors.customerEmail = 'Email is required';
    if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Phone is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const order: Order = {
      id: `ORD-${Date.now()}`,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      items: state.items,
      total: state.total * 1.08, // Including tax
      status: 'pending',
      createdAt: new Date()
    };

    addOrder(order);
    clearCart();
    router.push(`/checkout/success?orderId=${order.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/cart" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <Input
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className={errors.customerName ? 'border-red-500' : ''}
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <Input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className={errors.customerEmail ? 'border-red-500' : ''}
                />
                {errors.customerEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <Input
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className={errors.customerPhone ? 'border-red-500' : ''}
                />
                {errors.customerPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Street Address *</label>
                <Input
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className={errors.street ? 'border-red-500' : ''}
                />
                {errors.street && (
                  <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City *</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">State *</label>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={errors.state ? 'border-red-500' : ''}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">ZIP Code *</label>
                  <Input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={errors.zipCode ? 'border-red-500' : ''}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full mt-6">
                Place Order
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>{item.product.name} x{item.quantity}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (8%)</span>
                <span>${(state.total * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(state.total * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}