import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AiFillStar, AiOutlineStar, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FiShoppingBag } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => s <= Math.floor(rating)
        ? <AiFillStar key={s} className="text-[#FFC633] text-sm" />
        : <AiOutlineStar key={s} className="text-[#FFC633] text-sm" />
      )}
    </div>
  )
}

export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate()
  const { toggleItem, isWishlisted } = useWishlist()
  const { addItem } = useCart()
  const wishlisted = isWishlisted(product.id)

  const handleQuickAdd = (e) => {
    e.stopPropagation()
    addItem({
      id: product.id, name: product.name, price: product.price,
      image: product.image, color: product.colors?.[0] || '',
      size: product.sizes?.[0] || 'M', qty: 1,
    })
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    toggleItem(product)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image */}
      <div className="bg-[#F0EEED] rounded-2xl overflow-hidden mb-3 relative aspect-square">
        <motion.img
          src={product.image} alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />

        {/* Badges */}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#01AB31] text-white text-xs font-semibold px-2.5 py-1 rounded-full">New</span>
        )}
        {product.discount && (
          <span className="absolute top-3 left-3 bg-[#F33A6A] text-white text-xs font-semibold px-2.5 py-1 rounded-full">-{product.discount}%</span>
        )}
        {product.isNew && product.discount && (
          <span className="absolute top-10 left-3 bg-[#F33A6A] text-white text-xs font-semibold px-2.5 py-1 rounded-full">-{product.discount}%</span>
        )}

        {/* Wishlist heart */}
        <motion.button
          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {wishlisted ? <AiFillHeart className="text-red-500 text-base" /> : <AiOutlineHeart className="text-black text-base" />}
        </motion.button>

        {/* Quick add */}
        <motion.button
          onClick={handleQuickAdd}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-semibold rounded-full px-4 py-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
        >
          <FiShoppingBag size={13} /> Quick Add
        </motion.button>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-semibold text-black text-[15px] leading-tight mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-1.5 mb-1.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-black/60">{product.rating}/5</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-black text-base">${product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-black/40 text-sm line-through">${product.originalPrice}</span>
              <span className="text-[#F33A6A] text-xs font-medium bg-[#F33A6A]/10 px-1.5 py-0.5 rounded-full">-{product.discount}%</span>
            </>
          )}
        </div>
      </div>
    </motion.article>
  )
}
