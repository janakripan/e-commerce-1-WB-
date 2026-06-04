import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillHeart, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FiShoppingBag, FiTrash2 } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => s <= Math.floor(rating)
        ? <AiFillStar key={s} className="text-[#FFC633] text-sm" />
        : <AiOutlineStar key={s} className="text-[#FFC633] text-sm" />
      )}
    </div>
  )
}

function WishlistCard({ product }) {
  const { removeItem } = useWishlist()
  const { addItem } = useCart()
  const navigate = useNavigate()

  const handleMoveToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, color: product.colors?.[0] || '', size: product.sizes?.[0] || 'M', qty: 1 })
    removeItem(product.id)
  }

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.35 }}
      className="group bg-white border border-[#e5e5e5] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative bg-[#F0EEED] aspect-square cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
        <motion.img src={product.image} alt={product.name} whileHover={{ scale: 1.06 }} transition={{ duration: 0.4 }}
          className="w-full h-full object-contain p-6" draggable={false} />
        <motion.button onClick={e => { e.stopPropagation(); removeItem(product.id) }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center">
          <AiFillHeart className="text-red-500 text-lg" />
        </motion.button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-black text-sm leading-tight mb-1 truncate">{product.name}</h3>
        <Stars rating={product.rating} />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-black">${product.price}</span>
            {product.originalPrice && <span className="text-black/30 text-sm line-through">${product.originalPrice}</span>}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleMoveToCart}
            className="flex-1 bg-black text-white rounded-full py-2.5 text-xs font-medium flex items-center justify-center gap-1.5">
            <FiShoppingBag size={13} /> Move to Cart
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => removeItem(product.id)}
            className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors">
            <FiTrash2 size={15} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function EmptyWishlist() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 gap-5">
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}
        className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
        <AiFillHeart className="text-red-300 text-5xl" />
      </motion.div>
      <h2 className="text-2xl font-bold text-black">Your wishlist is empty</h2>
      <p className="text-black/50 text-center max-w-xs">Save items you love and come back to them anytime.</p>
      <Link to="/shop">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="bg-black text-white rounded-full px-8 py-3.5 font-medium">
          Explore Products
        </motion.button>
      </Link>
    </motion.div>
  )
}

export default function Wishlist() {
  const { items } = useWishlist()

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-black/50 mb-6">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <span className="text-black font-medium">Wishlist</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-[36px] lg:text-[48px] font-black tracking-tight text-black"
          style={{ fontFamily: "'Integral CF', Satoshi, sans-serif" }}>
          MY WISHLIST
        </motion.h1>
        {items.length > 0 && (
          <span className="bg-black/5 text-black/60 text-sm font-medium px-4 py-2 rounded-full">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          <AnimatePresence>
            {items.map(product => <WishlistCard key={product.id} product={product} />)}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
