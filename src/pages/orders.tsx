import { useState } from 'react';
import Link from 'next/link';
import { Package, Truck, CheckCircle, Calendar, MapPin, DollarSign, Eye, Download } from 'lucide-react';

const ordersData = [
  {
    number: '#1024',
    item: 'Midnight Melody Spotify Plaque',
    date: '12 Jun 2026',
    status: 'Delivered',
    total: '₹799',
    tracking: 'TRK123456789',
    deliveryDate: '15 Jun 2026',
    address: '123 Main St, Mumbai, MH 400001',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop'
  },
  {
    number: '#1018',
    item: 'Memory Glow Frame',
    date: '28 May 2026',
    status: 'Shipped',
    total: '₹599',
    tracking: 'TRK123456790',
    deliveryDate: 'Est. 14 Jul 2026',
    address: '456 Business Park, Bangalore, KA 560001',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop'
  },
  {
    number: '#1007',
    item: 'Celebration Luxe Hamper',
    date: '03 May 2026',
    status: 'Processing',
    total: '₹1,499',
    tracking: 'TRK123456791',
    deliveryDate: 'Est. 20 Jul 2026',
    address: '123 Main St, Mumbai, MH 400001',
    image: 'https://images.unsplash.com/photo-1549465220-acb624d40b30?w=100&h=100&fit=crop'
  },
];

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { icon: typeof Package; color: string; bgColor: string }> = {
      'Processing': { icon: Package, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
      'Shipped': { icon: Truck, color: 'text-blue-600', bgColor: 'bg-blue-100' },
      'Delivered': { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
    };
    return configs[status] || configs['Processing'];
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Orders</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Order history</h1>
        <p className="mt-2 text-slate-600">Track your deliveries and view order details</p>
      </section>

      {ordersData.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-slate-400" />
          <p className="mt-4 text-lg font-semibold text-slate-950">No orders yet</p>
          <p className="mt-2 text-sm text-slate-600">Start shopping to see your orders here</p>
          <Link
            href="/products"
            className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {ordersData.map((order) => {
            const isExpanded = expandedOrder === order.number;
            const StatusIcon = getStatusConfig(order.status).icon;
            
            return (
              <div
                key={order.number}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-md"
              >
                {/* Order Summary */}
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.number)}
                  className="w-full text-left p-6 hover:bg-slate-50/50 transition"
                >
                  <div className="grid gap-4 sm:grid-cols-[100px_1fr_auto] sm:items-center">
                    <img
                      src={order.image}
                      alt={order.item}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900">{order.item}</p>
                      <p className="mt-1 text-sm text-slate-600">{order.number}</p>
                      <div className="mt-2 flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Calendar className="h-4 w-4" />
                          {order.date}
                        </div>
                        <div className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getStatusConfig(order.status).bgColor} ${getStatusConfig(order.status).color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {order.status}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-slate-950">{order.total}</p>
                      <button
                        type="button"
                        className="mt-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
                      >
                        <Eye className="inline h-4 w-4 mr-1" />
                        {isExpanded ? 'Hide' : 'Details'}
                      </button>
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-200 bg-slate-50 p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Tracking */}
                      <div>
                        <h3 className="font-semibold text-slate-900">Tracking Information</h3>
                        <div className="mt-3 space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-600">Tracking ID:</span>
                            <code className="font-mono text-slate-900">{order.tracking}</code>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">{order.deliveryDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">{order.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div>
                        <h3 className="font-semibold text-slate-900">Order Timeline</h3>
                        <div className="mt-3 space-y-3">
                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="h-3 w-3 rounded-full bg-green-500" />
                              <div className="h-8 w-0.5 bg-green-200" />
                            </div>
                            <div className="pb-3">
                              <p className="font-medium text-slate-900">Order Confirmed</p>
                              <p className="text-xs text-slate-600">{order.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`h-3 w-3 rounded-full ${order.status !== 'Processing' ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <div className={`h-8 w-0.5 ${order.status !== 'Processing' ? 'bg-green-200' : 'bg-gray-200'}`} />
                            </div>
                            <div className="pb-3">
                              <p className="font-medium text-slate-900">Processing</p>
                              <p className="text-xs text-slate-600">Est. completed</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`h-3 w-3 rounded-full ${order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'}`} />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">On its way</p>
                              <p className="text-xs text-slate-600">{order.status === 'Delivered' ? 'Delivered' : 'In transit'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
                      <button className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                        <Download className="h-4 w-4" />
                        Download Invoice
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                        <Eye className="h-4 w-4" />
                        Track Package
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-100">
                        <DollarSign className="h-4 w-4" />
                        Reorder
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Helpful Links */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 p-8">
        <h2 className="text-lg font-semibold text-slate-900">Need help?</h2>
        <p className="mt-2 text-slate-600">Can't find your order or need assistance?</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Contact Support
          </Link>
          <Link
            href="/products"
            className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}