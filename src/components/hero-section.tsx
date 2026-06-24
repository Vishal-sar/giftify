import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Sparkles, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-transparent">
      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:flex-row lg:gap-14 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-full max-w-2xl text-center lg:text-left"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E8C4CD]/70 bg-white/70 px-3 py-2 text-sm font-medium text-[#4A2346] shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 dark:text-[#E8C4CD]">
            <Sparkles className="h-4 w-4" />
            Thoughtfully curated luxury gifting
          </div>

          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
            Make Every Gift A Memory Worth Keeping
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0 dark:text-slate-300">
            Premium personalized gifts crafted for unforgettable moments, designed to delight from first glance to lasting memory.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4A2346] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4A2346]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#352038]"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Create Your Gift
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 lg:justify-start dark:text-slate-400">
            <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 shadow-sm backdrop-blur-xl dark:bg-slate-900/70">
              <Star className="h-4 w-4 fill-[#C8A96B] text-[#C8A96B]" />
              Premium quality
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 shadow-sm backdrop-blur-xl dark:bg-slate-900/70">
              <Gift className="h-4 w-4 text-[#D96A5F]" />
              Personalized touches
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 }}
          className="relative mt-12 w-full max-w-xl lg:mt-0"
        >
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(200,169,107,0.3),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(77,35,70,0.22),transparent_30%)] blur-3xl" />

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-3 shadow-[0_25px_80px_rgba(74,35,70,0.15)] backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-900/70">
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#FCF8F3_0%,#F5E3E8_45%,#E8C4CD_100%)] p-4 dark:bg-[linear-gradient(135deg,#111827_0%,#1f2937_45%,#334155_100%)]">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-6 top-6 z-10 rounded-[1.25rem] border border-white/70 bg-white/80 p-4 shadow-lg backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4A2346] to-[#C8A96B] text-white">
                  <Gift className="h-5 w-5" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -4, 0] }}
                transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-6 top-16 z-10 rounded-[1.25rem] border border-white/70 bg-[#4A2346] p-4 text-white shadow-xl"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-80">Signature</p>
                <p className="mt-1 text-lg font-semibold">Luxury Box</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0], x: [0, 5, 0] }}
                transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-8 left-1/2 z-20 w-[78%] max-w-[320px] -translate-x-1/2 rounded-[1.75rem] border border-white/70 bg-white/90 p-4 shadow-[0_18px_45px_rgba(74,35,70,0.16)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90"
              >
                <div className="rounded-[1.25rem] bg-gradient-to-br from-[#FCF8F3] to-[#F5E3E8] p-4 dark:from-slate-800 dark:to-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Personalized Gift Set</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Limited Edition</p>
                    </div>
                    <div className="rounded-full bg-[#4A2346] px-3 py-1 text-sm font-semibold text-white">
                      $89
                    </div>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-[#4A2346] to-[#C8A96B]" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 14, 0], rotate: [0, 4, 0] }}
                transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-24 right-6 z-10 rounded-[1.5rem] border border-white/70 bg-white/80 p-3 shadow-lg backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80"
              >
                <div className="h-20 w-20 rounded-[1.25rem] bg-[radial-gradient(circle_at_top_left,#C8A96B,transparent_70%)]" />
              </motion.div>

              <div className="absolute inset-x-8 bottom-8 top-24 rounded-[2rem] border border-white/60" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
