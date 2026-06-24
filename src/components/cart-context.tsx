import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';

export type CartItemInput = {
  id: string;
  name: string;
  price: number;
  image?: string;
  slug?: string;
  customizations?: {
    photoFileName?: string;
    name?: string;
    message?: string;
    spotifyLink?: string;
  };
};

export type CartItem = CartItemInput & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  addItem: (item: CartItemInput, quantity?: number) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CART_STORAGE_KEY = 'giftify-cart';

const CartContext = createContext<CartContextValue | undefined>(undefined);

function parseStoredCart(value: string | null): CartItem[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((entry) => {
        if (!entry || typeof entry !== 'object') {
          return null;
        }

        const candidate = entry as Partial<CartItem>;
        if (
          typeof candidate.id !== 'string' ||
          typeof candidate.name !== 'string' ||
          typeof candidate.price !== 'number' ||
          typeof candidate.quantity !== 'number'
        ) {
          return null;
        }

        return {
          id: candidate.id,
          name: candidate.name,
          price: candidate.price,
          image: typeof candidate.image === 'string' ? candidate.image : undefined,
          slug: typeof candidate.slug === 'string' ? candidate.slug : undefined,
          customizations:
            candidate.customizations && typeof candidate.customizations === 'object'
              ? {
                  photoFileName:
                    typeof candidate.customizations.photoFileName === 'string'
                      ? candidate.customizations.photoFileName
                      : undefined,
                  name:
                    typeof candidate.customizations.name === 'string'
                      ? candidate.customizations.name
                      : undefined,
                  message:
                    typeof candidate.customizations.message === 'string'
                      ? candidate.customizations.message
                      : undefined,
                  spotifyLink:
                    typeof candidate.customizations.spotifyLink === 'string'
                      ? candidate.customizations.spotifyLink
                      : undefined,
                }
              : undefined,
          quantity: Math.max(1, Math.floor(candidate.quantity)),
        } as CartItem;
      })
      .filter((item): item is CartItem => Boolean(item));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setItems(parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY)));
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hasHydrated, items]);

  const addItem = (item: CartItemInput, quantity = 1) => {
    setItems((currentItems) => {
      const normalizedQuantity = Math.max(1, Math.floor(quantity));
      const existingItem = currentItems.find((current) => current.id === item.id);

      if (!existingItem) {
        return [...currentItems, { ...item, quantity: normalizedQuantity }];
      }

      return currentItems.map((current) =>
        current.id === item.id
          ? { ...current, quantity: current.quantity + normalizedQuantity }
          : current,
      );
    });

    setIsOpen(true);
  };

  const incrementItem = (id: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementItem = (id: string) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        isOpen,
        addItem,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((current) => !current),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

export function CartLauncher() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Open cart"
      className="fixed bottom-5 left-5 z-50 inline-flex h-14 items-center gap-3 rounded-full bg-slate-950 px-4 text-white shadow-[0_16px_40px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:bg-slate-800"
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
        <ShoppingBag className="h-5 w-5" />
        {itemCount > 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-semibold text-white">
            {itemCount}
          </span>
        ) : null}
      </span>
      <span className="pr-1 text-sm font-semibold">Cart</span>
    </button>
  );
}

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    isOpen,
    closeCart,
    clearCart,
    incrementItem,
    decrementItem,
    removeItem,
  } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/45 transition-opacity ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/70 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">Your cart</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">{itemCount} item{itemCount === 1 ? '' : 's'}</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-950">Your cart is empty</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Add a product from the catalog or product details page to start building your order.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <article key={item.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                          <ShoppingBag className="h-6 w-6" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="truncate font-semibold text-slate-950">{item.name}</h3>
                          <p className="mt-1 text-sm text-slate-500">${item.price.toFixed(2)}</p>
                          {item.customizations ? (
                            <div className="mt-2 space-y-1 text-xs text-slate-500">
                              {item.customizations.name ? <p>Name: {item.customizations.name}</p> : null}
                              {item.customizations.message ? <p>Message: {item.customizations.message}</p> : null}
                              {item.customizations.spotifyLink ? <p>Spotify: {item.customizations.spotifyLink}</p> : null}
                            </div>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 transition hover:text-rose-500"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => decrementItem(item.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold text-slate-700">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => incrementItem(item.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <div className="ml-auto text-sm font-semibold text-slate-950">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 px-5 py-5">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span className="text-lg font-semibold text-slate-950">${subtotal.toFixed(2)}</span>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Clear cart
            </button>
            <a
              href="/checkout"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Checkout
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}