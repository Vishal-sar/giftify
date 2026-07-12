import Link from 'next/link';
import { ProductCard } from '../components/product-card';
import { useCart } from '../components/cart-context';

const MOCK_BEST_SELLERS = [
  { id: '1', name: 'Spotify Plaque', price: 799, rating: 4.8, reviews: 24, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop' },
  { id: '2', name: 'Memory Frame', price: 599, rating: 4.6, reviews: 18, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=500&fit=crop' },
  { id: '3', name: 'Luxury Hamper', price: 1499, rating: 4.7, reviews: 41, image: 'https://images.unsplash.com/photo-1549465220-acb624d40b30?w=500&h=500&fit=crop' },
  { id: '4', name: 'Photo Pillow', price: 899, rating: 4.8, reviews: 15, image: 'https://images.unsplash.com/photo-1584308666744-24d5f400f6f5?w=500&h=500&fit=crop' },
  { id: '5', name: 'Custom Keychain', price: 199, rating: 4.6, reviews: 19, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop' },
  { id: '6', name: 'Anniversary Candle', price: 699, rating: 4.9, reviews: 28, image: 'https://images.unsplash.com/photo-1602062791122-4c4c60f51890?w=500&h=500&fit=crop' },
  { id: '9', name: 'Engraved Watch', price: 1299, rating: 4.7, reviews: 35, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop' },
  { id: '10', name: 'Crystal Bookend', price: 549, rating: 4.8, reviews: 11, image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop' },
  { id: '11', name: 'Leather Journal', price: 299, rating: 4.7, reviews: 25, image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop' },
  { id: '12', name: 'Wireless Earbuds', price: 1999, rating: 4.6, reviews: 48, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop' },
];

export default function BestSellersPage() {
  const { addItem } = useCart();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4 rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Best Sellers</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Top rated and most purchased products</h1>
        </div>
        <Link href="/products" className="text-sm font-semibold text-orange-700 hover:text-orange-800">Browse products</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_BEST_SELLERS.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            rating={product.rating}
            reviews={product.reviews}
            image={product.image}
            onAddToCart={() => addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image
            })}
          />
        ))}
      </div>
    </main>
  );
}