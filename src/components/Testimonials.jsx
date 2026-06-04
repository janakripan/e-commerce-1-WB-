import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiFillStar } from 'react-icons/ai'
import { MdVerified } from 'react-icons/md'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const reviews = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: 'Alex K.',
    rating: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes.",
  },
  {
    id: 3,
    name: 'James L.',
    rating: 5,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: 4,
    name: 'Moana K.',
    rating: 4,
    text: "I've been shopping at Shop.co for the past year and I can honestly say it's changed the way I approach fashion. The quality is consistently great and the customer service is top notch.",
  },
  {
    id: 5,
    name: 'David R.',
    rating: 5,
    text: "This is genuinely the best online clothing store I've ever used. The attention to detail in every garment is evident and the delivery was faster than expected. Highly recommend!",
  },
]

function ReviewCard({ review }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="bg-white border border-[#e5e5e5] rounded-2xl p-6 lg:p-8 flex-1 min-w-0"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <AiFillStar key={i} className={i < review.rating ? 'text-[#FFC633]' : 'text-gray-200'} size={18} />
        ))}
      </div>

      {/* Name */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-bold text-black text-base">{review.name}</span>
        <MdVerified className="text-[#01AB31]" size={18} />
      </div>

      {/* Text */}
      <p className="text-black/60 text-sm leading-relaxed line-clamp-4">
        "{review.text}"
      </p>
    </motion.div>
  )
}

export default function Testimonials() {
  const [page, setPage] = useState(0)
  const perPage = 3
  const totalPages = Math.ceil(reviews.length / perPage)

  const visible = reviews.slice(page * perPage, page * perPage + perPage)

  return (
    <section id="testimonials" className="py-16 lg:py-20 section-divider">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[32px] lg:text-[48px] font-black tracking-tight text-black"
            style={{ fontFamily: "'Integral CF', 'Satoshi', sans-serif" }}
          >
            OUR HAPPY CUSTOMERS
          </motion.h2>
          {/* Pagination arrows */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-black disabled:opacity-30 hover:bg-black hover:text-white transition-all"
              aria-label="Previous reviews"
            >
              <FiChevronLeft size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full border border-[#e5e5e5] flex items-center justify-center text-black disabled:opacity-30 hover:bg-black hover:text-white transition-all"
              aria-label="Next reviews"
            >
              <FiChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="wait">
            {visible.map((review) => (
              <ReviewCard key={`${page}-${review.id}`} review={review} />
            ))}
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`rounded-full transition-all duration-300 ${
                i === page ? 'w-6 h-2.5 bg-black' : 'w-2.5 h-2.5 bg-black/20'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
