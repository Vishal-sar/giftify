import Link from 'next/link';

import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

import { useCart } from '../components/cart-context';

export default function CartPage() {
  const { items, subtotal, clearCart, incrementItem, decrementItem, removeItem } = useCart();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Shopping Cart</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Review your items</h1>

          {items.length === 0 ? (
            <div className="mt-8 rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-slate-400" />
              <p className="mt-4 text-lg font-semibold text-slate-950">Your cart is empty</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">Explore the catalog and add personalized gifts to your cart.</p>
              <Link href="/products" className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Shop products</Link>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {items.map((item) => (
                <article key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex gap-4">
                    <img src={item.image} alt={item.name} className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="truncate font-semibold text-slate-950">{item.name}</h2>
                          <p className="mt-1 text-sm text-slate-500">₹{item.price.toFixed(2)}</p>
                        </div>
                        <button type="button" onClick={() => removeItem(item.id)} className="text-slate-400 transition hover:text-rose-500" aria-label={`Remove ${item.name}`}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <button type="button" onClick={() => decrementItem(item.id)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold text-slate-700">{item.quantity}</span>
                        <button type="button" onClick={() => incrementItem(item.id)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700">
                          <Plus className="h-4 w-4" />
                        </button>
                        <div className="ml-auto text-sm font-semibold text-slate-950">₹{(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Order Summary</h2>
          <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span className="text-xl font-semibold text-slate-950">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/checkout" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
              Checkout
            </Link>
            <button type="button" onClick={clearCart} className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">
              Clear cart
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}