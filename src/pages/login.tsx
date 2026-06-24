import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr] sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Login</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Welcome back to Giftify</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">Sign in to track orders, save addresses, and manage your gifting history.</p>
        </div>

        <form className="grid gap-4">
          <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100" placeholder="Email address" type="email" />
          <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100" placeholder="Password" type="password" />
          <button type="button" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Sign in</button>
          <p className="text-sm text-slate-600">
            New here? <Link href="/register" className="font-semibold text-orange-700">Create an account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}