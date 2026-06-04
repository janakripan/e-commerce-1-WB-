import { useState } from 'react'
import { motion } from 'framer-motion'
import ReviewCard from './ReviewCard'
import { getProductReviews } from '../../data/reviews'
import { FiEdit3 } from 'react-icons/fi'

const tabs = ['Product Details', 'Rating & Reviews', 'FAQs']

function ProductDetails({ product }) {
  return (
    <div className="py-8 text-black/60 text-sm leading-relaxed space-y-3">
      <p>{product.description}</p>
      <ul className="list-disc pl-5 space-y-2 mt-4">
        <li>100% premium cotton fabric</li>
        <li>Regular fit — true to size</li>
        <li>Machine washable at 30°C</li>
        <li>Available in multiple colors</li>
        <li>Ribbed crew neck and cuffs</li>
      </ul>
    </div>
  )
}

function FAQs() {
  const faqs = [
    { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. If you are not satisfied with your purchase, return it within 30 days for a full refund.' },
    { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available at checkout.' },
    { q: 'Do you offer international shipping?', a: 'Yes! We ship to over 50 countries worldwide. International shipping typically takes 7-14 business days.' },
  ]
  return (
    <div className="py-8 space-y-4">
      {faqs.map((f, i) => (
        <div key={i} className="border border-[#e5e5e5] rounded-xl p-5">
          <h4 className="font-semibold text-black mb-2">{f.q}</h4>
          <p className="text-black/60 text-sm leading-relaxed">{f.a}</p>
        </div>
      ))}
    </div>
  )
}

export default function ProductTabs({ product }) {
  const [active, setActive] = useState(1)
  const reviews = getProductReviews(product.id)

  return (
    <div className="mt-12">
      {/* Tab headers */}
      <div className="flex border-b border-[#e5e5e5] w-full">
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActive(i)}
            className={`relative flex-1 text-center py-4 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${active === i ? 'text-black font-semibold' : 'text-black/40 hover:text-black/70'}`}>
            {tab}
            {i === 1 && <span className="ml-1 text-[10px] sm:text-xs text-black/40">({reviews.length})</span>}
            {active === i && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {active === 0 && <ProductDetails product={product} />}
        {active === 1 && (
          <div className="py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h3 className="text-lg sm:text-xl font-bold">All Reviews <span className="text-black/40 font-normal text-sm sm:text-base">({reviews.length})</span></h3>
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                <select className="border border-[#e5e5e5] rounded-full px-3 py-2 text-xs sm:text-sm outline-none bg-white cursor-pointer flex-1 sm:flex-initial">
                  <option>Latest</option>
                  <option>Highest Rated</option>
                  <option>Lowest Rated</option>
                </select>
                <button className="bg-black text-white rounded-full px-4 py-2 text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer hover:bg-black/85 transition-colors flex-1 sm:flex-initial">
                  <FiEdit3 size={13} /> Write a Review
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {reviews.map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
            </div>
            <div className="flex justify-center mt-8">
              <button className="border border-[#e5e5e5] rounded-full px-10 py-3 text-sm font-medium hover:bg-black hover:text-white transition-all">
                Load More Reviews
              </button>
            </div>
          </div>
        )}
        {active === 2 && <FAQs />}
      </motion.div>
    </div>
  )
}
