import Link from 'next/link';

const footerLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Best Sellers', href: '/bestsellers' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Admin', href: '/admin' },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/70 bg-white/75 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Giftify</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Premium personalized gifts with modern presentation, fast support, and a smooth ordering experience.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {footerLinks.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-orange-700 dark:text-slate-300">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-200/70 px-4 py-5 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © 2026 Giftify. Built for premium personalized gifting.
      </div>
    </footer>
  );
}