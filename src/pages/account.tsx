import Link from 'next/link';
import { useState } from 'react';
import { User, MapPin, Heart, ShoppingBag, LogOut, Edit2, Plus, ArrowRight } from 'lucide-react';

export default function AccountPage() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    joinDate: 'Jan 15, 2024',
  });

  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', address: '123 Main St, Mumbai, MH 400001', default: true },
    { id: 2, type: 'Office', address: '456 Business Park, Bangalore, KA 560001', default: false },
  ]);

  const [orders, setOrders] = useState([
    { id: '#1001', product: 'Spotify Plaque', date: '2026-07-01', status: 'Delivered', amount: '₹799' },
    { id: '#1002', product: 'Memory Frame', date: '2026-06-28', status: 'Processing', amount: '₹599' },
    { id: '#1003', product: 'Luxury Hamper', date: '2026-06-20', status: 'Shipped', amount: '₹1,499' },
  ]);

  const [wishlist] = useState([
    { id: 1, name: 'Engraved Watch', price: '₹1,299', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
    { id: 2, name: 'Custom Keychain', price: '₹199', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop' },
    { id: 3, name: 'Anniversary Candle', price: '₹699', image: 'https://images.unsplash.com/photo-1602062791122-4c4c60f51890?w=200&h=200&fit=crop' },
  ]);

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'from-blue-500 to-blue-600' },
    { label: 'Saved Addresses', value: addresses.length, icon: MapPin, color: 'from-green-500 to-green-600' },
    { label: 'Wishlist Items', value: wishlist.length, icon: Heart, color: 'from-red-500 to-red-600' },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 p-8 text-white md:flex md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-white/80">{user.email}</p>
          </div>
        </div>
        <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/30 md:mt-0">
          <Edit2 className="h-4 w-4" />
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`rounded-2xl bg-gradient-to-br ${stat.color} p-6 text-white shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 opacity-40" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 rounded-lg bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
              >
                <ShoppingBag className="h-4 w-4" />
                Continue Shopping
              </Link>
              <Link
                href="/orders"
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                <ArrowRight className="h-4 w-4" />
                Track Orders
              </Link>
              <button className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </section>

          {/* Orders */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <Link href="/orders" className="text-sm text-orange-600 hover:text-orange-700">
                View All
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{order.product}</p>
                    <p className="text-sm text-slate-600">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                    <span className="font-semibold text-slate-900">{order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Addresses */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Saved Addresses</h2>
              <button className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                <Plus className="inline h-4 w-4" /> Add
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-900">{address.type}</p>
                      {address.default && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{address.address}</p>
                  </div>
                  <button className="text-slate-400 transition hover:text-slate-600">
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Info */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-semibold">Profile Information</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm text-slate-600">Name</p>
                <p className="mt-1 font-medium text-slate-900">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <p className="mt-1 font-medium text-slate-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Phone</p>
                <p className="mt-1 font-medium text-slate-900">{user.phone}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Member Since</p>
                <p className="mt-1 font-medium text-slate-900">{user.joinDate}</p>
              </div>
            </div>
          </section>

          {/* Wishlist */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-semibold">Your Wishlist</h2>
            <div className="mt-4 space-y-3">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50 cursor-pointer transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 line-clamp-1">{item.name}</p>
                    <p className="text-sm font-semibold text-orange-600">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/products"
              className="mt-4 block rounded-lg bg-orange-50 py-2 text-center text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
            >
              Add More Items
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}