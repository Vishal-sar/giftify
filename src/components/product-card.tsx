import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';

import { Product } from '../lib/catalog';
import { useCart } from './cart-context';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="group overflow-hidden rounded-[1.9rem] border border-white/80 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/3] bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.18),transparent_30%),linear-gradient(135deg,rgba(255,237,213,0.96),rgba(255,255,255,0.9),rgba(254,202,202,0.24))] p-5">
          <img src={product.image} alt={product.name} className="h-full w-full rounded-[1.5rem] object-cover" />
          <span className="absolute left-8 top-8 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700 shadow-sm">
            {product.badge}
          </span>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{product.category}</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">{product.name}</h3>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-600">
            <Star className="h-4 w-4 fill-current" />
            {product.rating.toFixed(1)}
          </div>
        </div>

        <p className="mt-3 text-sm leading-7 text-slate-600">{product.shortDescription}</p>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <div className="text-sm text-slate-500 line-through">₹{product.compareAtPrice.toFixed(2)}</div>
            <div className="text-2xl font-semibold text-slate-950">₹{product.price.toFixed(2)}</div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  slug: product.slug,
                })
              }
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <ShoppingBag className="h-4 w-4" />
              Add
            </button>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-rose-500 transition hover:border-rose-200 hover:bg-rose-50"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
