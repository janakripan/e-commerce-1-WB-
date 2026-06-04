import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiTag } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const DISCOUNT_PCT = 0.2
const DELIVERY = 15

export default function OrderSummary() {
  const { subtotal } = useCart()
  const { user } = useAuth()
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const navigate = useNavigate()

  const discount = promoApplied ? Math.round(subtotal * DISCOUNT_PCT) : 0
  const total = subtotal - discount + DELIVERY

  const applyPromo = () => {
    if (promo.trim()) setPromoApplied(true)
  }

  return (
    <div className="border border-[#e5e5e5] rounded-2xl p-6 lg:p-8 sticky top-24">
      <h2 className="text-xl font-bold text-black mb-6">Order Summary</h2>

      {/* Line items */}
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-black/60">Subtotal</span>
          <span className="font-semibold text-black">${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-black/60">Discount {promoApplied ? `(-${DISCOUNT_PCT * 100}%)` : ''}</span>
          <span className={`font-semibold ${discount > 0 ? 'text-red-500' : 'text-black/60'}`}>
            {discount > 0 ? `-$${discount}` : '-$0'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-black/60">Delivery Fee</span>
          <span className="font-semibold text-black">${subtotal > 0 ? DELIVERY : 0}</span>
        </div>
        <div className="border-t border-[#e5e5e5] pt-4 flex justify-between">
          <span className="font-semibold text-black">Total</span>
          <span className="text-xl font-bold text-black">${subtotal > 0 ? total : 0}</span>
        </div>
      </div>

      {/* Promo code */}
      <div className="mt-6 flex gap-3">
        <div className="flex-1 flex items-center gap-2 bg-[#F0F0F0] rounded-full px-4 py-3">
          <FiTag size={15} className="text-black/40 shrink-0" />
          <input
            value={promo}
            onChange={e => setPromo(e.target.value)}
            placeholder="Add promo code"
            className="bg-transparent outline-none text-sm text-black placeholder-black/40 w-full"
          />
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={applyPromo}
          className={`rounded-full px-5 py-3 text-sm font-medium transition-colors ${promoApplied ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-black/85'}`}>
          {promoApplied ? '✓ Applied' : 'Apply'}
        </motion.button>
      </div>

      {/* Checkout button */}
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        onClick={() => navigate(user ? '/checkout' : '/login?redirect=checkout')}
        className="w-full mt-5 bg-black text-white rounded-full py-4 font-medium flex items-center justify-center gap-2 hover:bg-black/85 transition-colors"
      >
        Go to Checkout <FiArrowRight size={18} />
      </motion.button>
    </div>
  )
}
