import { useCart } from '../components/cart-context';

export default function CheckoutPage() {
  const { subtotal, itemCount } = useCart();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Checkout</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Complete your order</h1>
        <div className="mt-4 rounded-[1.5rem] bg-slate-50 p-4 text-sm text-slate-600">
          {itemCount} items in cart · Subtotal ₹{subtotal.toFixed(2)}
        </div>

        <form className="mt-6 grid gap-4 sm:grid-cols-2">
          {['Name', 'Mobile Number', 'Address', 'City', 'State', 'Pincode'].map((label, index) => (
            <div key={label} className={index === 2 ? 'sm:col-span-2' : ''}>
              <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
              <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100" />
            </div>
          ))}
          <button type="button" className="mt-2 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white sm:col-span-2">
            Place Order
          </button>
        </form>
      </section>
    </main>
  );
}