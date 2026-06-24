import Link from 'next/link';

const shortcuts = [
  { label: 'Edit profile', href: '/account' },
  { label: 'Track orders', href: '/orders' },
  { label: 'Continue shopping', href: '/products' },
];

export default function AccountPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Account</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Customer dashboard</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">Manage your profile, saved addresses, and order preferences in one place.</p>
          <div className="mt-6 grid gap-3">
            {shortcuts.map((item) => (
              <Link key={item.label} href={item.href} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Saved addresses', value: '2' },
            { label: 'Orders this year', value: '8' },
            { label: 'Gift preferences', value: 'Anniversary, birthdays' },
            { label: 'Wishlist items', value: '5' },
          ].map((item) => (
            <article key={item.label} className="rounded-[1.75rem] border border-white/80 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <p className="text-sm text-slate-500">{item.label}</p>
              <div className="mt-2 text-2xl font-semibold text-slate-950">{item.value}</div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}