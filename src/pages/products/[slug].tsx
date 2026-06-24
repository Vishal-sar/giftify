import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Heart, MessageCircle, Minus, Plus, ShoppingBag, Star } from 'lucide-react';

import { useCart } from '../../components/cart-context';

const product = {
  name: 'Personalized Name Box',
  slug: 'personalized-name-box',
  id: 'personalized-name-box',
  price: '$42',
  priceValue: 42,
  compareAt: '$54',
  rating: '4.9',
  reviewCount: 128,
  description:
    'A premium keepsake box crafted for birthdays, anniversaries, and milestone moments. Add a name, date, or short message to create a gift that feels truly personal.',
  details: [
    'Velvet-lined interior with magnetic closure',
    'Custom engraving on the lid',
    'Gift-ready premium packaging',
    'Ships within 2-4 business days',
  ],
  gallery: [
    'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1514228742587-6b1558ce89b5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
  ],
  reviews: [
    {
      name: 'Aanya K.',
      rating: 5,
      date: '2 weeks ago',
      text: 'The engraving looked elegant and the packaging was better than expected. This felt like a luxury gift.',
    },
    {
      name: 'Rohit S.',
      rating: 5,
      date: '1 month ago',
      text: 'Great build quality, quick support on WhatsApp, and the whole experience was seamless from order to delivery.',
    },
    {
      name: 'Meera P.',
      rating: 4,
      date: '3 months ago',
      text: 'Beautiful product and very thoughtful presentation. I would order again for another occasion.',
    },
  ],
};

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={`h-4 w-4 ${index < value ? 'fill-current' : 'text-amber-200'}`} />
      ))}
    </div>
  );
}

export default function ProductDetailsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [quantity, setQuantity] = useState(1);
  const { addItem, itemCount, openCart } = useCart();

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.priceValue,
        image: product.gallery[0],
        slug: product.slug,
      },
      quantity,
    );
  };

  return (
    <main className="min-h-screen text-slate-900">
      <header className="border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-orange-700">
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openCart}
              className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
            >
              <ShoppingBag className="h-4 w-4" />
              Cart ({itemCount})
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800"
            >
              <ShoppingBag className="h-4 w-4" />
              Continue shopping
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm">
              <Heart className="h-4 w-4 fill-current" />
              {slug === product.slug ? product.name : 'Sample product'}
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.25fr_0.75fr]">
              <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                <img
                  src={product.gallery[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="grid gap-4">
                {product.gallery.slice(1, 4).map((image, index) => (
                  <div key={image} className="overflow-hidden rounded-[1.5rem] border border-white/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                    <img
                      src={image}
                      alt={`${product.name} gallery ${index + 2}`}
                      className="h-48 w-full object-cover sm:h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {product.gallery.map((image, index) => (
                <button
                  key={image}
                  className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5"
                  type="button"
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-24 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600">Product details</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{product.name}</h1>
              </div>
              <button
                type="button"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-rose-500 transition hover:border-rose-200 hover:bg-rose-50"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <Rating value={5} />
              <span>{product.rating} rating</span>
              <span>({product.reviewCount} reviews)</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-4xl font-semibold text-slate-950">{product.price}</span>
              <span className="pb-1 text-base text-slate-400 line-through">{product.compareAt}</span>
            </div>

            <p className="mt-6 text-base leading-8 text-slate-600">{product.description}</p>

            <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Highlights</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-700">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-orange-500" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="min-w-12 text-center text-base font-semibold">{quantity}</div>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="ml-auto inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to cart
              </button>
            </div>

            <a
              href="https://wa.me/919999999999?text=Hi%20Giftify%2C%20I%20want%20to%20order%20this%20product."
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100"
            >
              <MessageCircle className="h-4 w-4" />
              Order via WhatsApp
            </a>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Description</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              This personalized gift box is designed to create a premium unboxing moment. Every detail, from the finish to the packaging,
              is tuned to feel polished and personal. It is ideal for birthdays, anniversaries, weddings, and special celebrations.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              You can customize the name, message, and occasion details to make the gift feel unique. The collection is crafted to look
              elevated on arrival and memorable long after the occasion.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Reviews</h2>
            <div className="mt-6 grid gap-4">
              {product.reviews.map((review) => (
                <article key={review.name} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-slate-950">{review.name}</div>
                      <div className="text-sm text-slate-500">{review.date}</div>
                    </div>
                    <Rating value={review.rating} />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}