import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

import { products } from '../data/products'

const newArrivals = products.filter(p => [11, 4, 5, 6].includes(p.id))

export default function NewArrivals() {
  return (
    <section id="new-arrivals" className="py-16 lg:py-20">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center text-[36px] lg:text-[48px] font-black tracking-tight text-black mb-10"
          style={{ fontFamily: "'Integral CF', 'Satoshi', sans-serif" }}>
          NEW ARRIVALS
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {newArrivals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/shop">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="border border-black/25 rounded-full px-12 py-3.5 text-sm font-medium text-black hover:bg-black hover:text-white transition-all duration-300">
              View All
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}
