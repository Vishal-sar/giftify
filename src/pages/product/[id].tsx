import { useState } from 'react';
import { useRouter } from 'next/router';
import ImageGallery from 'react-image-gallery';
import { MessageCircle, Plus, ShoppingBag, Star, Upload } from 'lucide-react';

import { Rating } from '../../components/rating';
import { useCart } from '../../components/cart-context';
import { getProductById } from '../../lib/catalog';
import { buildWhatsAppUrl } from '../../lib/whatsapp';

export default function ProductDetailsPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [photoFileName, setPhotoFileName] = useState('');
  const [customName, setCustomName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [spotifyLink, setSpotifyLink] = useState('');

  const product = router.isReady && router.query.id ? getProductById(String(router.query.id)) : undefined;

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="rounded-[2rem] border border-white/80 bg-white/90 p-6 text-slate-600 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          Product not found.
        </p>
      </main>
    );
  }

  const galleryItems = product.views360.map((image) => ({ original: image, thumbnail: image }));

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
        customizations: {
          photoFileName,
          name: customName,
          message: customMessage,
          spotifyLink,
        },
      },
      quantity,
    );
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-6">
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
            <ImageGallery items={galleryItems} showFullscreenButton={false} showPlayButton={false} />
          </div>
          <p className="mt-4 text-sm text-slate-500">Drag to rotate through the product image set.</p>
        </section>

        <aside className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Product Details</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <Rating value={Math.round(product.rating)} />
            <span className="text-sm text-slate-600">{product.rating.toFixed(1)} rating</span>
            <span className="text-sm text-slate-500">({product.reviewCount} reviews)</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-semibold text-slate-950">₹{product.price.toFixed(2)}</span>
            <span className="pb-1 text-base text-slate-400 line-through">₹{product.compareAtPrice.toFixed(2)}</span>
          </div>

          <p className="mt-6 text-base leading-8 text-slate-600">{product.description}</p>

          <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Customization</h2>
            <div className="mt-4 grid gap-3">
              <label className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                <div className="mb-2 flex items-center gap-2 font-semibold text-slate-950"><Upload className="h-4 w-4" /> Upload Photo</div>
                <input type="file" onChange={(event) => setPhotoFileName(event.target.files?.[0]?.name ?? '')} className="w-full text-sm text-slate-500" />
                {photoFileName ? <p className="mt-2 text-xs text-slate-500">Selected: {photoFileName}</p> : null}
              </label>
              <input value={customName} onChange={(event) => setCustomName(event.target.value)} placeholder="Add Name" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100" />
              <textarea value={customMessage} onChange={(event) => setCustomMessage(event.target.value)} placeholder="Add Custom Message" className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100" />
              <input value={spotifyLink} onChange={(event) => setSpotifyLink(event.target.value)} placeholder="Spotify Link" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100" />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
            <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200">
              -
            </button>
            <div className="min-w-12 text-center text-base font-semibold">{quantity}</div>
            <button type="button" onClick={() => setQuantity((current) => current + 1)} className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200">
              <Plus className="h-4 w-4" />
            </button>
            <button type="button" onClick={handleAddToCart} className="ml-auto inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              <ShoppingBag className="h-4 w-4" />
              Add To Cart
            </button>
          </div>

          <a href={buildWhatsAppUrl('Hello, I want to order a personalized gift.')} target="_blank" rel="noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100">
            <MessageCircle className="h-4 w-4" />
            Buy Now
          </a>
        </aside>
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-semibold text-slate-950">Description</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">{product.description}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {product.images.map((image) => (
              <img key={image} src={image} alt={product.name} className="h-28 w-full rounded-2xl object-cover" />
            ))}
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            This product supports multiple image views, a drag-enabled gallery, and customization fields for photo, name, message, and Spotify link.
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-semibold text-slate-950">Reviews</h2>
          <div className="mt-5 grid gap-4">
            {[
              'Beautiful quality and clean personalization.',
              'Premium packaging and quick delivery.',
              'Excellent support, would buy again.',
            ].map((review, index) => (
              <div key={review} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-slate-950">Customer {index + 1}</div>
                  <Rating value={5 - (index % 2)} />
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{review}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}