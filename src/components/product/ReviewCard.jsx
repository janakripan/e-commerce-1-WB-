import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { MdVerified } from 'react-icons/md'
import { motion } from 'framer-motion'

function Stars({ rating, size = 16 }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        s <= Math.floor(rating)
          ? <AiFillStar key={s} style={{ fontSize: size }} className="text-[#FFC633]" />
          : <AiOutlineStar key={s} style={{ fontSize: size }} className="text-[#FFC633]" />
      ))}
    </div>
  )
}

export default function ReviewCard({ review, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="border border-[#e5e5e5] rounded-2xl p-6 relative"
    >
      {/* More options */}
      <button className="absolute top-5 right-5 text-black/30 hover:text-black text-xl leading-none">···</button>

      <Stars rating={review.rating} size={18} />

      <div className="flex items-center gap-1.5 mt-3 mb-3">
        <span className="font-bold text-black text-[15px]">{review.name}</span>
        {review.verified && <MdVerified className="text-[#01AB31]" size={17} />}
      </div>

      <p className="text-black/60 text-sm leading-relaxed">"{review.text}"</p>

      <p className="text-black/40 text-xs mt-4">Posted on {review.date}</p>
    </motion.div>
  )
}
