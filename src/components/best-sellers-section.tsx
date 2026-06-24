import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, ShoppingBag, Sparkles, Star, Eye } from 'lucide-react';

type Product = {
  title: string;
  price: string;
  rating: number;
  badge: string;
  image: string;
};

const products: Product[] = [
  {
    title: 'Velvet Keepsake Box',
    price: '$84',
    rating: 4.9,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Golden Memory Frame',
    price: '$72',
    rating: 4.8,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Luxe Couple Set',
    price: '$118',
    rating: 5.0,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Personalized Plaque',
    price: '$96',
    rating: 4.7,
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
  },
];

export function BestSellersSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8C4CD]/70 bg-white/70 px-3 py-2 text-sm font-medium text-[#4A2346] shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 dark:text-[#E8C4CD]">
              <Sparkles className="h-4 w-4" />
              Customer favorites
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-4xl dark:text-white">
              Best Sellers Loved by Gift Givers
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
              Discover premium picks that combine elegance, personalization, and unforgettable presentation.
            </p>
          </div>

          <Link
            href="/bestsellers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A2346] transition hover:gap-3 dark:text-[#E8C4CD]"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.article
              key={product.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 shadow-[0_16px_50px_rgba(15,23,42,0.07)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#4A2346] shadow-sm backdrop-blur">
                  {product.badge}
                </span>
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                  <button className="rounded-full border border-white/70 bg-white/80 p-2 text-slate-700 shadow-sm transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="rounded-full border border-white/70 bg-white/80 p-2 text-slate-700 shadow-sm transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{product.title}</h3>
                    <div className="mt-2 flex items-center gap-1 text-sm text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                      <span className="ml-1 text-slate-600 dark:text-slate-400">{product.rating}</span>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-[#4A2346] dark:text-[#E8C4CD]">{product.price}</span>
                </div>

                <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4A2346] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#352038]">
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
