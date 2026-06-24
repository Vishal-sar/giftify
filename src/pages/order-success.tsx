import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Order Success</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Your order has been placed</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">We are preparing your personalized gift and will update you with the next steps shortly.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/orders" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">View orders</Link>
          <Link href="/products" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">Continue shopping</Link>
        </div>
      </section>
    </main>
  );
}