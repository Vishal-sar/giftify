import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home,
  Info,
  LayoutGrid,
  Menu,
  MoonStar,
  PackageSearch,
  PhoneCall,
  ShoppingBag,
  Store,
  SunMedium,
  UserCircle2,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { useCart } from './cart-context';

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Products', href: '/products', icon: PackageSearch },
  { label: 'Categories', href: '/categories', icon: LayoutGrid },
  { label: 'Best Sellers', href: '/bestsellers', icon: Store },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: PhoneCall },
];

export function Navbar() {
  const router = useRouter();
  const { itemCount } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('giftify-theme') as 'light' | 'dark' | null;
    const nextTheme = storedTheme === 'dark' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  }, []);

  useEffect(() => {
    window.localStorage.setItem('giftify-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const isActive = (href: string) => router.pathname === href || (href !== '/' && router.pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1 transition hover:bg-white/70 dark:hover:bg-slate-900/70">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4A2346] via-[#6d3b5d] to-[#C8A96B] text-sm font-semibold text-white shadow-lg shadow-[#4A2346]/20">
            G
          </span>
          <span className="min-w-0">
            <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#4A2346] dark:text-[#E8C4CD]">
              Giftify
            </span>
            <span className="block truncate text-sm text-slate-600 dark:text-slate-300">
              Premium gifting, beautifully curated
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/70 p-1 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl md:flex lg:gap-2">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 lg:px-4 ${
                  active
                    ? 'bg-[#4A2346] text-white shadow-lg shadow-[#4A2346]/20 dark:bg-[#E8C4CD] dark:text-[#2F2A2A]'
                    : 'text-slate-700 hover:bg-[#F5E3E8] hover:text-[#4A2346] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
            className="hidden rounded-full border border-slate-200 bg-white/80 p-2.5 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 sm:inline-flex"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
          </button>

          <Link
            href="/cart"
            className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 sm:inline-flex"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden md:inline">Cart</span>
            <span className="rounded-full bg-[#4A2346] px-2 py-0.5 text-[11px] font-semibold text-white dark:bg-[#E8C4CD] dark:text-[#2F2A2A]">
              {itemCount}
            </span>
          </Link>

          <Link
            href="/account"
            className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 sm:inline-flex"
          >
            <UserCircle2 className="h-4 w-4" />
            <span className="hidden lg:inline">Profile</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex rounded-full border border-slate-200 bg-white/80 p-2.5 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isDrawerOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm md:hidden"
              onClick={() => setIsDrawerOpen(false)}
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="fixed left-0 top-0 z-50 flex h-full w-[86vw] max-w-sm flex-col border-r border-white/30 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/95"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3" onClick={() => setIsDrawerOpen(false)}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4A2346] via-[#6d3b5d] to-[#C8A96B] text-sm font-semibold text-white shadow-lg shadow-[#4A2346]/20">
                    G
                  </span>
                  <span>
                    <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#4A2346] dark:text-[#E8C4CD]">
                      Giftify
                    </span>
                    <span className="block text-sm text-slate-600 dark:text-slate-300">Premium gifting</span>
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-8 flex flex-1 flex-col gap-2">
                {navItems.map(({ label, href, icon: Icon }) => {
                  const active = isActive(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        active
                          ? 'bg-[#4A2346] text-white shadow-lg shadow-[#4A2346]/20 dark:bg-[#E8C4CD] dark:text-[#2F2A2A]'
                          : 'text-slate-700 hover:bg-[#F5E3E8] hover:text-[#4A2346] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-[#F5E3E8] to-white p-4 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Need a tailored gift?</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Our concierge team can help you create something unforgettable.</p>
                <Link
                  href="/contact"
                  onClick={() => setIsDrawerOpen(false)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#4A2346] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#352038]"
                >
                  <PhoneCall className="h-4 w-4" />
                  Contact us
                </Link>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
