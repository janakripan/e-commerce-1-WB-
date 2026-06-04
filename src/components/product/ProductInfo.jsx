import { useState } from 'react'
import { motion } from 'framer-motion'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { colorMap } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => s <= Math.floor(rating)
        ? <AiFillStar key={s} className="text-[#FFC633] text-lg" />
        : <AiOutlineStar key={s} className="text-[#FFC633] text-lg" />
      )}
    </div>
  )
}

export default function ProductInfo({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()
  const { toggleItem, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize || product.sizes?.[0] || 'M',
      qty,
    })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Name */}
      <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="text-[32px] lg:text-[40px] font-black tracking-tight text-black leading-tight"
        style={{ fontFamily: "'Integral CF', Satoshi, sans-serif" }}>
        {product.name.toUpperCase()}
      </motion.h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <Stars rating={product.rating} />
        <span className="text-black/60 text-sm">{product.rating}/5</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-black">${product.price}</span>
        {product.originalPrice && <>
          <span className="text-black/30 text-2xl line-through">${product.originalPrice}</span>
          <span className="bg-[#FF3333]/10 text-[#FF3333] text-sm font-semibold px-3 py-1 rounded-full">-{product.discount}%</span>
        </>}
      </div>

      <p className="text-black/60 text-sm leading-relaxed border-b border-[#e5e5e5] pb-5">{product.description}</p>

      {/* Colors */}
      <div>
        <p className="text-black/60 text-sm mb-3">Select Colors</p>
        <div className="flex gap-3">
          {product.colors?.map(c => (
            <motion.button key={c} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedColor(c)}
              style={{ backgroundColor: colorMap[c] || '#000' }}
              className={`w-8 h-8 rounded-full transition-all ${selectedColor === c ? 'ring-2 ring-offset-2 ring-black' : ''}`}
              title={c}
            />
          ))}
        </div>
      </div>

      <div className="border-b border-[#e5e5e5]" />

      {/* Sizes */}
      <div>
        <p className="text-black/60 text-sm mb-3">Choose Size</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes?.map(s => (
            <motion.button key={s} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSize(s)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedSize === s ? 'bg-black text-white' : 'bg-[#F0F0F0] text-black/70 hover:bg-black/10'
              }`}>
              {s}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="border-b border-[#e5e5e5]" />

      {/* Qty + Add to cart */}
      <div className="flex gap-2 sm:gap-3 items-center w-full">
        <div className="flex items-center gap-3 sm:gap-4 bg-[#F0F0F0] rounded-full px-4 py-3 sm:px-5 shrink-0 select-none">
          <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-black/60 hover:text-black cursor-pointer"><FiMinus /></button>
          <span className="text-black font-medium w-5 text-center text-sm sm:text-base">{qty}</span>
          <button onClick={() => setQty(q => q + 1)} className="text-black/60 hover:text-black cursor-pointer"><FiPlus /></button>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleAddToCart}
          className="flex-1 bg-black text-white rounded-full py-3.5 font-medium flex items-center justify-center gap-2 hover:bg-black/85 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap cursor-pointer">
          <FiShoppingCart size={18} /> Add to Cart
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => toggleItem(product)}
          className="w-12 h-12 rounded-full border border-[#e5e5e5] flex items-center justify-center text-xl shrink-0 cursor-pointer">
          {wishlisted ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart className="text-black" />}
        </motion.button>
      </div>
    </div>
  )
}
