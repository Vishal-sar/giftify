import { ReactNode, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Breadcrumbs } from './breadcrumbs';
import { SiteFooter } from './site-footer';
import { Navbar } from './navbar';

type SiteShellProps = {
  children: ReactNode;
};

const breadcrumbsByPath: Record<string, { label: string; href?: string }[]> = {
  '/products': [{ label: 'Home', href: '/' }, { label: 'Products' }],
  '/bestsellers': [{ label: 'Home', href: '/' }, { label: 'Best Sellers' }],
  '/categories': [{ label: 'Home', href: '/' }, { label: 'Categories' }],
  '/about': [{ label: 'Home', href: '/' }, { label: 'About' }],
  '/contact': [{ label: 'Home', href: '/' }, { label: 'Contact' }],
  '/cart': [{ label: 'Home', href: '/' }, { label: 'Cart' }],
  '/checkout': [{ label: 'Home', href: '/' }, { label: 'Checkout' }],
  '/login': [{ label: 'Home', href: '/' }, { label: 'Login' }],
  '/register': [{ label: 'Home', href: '/' }, { label: 'Register' }],
  '/account': [{ label: 'Home', href: '/' }, { label: 'My Account' }],
  '/orders': [{ label: 'Home', href: '/' }, { label: 'Order History' }],
  '/order-success': [{ label: 'Home', href: '/' }, { label: 'Order Success' }],
  '/admin': [{ label: 'Home', href: '/' }, { label: 'Admin' }],
};

export function SiteShell({ children }: SiteShellProps) {
  const router = useRouter();

  const breadcrumbs = useMemo(() => {
    if (router.pathname === '/') {
      return [];
    }

    if (router.pathname.startsWith('/product/')) {
      return [{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Product details' }];
    }

    return breadcrumbsByPath[router.pathname] ?? [];
  }, [router.pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.12),transparent_28%),linear-gradient(180deg,#fffaf5_0%,#ffffff_42%,#f8fafc_100%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.12),transparent_28%),linear-gradient(180deg,#020617_0%,#0f172a_42%,#111827_100%)] dark:text-slate-100">
      <Navbar />
      <Breadcrumbs items={breadcrumbs} />
      <div className="w-full overflow-x-hidden">{children}</div>
      <SiteFooter />
    </div>
  );
}
