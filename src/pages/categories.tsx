import Link from 'next/link';

import { productCategories, sampleProducts } from '../lib/catalog';

export default function CategoriesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Categories</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Browse by product category</h1>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {productCategories.map((category) => {
          const count = sampleProducts.filter((product) => product.category === category).length;
          return (
            <Link key={category} href={`/products?category=${encodeURIComponent(category)}`} className="rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">{count} items</div>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">{category}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">Curated collection for gifting and personalization.</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}