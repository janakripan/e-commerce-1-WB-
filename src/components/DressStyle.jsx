import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const styles = [
  { label: 'Casual', image: '/images/style_casual.png', span: 'col-span-1', height: 'h-[200px] lg:h-[260px]', path: '/shop/casual' },
  { label: 'Formal', image: '/images/style_formal.png', span: 'col-span-2', height: 'h-[200px] lg:h-[260px]', path: '/shop/formal' },
  { label: 'Party',  image: '/images/style_party.png',  span: 'col-span-2', height: 'h-[200px] lg:h-[260px]', path: '/shop/party'  },
  { label: 'Gym',   image: '/images/style_gym.png',    span: 'col-span-1', height: 'h-[200px] lg:h-[260px]', path: '/shop/gym'   },
]

export default function DressStyle() {
  const navigate = useNavigate()

  return (
    <section id="dress-style" className="py-16 lg:py-20 bg-[#F2F0F1]">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center text-[36px] lg:text-[48px] font-black tracking-tight text-black mb-8"
          style={{ fontFamily: "'Integral CF', 'Satoshi', sans-serif" }}>
          BROWSE BY DRESS STYLE
        </motion.h2>

        <div className="grid grid-cols-3 gap-4">
          {styles.map((style, i) => (
            <motion.div
              key={style.label}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(style.path)}
              className={`${style.span} ${style.height} rounded-2xl overflow-hidden relative cursor-pointer group`}
            >
              <img src={style.image} alt={`${style.label} style`}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute top-4 left-5">
                <h3 className="text-black font-black text-xl lg:text-2xl drop-shadow-sm" style={{ fontFamily: "'Satoshi', sans-serif" }}>
                  {style.label}
                </h3>
              </div>
              <motion.div
                className="absolute bottom-4 right-5 bg-white/90 rounded-full w-9 h-9 flex items-center justify-center text-black font-bold text-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                →
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
