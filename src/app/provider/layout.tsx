import Link from 'next/link';

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Provider Portal</h1>
            <nav className="flex items-center space-x-6">
              <Link 
                href="/provider/orders" 
                className="text-gray-600 hover:text-primary font-medium"
              >
                Orders
              </Link>
              <Link 
                href="/" 
                className="text-gray-600 hover:text-primary font-medium"
              >
                Back to Store
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="py-8">
        {children}
      </div>
    </div>
  );
}