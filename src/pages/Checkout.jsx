import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { FiCheckCircle } from 'react-icons/fi'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { user, placeOrder } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Success
  const [placedOrder, setPlacedOrder] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=checkout')
    }
  }, [user, navigate])

  const shippingForm = useFormik({
    initialValues: { address: '', city: '', state: '', zip: '', country: 'United States' },
    validationSchema: Yup.object({
      address: Yup.string().required('Street address is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zip: Yup.string().required('Zip code is required').min(5, 'Invalid zip code'),
      country: Yup.string().required('Country is required')
    }),
    onSubmit: () => {
      setStep(2)
    }
  })

  const handlePlaceOrder = () => {
    const deliveryFee = 15
    const total = subtotal + deliveryFee
    const order = placeOrder(items, total, shippingForm.values)
    if (order) {
      setPlacedOrder(order)
      clearCart()
      setStep(3)
    }
  }

  if (step === 3 && placedOrder) {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <FiCheckCircle size={80} className="text-black mx-auto mb-6" />
          <h1 className="text-4xl font-black mb-3">ORDER CONFIRMED!</h1>
          <p className="text-black/60 mb-1">Your order has been placed successfully.</p>
          <p className="text-sm font-bold mb-8">Order ID: #{placedOrder.id}</p>
          <div className="bg-[#F7F7F7] rounded-2xl p-6 mb-8 text-left space-y-2 border border-[#e5e5e5]">
            <p className="text-xs font-bold uppercase tracking-wider text-black/40">Deliver To:</p>
            <p className="text-sm font-bold text-black">{user?.name}</p>
            <p className="text-sm text-black/75">{shippingForm.values.address}, {shippingForm.values.city}</p>
            <p className="text-sm text-black/75">{shippingForm.values.state}, {shippingForm.values.zip}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link to="/" className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              Continue Shopping
            </Link>
            <Link to="/account" className="border border-[#e5e5e5] px-6 py-3 rounded-full text-sm font-medium hover:bg-black/5 transition-all">
              View Order History
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8">
      <h1 className="text-3xl font-black mb-8">CHECKOUT</h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="border border-[#e5e5e5] rounded-3xl p-6 bg-white self-start">
          <div className="flex gap-6 mb-8 border-b border-[#f0f0f0] pb-4">
            <span className={`text-sm font-bold pb-2 border-b-2 transition-all ${step === 1 ? 'border-black text-black' : 'border-transparent text-black/30'}`}>1. Shipping Info</span>
            <span className={`text-sm font-bold pb-2 border-b-2 transition-all ${step === 2 ? 'border-black text-black' : 'border-transparent text-black/30'}`}>2. Payment Method</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form key="ship" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={shippingForm.handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1">Street Address</label>
                  <input type="text" name="address" value={shippingForm.values.address} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} className="w-full border border-[#e5e5e5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black" />
                  {shippingForm.touched.address && shippingForm.errors.address && <p className="text-xs text-red-500 mt-1">{shippingForm.errors.address}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1">City</label>
                    <input type="text" name="city" value={shippingForm.values.city} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} className="w-full border border-[#e5e5e5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black" />
                    {shippingForm.touched.city && shippingForm.errors.city && <p className="text-xs text-red-500 mt-1">{shippingForm.errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1">State / Province</label>
                    <input type="text" name="state" value={shippingForm.values.state} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} className="w-full border border-[#e5e5e5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black" />
                    {shippingForm.touched.state && shippingForm.errors.state && <p className="text-xs text-red-500 mt-1">{shippingForm.errors.state}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1">Zip / Postal Code</label>
                    <input type="text" name="zip" value={shippingForm.values.zip} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} className="w-full border border-[#e5e5e5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black" />
                    {shippingForm.touched.zip && shippingForm.errors.zip && <p className="text-xs text-red-500 mt-1">{shippingForm.errors.zip}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1">Country</label>
                    <input type="text" name="country" value={shippingForm.values.country} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} className="w-full border border-[#e5e5e5] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black" />
                    {shippingForm.touched.country && shippingForm.errors.country && <p className="text-xs text-red-500 mt-1">{shippingForm.errors.country}</p>}
                  </div>
                </div>
                <button type="submit" className="w-full bg-black text-white py-3.5 rounded-full text-sm font-medium mt-4 hover:opacity-90 transition-opacity">Continue to Payment</button>
              </motion.form>
            ) : (
              <motion.div key="pay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-black/40 mb-3">Available Payment Methods</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border border-black rounded-xl p-4 bg-[#fcfcfc] cursor-pointer">
                      <span className="font-semibold text-sm text-black flex items-center gap-2">Cash on Delivery (COD)</span>
                      <span className="w-4 h-4 rounded-full bg-black border-2 border-white inline-block"></span>
                    </div>
                    {['Credit / Debit Card', 'UPI / NetBanking'].map(opt => (
                      <div key={opt} className="flex items-center justify-between border border-[#e5e5e5] rounded-xl p-4 bg-gray-50 opacity-50 cursor-not-allowed">
                        <span className="font-medium text-sm text-black/60">{opt}</span>
                        <span className="text-[10px] uppercase font-bold text-black/40 bg-black/5 px-2 py-0.5 rounded">Unavailable</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={() => setStep(1)} className="flex-1 border border-[#e5e5e5] py-3.5 rounded-full text-sm font-medium hover:bg-black/5 transition-all">Back</button>
                  <button onClick={handlePlaceOrder} className="flex-1 bg-black text-white py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">Place Order</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border border-[#e5e5e5] rounded-3xl p-6 bg-[#fbfbfb] self-start space-y-6">
          <h2 className="text-lg font-bold text-black">Summary</h2>
          <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
            {items.map(item => (
              <div key={item.key} className="flex gap-3 text-sm">
                <img src={item.image} className="w-12 h-12 rounded-lg object-cover border bg-white" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-black truncate">{item.name}</p>
                  <p className="text-xs text-black/40">Size: {item.size} | Color: {item.color}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-black">${item.price}</p>
                  <p className="text-xs text-black/40">Qty: {item.qty}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#e5e5e5] pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between"><span className="text-black/50">Subtotal</span><span className="font-bold text-black">${subtotal}</span></div>
            <div className="flex justify-between"><span className="text-black/50">Delivery Fee</span><span className="font-bold text-black">$15</span></div>
            <div className="flex justify-between border-t border-[#e5e5e5] pt-2.5 text-base font-bold"><span className="text-black">Total</span><span className="text-black">${subtotal + 15}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
