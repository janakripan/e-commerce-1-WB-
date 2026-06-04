import { motion } from 'framer-motion'
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'

export default function CartItemRow({ item }) {
  const { removeItem, updateQty } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, height: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4 py-5 border-b border-[#e5e5e5] last:border-0"
    >
      {/* Image */}
      <div className="w-24 h-24 bg-[#F0EEED] rounded-xl overflow-hidden shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" draggable={false} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-black text-[15px] leading-tight">{item.name}</h3>
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => removeItem(item.key)}
            className="text-red-400 hover:text-red-500 shrink-0 mt-0.5"
            aria-label="Remove item"
          >
            <FiTrash2 size={18} />
          </motion.button>
        </div>

        <p className="text-black/50 text-xs mt-1">Color: <span className="text-black/70">{item.color}</span></p>
        <p className="text-black/50 text-xs mt-0.5">Size: <span className="text-black/70">{item.size}</span></p>

        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-black text-lg">${item.price * item.qty}</span>

          <div className="flex items-center gap-3 bg-[#F0F0F0] rounded-full px-4 py-2">
            <button onClick={() => updateQty(item.key, item.qty - 1)} className="text-black/60 hover:text-black">
              <FiMinus size={14} />
            </button>
            <span className="text-black font-medium text-sm w-4 text-center">{item.qty}</span>
            <button onClick={() => updateQty(item.key, item.qty + 1)} className="text-black/60 hover:text-black">
              <FiPlus size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
