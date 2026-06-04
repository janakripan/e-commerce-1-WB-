import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import CartItemRow from '../components/cart/CartItemRow'
import OrderSummary from '../components/cart/OrderSummary'

function EmptyCart() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 gap-5">
      <div className="w-24 h-24 bg-[#F0EEED] rounded-full flex items-center justify-center">
        <FiShoppingBag size={40} className="text-black/30" />
      </div>
      <h2 className="text-2xl font-bold text-black">Your cart is empty</h2>
      <p className="text-black/50 text-center max-w-xs">Looks like you haven't added any items yet. Start exploring our collection!</p>
      <Link to="/shop">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="bg-black text-white rounded-full px-8 py-3.5 font-medium">
          Browse Products
        </motion.button>
      </Link>
    </motion.div>
  )
}

export default function Cart() {
  const { items } = useCart()

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-black/50 mb-6">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <span className="text-black font-medium">Cart</span>
      </nav>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-[36px] lg:text-[48px] font-black tracking-tight text-black mb-8"
        style={{ fontFamily: "'Integral CF', Satoshi, sans-serif" }}>
        YOUR CART
      </motion.h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-8">
          {/* Items */}
          <div className="border border-[#e5e5e5] rounded-2xl px-4 lg:px-8 py-2">
            <AnimatePresence>
              {items.map(item => <CartItemRow key={item.key} item={item} />)}
            </AnimatePresence>
          </div>
          {/* Summary */}
          <OrderSummary />
        </div>
      )}
    </div>
  )
}
