import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

const newArrivals = [
  { id: 11, name: 'T-shirt with Tape Details', price: 120, rating: 4.5, image: '/images/p1.png', isNew: true },
  { id: 4,  name: 'Skinny Fit Jeans', price: 240, originalPrice: 260, discount: 20, rating: 3.5, image: '/images/p2.png' },
  { id: 5,  name: 'Checkered Shirt', price: 180, rating: 4.5, image: '/images/p3.png' },
  { id: 6,  name: 'Sleeve Striped T-shirt', price: 130, originalPrice: 160, discount: 30, rating: 4.5, image: '/images/p4.png' },
]

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
