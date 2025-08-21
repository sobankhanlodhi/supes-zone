# SupesZone - Dual Interface Web Application

A modern e-commerce web application built with Next.js 15, TypeScript, and shadcn/ui, featuring both a customer-facing storefront and an administrative provider portal.

## Features

### Customer Storefront
- **Homepage**: Hero section, best-selling products carousel, and FAQ section
- **Products Page**: Grid layout with filtering, searching, and sorting capabilities
- **Product Details**: Dynamic routing with detailed product information and add-to-cart functionality
- **Shopping Cart**: Non-persistent cart with quantity limits (1 per product)
- **Checkout**: Complete checkout flow with order creation

### Provider Portal
- **Orders Management**: Paginated table with search and filtering
- **Order Details**: Comprehensive order information with status management
- **Real-time Updates**: Orders created through checkout appear immediately

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: React Context API
- **Icons**: Lucide React
- **Images**: Next.js Image component with Unsplash integration

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout flow
│   ├── products/          # Products listing and details
│   ├── provider/          # Provider portal
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── layout/           # Header and footer
│   └── ui/               # shadcn/ui components
├── contexts/             # React Context providers
├── lib/                  # Utilities and data
└── types/                # TypeScript type definitions
```

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone or extract the project**
   ```bash
   cd supplement-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## Usage Guide

### Customer Experience
1. **Homepage**: Browse featured products and FAQ
2. **Products**: Use filters to find specific supplements
3. **Product Details**: View detailed information and add to cart
4. **Cart**: Review items and proceed to checkout
5. **Checkout**: Complete order with shipping information

### Provider Portal
1. Navigate to `/provider/orders` or use the header link
2. **Orders List**: View all orders with filtering and pagination
3. **Order Details**: Click "View" to see comprehensive order information
4. **Status Management**: Update order status using the dropdown

## Key Features Implemented

### Filtering & Search
- **Category filtering**: Filter by supplement type
- **Price range filtering**: Under $25, $25-$50, Over $50
- **Best seller filtering**: Show only best-selling products
- **Text search**: Search by product name or description
- **Sorting**: Alphabetical, price (high/low), best sellers first

### Cart Management
- **Single quantity limit**: Only one of each product allowed
- **Real-time updates**: Cart count updates in header
- **Persistent during session**: Cart maintains state until page refresh
- **Clear cart option**: Remove all items at once

### Order Management
- **Dynamic order creation**: Orders created from checkout appear immediately
- **Status updates**: Change order status in provider portal
- **Comprehensive search**: Search by order ID, customer name, or product name
- **Date filtering**: Filter orders by time periods
- **Pagination**: Handle large order lists efficiently

## Data Structure

The application uses dummy data with realistic product information:
- **8 Products** across 6 categories (Protein, Performance, Vitamins, etc.)
- **3 Pre-loaded orders** with different statuses
- **5 FAQ items** covering common supplement questions

## Responsive Design

The application is fully responsive with:
- Mobile-first approach using TailwindCSS
- Responsive grid layouts for products
- Mobile-friendly navigation and forms
- Optimized images with Next.js Image component

## Future Enhancements

- User authentication and accounts
- Payment processing integration
- Inventory management
- Email notifications
- Product reviews and ratings
- Advanced analytics dashboard