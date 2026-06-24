import Link from 'next/link';

const stats = [
  { label: 'Products', value: '20+' },
  { label: 'Orders', value: '48' },
  { label: 'Customers', value: '312' },
  { label: 'Reviews', value: '126' },
];

const products = [
  { name: 'Midnight Melody Spotify Plaque', category: 'Spotify Plaques', stock: 'In stock', featured: true },
  { name: 'Memory Glow Frame', category: 'Photo Frames', stock: 'Low stock', featured: true },
  { name: 'Couple Quote Mug Set', category: 'Photo Mugs', stock: 'In stock', featured: false },
  { name: 'Celebration Luxe Hamper', category: 'Gift Hampers', stock: 'In stock', featured: true },
];

const orders = [
  { number: '#1024', customer: 'Aanya K.', total: '₹1,499', status: 'Processing', payment: 'Paid' },
  { number: '#1025', customer: 'Rohit S.', total: '₹899', status: 'Shipped', payment: 'Paid' },
  { number: '#1026', customer: 'Meera P.', total: '₹699', status: 'Pending', payment: 'Unpaid' },
  { number: '#1027', customer: 'Kabir J.', total: '₹1,199', status: 'Delivered', payment: 'Paid' },
];

const statusStyles: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-violet-100 text-violet-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
};

const paymentStyles: Record<string, string> = {
  Paid: 'bg-emerald-100 text-emerald-700',
  Unpaid: 'bg-slate-100 text-slate-700',
};

export default function AdminDashboardPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Admin Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Manage products and orders</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">Add, edit, delete products, view orders, and update order status.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/products" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Open catalog</Link>
            <Link href="/cart" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">Open cart</Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[1.75rem] border border-white/80 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <p className="text-sm text-slate-500">{item.label}</p>
              <div className="mt-2 text-3xl font-semibold text-slate-950">{item.value}</div>
            </div>
          ))}
        </section>
      </div>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Products</h2>
              <p className="mt-1 text-sm text-slate-600">Review inventory, pricing, and featured products.</p>
            </div>
            <button type="button" className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">Add Product</button>
          </div>

          <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Stock</th>
                    <th className="px-4 py-3 font-medium">Featured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {products.map((product) => (
                    <tr key={product.name} className="hover:bg-slate-50/70">
                      <td className="px-4 py-4 font-medium text-slate-950">{product.name}</td>
                      <td className="px-4 py-4 text-slate-600">{product.category}</td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.stock === 'Low stock' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.featured ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
                          {product.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Quick edit</h2>
          <p className="mt-1 text-sm text-slate-600">Update a product or create a new one.</p>
          <form className="mt-5 grid gap-4">
            <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100" defaultValue="Personalized Name Box" />
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100" defaultValue="₹799" />
              <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100" defaultValue="Spotify Plaques" />
            </div>
            <textarea className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100" defaultValue="Premium keepsake box crafted for special occasions." />
            <div className="flex flex-wrap gap-3">
              <button type="button" className="rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white">Save product</button>
              <button type="button" className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">Update inventory</button>
            </div>
          </form>
        </article>
      </section>

      <section className="mt-8 rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Orders</h2>
        <p className="mt-1 text-sm text-slate-600">Track order status, payment, and delivery progress.</p>
        <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {orders.map((order) => (
                  <tr key={order.number} className="hover:bg-slate-50/70">
                    <td className="px-4 py-4 font-medium text-slate-950">{order.number}</td>
                    <td className="px-4 py-4 text-slate-600">{order.customer}</td>
                    <td className="px-4 py-4 font-medium text-slate-900">{order.total}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status] ?? 'bg-slate-100 text-slate-700'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentStyles[order.payment] ?? 'bg-slate-100 text-slate-700'}`}>
                        {order.payment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
