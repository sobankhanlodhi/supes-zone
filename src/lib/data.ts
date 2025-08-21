import { Product, Order, FAQ } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Whey Protein Isolate',
    description: 'Premium whey protein isolate with 25g protein per serving. Perfect for muscle building and recovery.',
    price: 49.99,
    category: 'Protein',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400',
    isBestSeller: true,
    stock: 50
  },
  {
    id: '2',
    name: 'Creatine Monohydrate',
    description: 'Pure creatine monohydrate for increased strength and power output during workouts.',
    price: 24.99,
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    isBestSeller: true,
    stock: 75
  },
  {
    id: '3',
    name: 'Multivitamin Complex',
    description: 'Complete daily multivitamin with essential vitamins and minerals for overall health.',
    price: 19.99,
    category: 'Vitamins',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    isBestSeller: false,
    stock: 100
  },
  {
    id: '4',
    name: 'Pre-Workout Energy',
    description: 'High-energy pre-workout formula with caffeine and beta-alanine for enhanced performance.',
    price: 34.99,
    category: 'Pre-Workout',
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400',
    isBestSeller: true,
    stock: 30
  },
  {
    id: '5',
    name: 'Omega-3 Fish Oil',
    description: 'High-quality fish oil capsules rich in EPA and DHA for heart and brain health.',
    price: 29.99,
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    isBestSeller: false,
    stock: 60
  },
  {
    id: '6',
    name: 'BCAA Recovery',
    description: 'Branched-chain amino acids for muscle recovery and reduced fatigue.',
    price: 27.99,
    category: 'Recovery',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    isBestSeller: false,
    stock: 45
  },
  {
    id: '7',
    name: 'Casein Protein',
    description: 'Slow-digesting casein protein perfect for nighttime muscle recovery.',
    price: 44.99,
    category: 'Protein',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400',
    isBestSeller: false,
    stock: 25
  },
  {
    id: '8',
    name: 'Glutamine Powder',
    description: 'Pure L-Glutamine for enhanced recovery and immune system support.',
    price: 22.99,
    category: 'Recovery',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    isBestSeller: false,
    stock: 40
  }
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I choose the right protein powder?',
    answer: 'Consider your goals, dietary restrictions, and timing. Whey protein is fast-absorbing and great post-workout, while casein is slow-digesting and ideal before bed.'
  },
  {
    id: '2',
    question: 'When should I take creatine?',
    answer: 'Creatine can be taken at any time of day. The most important factor is consistency - take 3-5g daily to maintain muscle creatine stores.'
  },
  {
    id: '3',
    question: 'Are your products third-party tested?',
    answer: 'Yes, all our products undergo rigorous third-party testing for purity, potency, and safety to ensure you get the highest quality supplements.'
  },
  {
    id: '4',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day money-back guarantee on all products. If you are not satisfied, contact our customer service for a full refund.'
  },
  {
    id: '5',
    question: 'Do you offer international shipping?',
    answer: 'Currently, we ship within the United States only. We are working on expanding our shipping options to serve international customers.'
  }
];

export const dummyOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '+1-555-0123',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    items: [
      { product: products[0], quantity: 1 },
      { product: products[1], quantity: 1 }
    ],
    total: 74.98,
    status: 'processing',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'ORD-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    customerPhone: '+1-555-0124',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    items: [
      { product: products[3], quantity: 1 }
    ],
    total: 34.99,
    status: 'shipped',
    createdAt: new Date('2024-01-14')
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Wilson',
    customerEmail: 'mike.w@email.com',
    customerPhone: '+1-555-0125',
    shippingAddress: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    items: [
      { product: products[0], quantity: 1 },
      { product: products[2], quantity: 1 },
      { product: products[4], quantity: 1 }
    ],
    total: 99.97,
    status: 'delivered',
    createdAt: new Date('2024-01-13')
  }
];