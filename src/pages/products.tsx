import { useState, useMemo } from 'react';
import { Search, Filter, Star, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '../components/product-card';
import { useCart } from '../components/cart-context';

// Mock data - replace with real API calls
const MOCK_PRODUCTS = [
  { id: '1', name: 'Spotify Plaque', price: 799, rating: 4.8, reviews: 24, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop', category: 'Music' },
  { id: '2', name: 'Memory Frame', price: 599, rating: 4.6, reviews: 18, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=500&fit=crop', category: 'Photo' },
  { id: '3', name: 'Quote Mug', price: 349, rating: 4.9, reviews: 32, image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=500&h=500&fit=crop', category: 'Mugs' },
  { id: '4', name: 'Luxury Hamper', price: 1499, rating: 4.7, reviews: 41, image: 'https://images.unsplash.com/photo-1549465220-acb624d40b30?w=500&h=500&fit=crop', category: 'Hampers' },
  { id: '5', name: 'Photo Pillow', price: 899, rating: 4.8, reviews: 15, image: 'https://images.unsplash.com/photo-1584308666744-24d5f400f6f5?w=500&h=500&fit=crop', category: 'Home' },
  { id: '6', name: 'Personalized Box', price: 449, rating: 4.5, reviews: 22, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop', category: 'Boxes' },
  { id: '7', name: 'Custom Keychain', price: 199, rating: 4.6, reviews: 19, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop', category: 'Accessories' },
  { id: '8', name: 'Anniversary Candle', price: 699, rating: 4.9, reviews: 28, image: 'https://images.unsplash.com/photo-1602062791122-4c4c60f51890?w=500&h=500&fit=crop', category: 'Candles' },
  { id: '9', name: 'Engraved Watch', price: 1299, rating: 4.7, reviews: 35, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop', category: 'Watches' },
  { id: '10', name: 'Crystal Bookend', price: 549, rating: 4.8, reviews: 11, image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop', category: 'Decor' },
  { id: '11', name: 'Leather Journal', price: 299, rating: 4.7, reviews: 25, image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop', category: 'Stationery' },
  { id: '12', name: 'Wireless Earbuds', price: 1999, rating: 4.6, reviews: 48, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', category: 'Electronics' },
];

const CATEGORIES = ['All', 'Music', 'Photo', 'Mugs', 'Hampers', 'Home', 'Boxes', 'Accessories', 'Candles', 'Watches', 'Decor', 'Stationery', 'Electronics'];

export default function ProductsPage() {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let filtered = MOCK_PRODUCTS;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Catalog</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Our Collection</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">Discover premium, personalized gifts for every occasion. From custom plaques to luxury hampers, find the perfect present.</p>
      </section>

      {/* Filters and Search */}
      <div className="mb-8 grid gap-4 lg:grid-cols-[2fr_1fr]">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
        {/* Categories Sidebar */}
        <aside className="hidden rounded-2xl border border-slate-200 bg-white p-4 h-fit lg:block">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4" />
            <h2 className="font-semibold">Categories</h2>
          </div>
          <nav className="space-y-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  selectedCategory === cat
                    ? 'bg-orange-100 text-orange-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </aside>

        {/* Products Grid */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold">{filteredProducts.length}</span> products
            </p>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm lg:hidden"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map(product => (
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
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-slate-400" />
              <p className="mt-4 text-lg font-semibold text-slate-950">No products found</p>
              <p className="mt-2 text-sm text-slate-600">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
