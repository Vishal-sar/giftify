const orders = [
  { number: '#1024', item: 'Midnight Melody Spotify Plaque', date: '12 Jun 2026', status: 'Delivered', total: '₹799' },
  { number: '#1018', item: 'Memory Glow Frame', date: '28 May 2026', status: 'Shipped', total: '₹599' },
  { number: '#1007', item: 'Celebration Luxe Hamper', date: '03 May 2026', status: 'Processing', total: '₹1,499' },
];

export default function OrdersPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Orders</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Order history</h1>
        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Item</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {orders.map((order) => (
                  <tr key={order.number} className="hover:bg-slate-50/70">
                    <td className="px-4 py-4 font-medium text-slate-950">{order.number}</td>
                    <td className="px-4 py-4 text-slate-600">{order.item}</td>
                    <td className="px-4 py-4 text-slate-600">{order.date}</td>
                    <td className="px-4 py-4 text-slate-600">{order.status}</td>
                    <td className="px-4 py-4 font-medium text-slate-900">{order.total}</td>
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