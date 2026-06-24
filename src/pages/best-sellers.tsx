import Link from 'next/link';

import { ProductCard } from '../components/product-card';
import { sampleProducts } from '../lib/catalog';

export default function BestSellersPage() {
  const items = sampleProducts.filter((product) => product.bestSeller).slice(0, 12);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4 rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Best Sellers</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Top rated and most purchased products</h1>
        </div>
        <Link href="/products" className="text-sm font-semibold text-orange-700 hover:text-orange-800">Browse products</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}