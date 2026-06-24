import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">About Us</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Giftify creates premium personalized gifts.</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          We design elegant gift products that make birthdays, anniversaries, and celebrations feel more memorable. Our focus is premium presentation, thoughtful personalization, and a smooth ordering experience.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/products" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Explore products</Link>
          <Link href="/contact" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">Contact us</Link>
        </div>
      </section>
    </main>
  );
}