import { useCart } from '../components/cart-context';
import { useState } from 'react';
import Link from 'next/link';
import { Truck, Shield, Lock, ArrowRight, Plus, Minus } from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, itemCount } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const tax = subtotal * 0.08;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (formData.phone.length !== 10) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    if (formData.cardNumber.length !== 16) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (items.length === 0) {
      setErrors({ cart: 'Your cart is empty' });
      return;
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setTimeout(() => {
        // In real app, redirect to order success page
        window.location.href = '/order-success';
      }, 1500);
    } catch (err) {
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {success && (
        <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 p-4 flex items-center gap-3 text-green-700">
          <span className="text-2xl">✓</span>
          <div>
            <p className="font-semibold">Order placed successfully!</p>
            <p className="text-sm">Redirecting to order confirmation...</p>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">Checkout</p>
              <h1 className="mt-2 text-2xl font-semibold">Complete your order</h1>
            </div>

            {/* Shipping Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-semibold text-slate-900">Shipping Address</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/20`}
                    placeholder="John Doe"
                    disabled={loading}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/20`}
                    placeholder="john@example.com"
                    disabled={loading}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/20`}
                    placeholder="9876543210"
                    disabled={loading}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.address ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/20`}
                    placeholder="123 Main Street"
                    disabled={loading}
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.city ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/20`}
                    placeholder="Mumbai"
                    disabled={loading}
                  />
                  {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.state ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/20`}
                    placeholder="Maharashtra"
                    disabled={loading}
                  />
                  {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.pincode ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/20`}
                    placeholder="400001"
                    disabled={loading}
                  />
                  {errors.pincode && <p className="mt-1 text-xs text-red-600">{errors.pincode}</p>}
                </div>
              </div>
            </section>

            {/* Payment Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-semibold text-slate-900">Payment Method</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/20"
                    placeholder="John Doe"
                    disabled={loading}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.cardNumber ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/20`}
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    disabled={loading}
                  />
                  {errors.cardNumber && <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/20"
                    placeholder="MM/YY"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.cvv ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-orange-500/20`}
                    placeholder="123"
                    maxLength={3}
                    disabled={loading}
                  />
                  {errors.cvv && <p className="mt-1 text-xs text-red-600">{errors.cvv}</p>}
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-lg font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            >
              {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
            </button>

            {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}
            {errors.cart && <p className="text-sm text-red-600">{errors.cart}</p>}

            {/* Security Features */}
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Lock className="h-4 w-4 text-green-600" />
              <span>Your payment is secure and encrypted</span>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-semibold text-slate-900">Order Summary</h2>
            
            {items.length === 0 ? (
              <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-600">Your cart is empty</p>
                <Link
                  href="/products"
                  className="mt-3 inline-flex rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-slate-900">{item.name}</p>
                        <p className="text-slate-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-slate-200" />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax (8%)</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="my-4 border-t border-slate-200" />
                <div className="flex justify-between text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Shield className="h-4 w-4 text-green-600" />
                    Secure checkout
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Truck className="h-4 w-4 text-blue-600" />
                    Free delivery above ₹500
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}