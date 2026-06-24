import { buildWhatsAppUrl } from '../lib/whatsapp';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Contact Us</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Talk to the Giftify team</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">Use WhatsApp for custom gift requests, bulk orders, and order support.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={buildWhatsAppUrl('Hello, I want to order a personalized gift.')} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
            Open WhatsApp
          </a>
          <Link href="/products" className="inline-flex rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">
            Browse products
          </Link>
        </div>
      </section>
    </main>
  );
}