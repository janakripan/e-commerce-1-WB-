import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const stats = [
  { value: '200+', label: 'International Brands' },
  { value: '2,000+', label: 'High-Quality Products' },
  { value: '30,000+', label: 'Happy Customers' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="bg-[#F2F0F1] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8 grid lg:grid-cols-2 items-center min-h-[600px] lg:min-h-[663px] relative">
        {/* Left content */}
        <div className="pt-12 pb-8 lg:py-16 z-10">
          {/* Heading */}
          <motion.h1
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-[40px] sm:text-[52px] lg:text-[64px] font-black leading-[1.05] tracking-tight text-black mb-6"
            style={{ fontFamily: "'Integral CF', 'Satoshi', sans-serif" }}
          >
            FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE
          </motion.h1>

          {/* Sub text */}
          <motion.p
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-black/60 text-base leading-relaxed mb-8 max-w-[400px]"
          >
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </motion.p>

          {/* CTA Button */}
          <motion.div custom={2} initial="hidden" animate="show" variants={fadeUp}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-black text-white rounded-full px-10 py-4 text-base font-medium flex items-center gap-2 hover:bg-black/85 transition-colors"
            >
              Shop Now
              <FiArrowRight size={18} />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-12 flex flex-wrap gap-6 items-center"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6">
                {i > 0 && <div className="w-px h-10 bg-black/15 hidden sm:block" />}
                <div>
                  <p className="text-3xl font-black text-black tracking-tight">{stat.value}</p>
                  <p className="text-black/60 text-sm mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right - Model Image */}
        <div className="relative flex items-end justify-center lg:justify-end h-full pt-8 lg:pt-0">
          {/* Decorative star top-left */}
          <motion.div
            initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: 'backOut' }}
            className="absolute top-8 left-0 lg:-left-8 text-black"
            aria-hidden
          >
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 0L30.9 25.1L56 28L30.9 30.9L28 56L25.1 30.9L0 28L25.1 25.1L28 0Z" fill="black"/>
            </svg>
          </motion.div>

          {/* Decorative star bottom-right */}
          <motion.div
            initial={{ opacity: 0, rotate: 20, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.7, ease: 'backOut' }}
            className="absolute top-16 right-4 lg:right-0 text-black"
            aria-hidden
          >
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 0L18.76 15.24L34 17L18.76 18.76L17 34L15.24 18.76L0 17L15.24 15.24L17 0Z" fill="black"/>
            </svg>
          </motion.div>

          {/* Model image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[520px] lg:max-w-none lg:w-[560px]"
          >
            <img
              src="/images/hero_model.png"
              alt="Fashion models wearing stylish outfits"
              className="w-full object-contain object-bottom max-h-[580px]"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
