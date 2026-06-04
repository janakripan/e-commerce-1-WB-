import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImageGallery({ images = [], name = '' }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3 w-[100px] shrink-0">
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-xl overflow-hidden aspect-square border-2 transition-colors ${
              active === i ? 'border-black' : 'border-transparent'
            }`}
          >
            <img src={img} alt={`${name} view ${i + 1}`} className="w-full h-full object-cover" draggable={false} />
          </motion.button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 bg-[#F0EEED] rounded-2xl overflow-hidden aspect-square">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={name}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full h-full object-contain p-6"
            draggable={false}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}
