import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Heart, Image, Briefcase, Music4, Sparkles } from 'lucide-react';

type Category = {
  title: string;
  description: string;
  href: string;
  icon: typeof Gift;
  accent: string;
};

const categories: Category[] = [
  {
    title: 'Birthday Gifts',
    description: 'Celebrate milestones with heartfelt keepsakes and luxurious surprises.',
    href: '/products',
    icon: Gift,
    accent: 'from-[#4A2346] to-[#C8A96B]',
  },
  {
    title: 'Anniversary Gifts',
    description: 'Elegant symbols of love for cherished years together.',
    href: '/products',
    icon: Heart,
    accent: 'from-[#D96A5F] to-[#E8C4CD]',
  },
  {
    title: 'Couple Gifts',
    description: 'Thoughtful pairings designed for romance and connection.',
    href: '/products',
    icon: Sparkles,
    accent: 'from-[#7A8F7A] to-[#C8A96B]',
  },
  {
    title: 'Spotify Plaques',
    description: 'Turn memorable songs into timeless framed keepsakes.',
    href: '/products',
    icon: Music4,
    accent: 'from-[#4A2346] to-[#7A8F7A]',
  },
  {
    title: 'Photo Frames',
    description: 'Display treasured memories in refined, handcrafted frames.',
    href: '/products',
    icon: Image,
    accent: 'from-[#C8A96B] to-[#F5E3E8]',
  },
  {
    title: 'Corporate Gifts',
    description: 'Polished gifting solutions for teams, clients, and milestones.',
    href: '/products',
    icon: Briefcase,
    accent: 'from-[#2F2A2A] to-[#4A2346]',
  },
];

export function CategoriesSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E8C4CD]/70 bg-white/70 px-3 py-2 text-sm font-medium text-[#4A2346] shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 dark:text-[#E8C4CD]">
            <Sparkles className="h-4 w-4" />
            Curated gift categories
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-4xl dark:text-white">
            Discover the perfect gift for every occasion.
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
            Explore luxury, personalized gifting collections crafted to feel memorable, elegant, and effortlessly meaningful.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.article
                key={category.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_60px_rgba(74,35,70,0.14)] dark:border-slate-800 dark:bg-slate-900/80"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${category.accent}`} />
                <div className={`inline-flex rounded-2xl bg-gradient-to-br ${category.accent} p-3 text-white shadow-lg`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {category.description}
                </p>
                <Link
                  href={category.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#4A2346] transition group-hover:gap-3 dark:text-[#E8C4CD]"
                >
                  Explore now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
