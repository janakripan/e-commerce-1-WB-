import { motion } from 'framer-motion'
import { getRelatedProducts } from '../../data/products'
import ProductCard from '../ProductCard'

export default function RelatedProducts({ productId }) {
  const related = getRelatedProducts(productId)

  return (
    <section className="mt-16 border-t border-[#e5e5e5] pt-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-[36px] lg:text-[48px] font-black tracking-tight text-black mb-10"
        style={{ fontFamily: "'Integral CF', Satoshi, sans-serif" }}
      >
        YOU MIGHT ALSO LIKE
      </motion.h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {related.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
