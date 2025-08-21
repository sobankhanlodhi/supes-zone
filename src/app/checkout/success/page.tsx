'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">Order Placed Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Thank you for your order. Your order has been received and is being processed.
            </p>
            
            {orderId && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Order ID:</p>
                <p className="font-mono font-bold">{orderId}</p>
              </div>
            )}
            
            <p className="text-sm text-gray-500">
              You will receive an email confirmation shortly with your order details.
            </p>
            
            <div className="space-y-2 pt-4">
              <Link href="/products" className="block">
                <Button className="w-full">Continue Shopping</Button>
              </Link>
              <Link href="/provider/orders" className="block">
                <Button variant="outline" className="w-full">View in Provider Portal</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}