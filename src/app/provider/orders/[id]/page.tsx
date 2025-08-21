import { notFound } from 'next/navigation';
import OrderDetails from './order-details';
import { dummyOrders } from '@/lib/data';

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: OrderPageProps) {
  // In a real app, this would fetch from the orders context or API
  // For now, we'll use dummy data and let the client component handle the real data
  return <OrderDetails orderId={params.id} />;
}