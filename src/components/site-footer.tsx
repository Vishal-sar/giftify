import Link from 'next/link';
import { Mail, Phone, MapPin, Heart, MessageCircle, Share2 } from 'lucide-react';

const footerSections = [
  {
    title: 'Shop',
    links: [
      { label: 'Products', href: '/products' },
      { label: 'Best Sellers', href: '/bestsellers' },
      { label: 'Categories', href: '/categories' },
      { label: 'Gift Guides', href: '/products' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Track Order', href: '/orders' },
      { label: 'Admin', href: '/admin' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '#' },
      { label: 'Shipping Info', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Custom Orders', href: '/contact' },
    ],
  },
];

const socialLinks = [
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: Share2, href: '#', label: 'Instagram' },
  { icon: Mail, href: '#', label: 'Email' },
];

const contactInfo = [
  { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: Mail, text: 'hello@giftify.com', href: 'mailto:hello@giftify.com' },
  { icon: MapPin, text: 'Mumbai, India', href: '#' },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-slate-950 to-slate-900 text-white dark:bg-slate-950">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Subscribe to our newsletter</h3>
              <p className="mt-2 text-sm text-slate-400">Get exclusive deals, gift ideas, and personalization tips delivered to your inbox.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-sm font-semibold transition hover:shadow-lg hover:shadow-orange-500/25"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4 lg:gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-red-600 text-lg font-bold text-white shadow-lg shadow-orange-500/20">
                G
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight">Giftify</div>
                <div className="text-xs text-slate-400">Premium Gifting</div>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Discover beautifully curated, personalized gifts for every occasion. From custom plaques to luxury hampers, find the perfect present.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-orange-600 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{section.title}</h4>
              <nav className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="inline-flex text-sm text-slate-400 transition hover:text-orange-500"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid gap-6 rounded-2xl border border-slate-800 bg-slate-800/30 p-6 md:grid-cols-3">
          {contactInfo.map(({ icon: Icon, text, href }) => (
            <a
              key={text}
              href={href}
              className="flex items-start gap-3 transition hover:text-orange-500"
            >
              <Icon className="h-5 w-5 flex-shrink-0 text-orange-500" />
              <div className="text-sm">
                <p className="text-slate-400">Contact</p>
                <p className="font-semibold text-white">{text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              © 2026 Giftify. All rights reserved. Built with{' '}
              <Heart className="inline h-4 w-4 text-red-500" /> for gift lovers.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="transition hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="transition hover:text-white">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}