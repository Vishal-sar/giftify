import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import '../app/globals.css';
import 'react-image-gallery/build/image-gallery.css';
import { CartDrawer, CartLauncher, CartProvider } from '../components/cart-context';
import { SiteShell } from '../components/site-shell';
import { Seo } from '../components/seo';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <CartProvider>
      <Seo />
      <SiteShell>
        <Component {...pageProps} />
      </SiteShell>
      <CartLauncher />
      <CartDrawer />
    </CartProvider>
  );
}