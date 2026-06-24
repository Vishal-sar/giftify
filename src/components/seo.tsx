import Head from 'next/head';
import { useRouter } from 'next/router';

const SEO_MAP: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Giftify | Premium Personalized Gifts',
    description: 'Shop premium personalized gifts, curated collections, and fast gifting checkout with Giftify.',
  },
  '/products': {
    title: 'Products | Giftify',
    description: 'Browse the full Giftify catalog with filters, categories, and premium product cards.',
  },
  '/bestsellers': {
    title: 'Best Sellers | Giftify',
    description: 'Discover the most purchased and top-rated personalized gifts from Giftify.',
  },
  '/categories': {
    title: 'Categories | Giftify',
    description: 'Browse Giftify gift categories and find the right personalized present for any occasion.',
  },
  '/about': {
    title: 'About Giftify',
    description: 'Learn how Giftify builds premium personalized gifts with thoughtful packaging and support.',
  },
  '/contact': {
    title: 'Contact Giftify',
    description: 'Talk to the Giftify team for custom orders, bulk gifting, and WhatsApp support.',
  },
  '/cart': {
    title: 'Cart | Giftify',
    description: 'Review items in your Giftify cart before checkout.',
  },
  '/checkout': {
    title: 'Checkout | Giftify',
    description: 'Complete your order with a smooth checkout flow and delivery details.',
  },
  '/login': {
    title: 'Login | Giftify',
    description: 'Sign in to your Giftify account to track orders and manage saved details.',
  },
  '/register': {
    title: 'Register | Giftify',
    description: 'Create a Giftify account to save addresses, orders, and gift preferences.',
  },
  '/account': {
    title: 'My Account | Giftify',
    description: 'View your profile, addresses, and saved preferences in your Giftify account.',
  },
  '/orders': {
    title: 'Order History | Giftify',
    description: 'Check your Giftify order history, delivery status, and payment details.',
  },
  '/order-success': {
    title: 'Order Success | Giftify',
    description: 'Your order has been placed successfully and is now being processed by Giftify.',
  },
  '/admin': {
    title: 'Admin Dashboard | Giftify',
    description: 'Manage products, orders, customers, and inventory from the Giftify admin dashboard.',
  },
};

export function Seo() {
  const router = useRouter();
  const meta = SEO_MAP[router.pathname] ?? {
    title: 'Giftify',
    description: 'Premium personalized gifts and gifting experiences.',
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={`https://giftify.example${router.asPath.split('?')[0]}`} />
    </Head>
  );
}