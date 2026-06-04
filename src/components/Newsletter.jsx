import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend } from 'react-icons/fi'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
      setEmail('')
    }
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-black rounded-2xl lg:rounded-[30px] px-8 lg:px-16 py-12 lg:py-14 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Text */}
          <h2
            className="text-white text-[28px] lg:text-[40px] font-black leading-tight tracking-tight max-w-[420px] text-center lg:text-left"
            style={{ fontFamily: "'Integral CF', 'Satoshi', sans-serif" }}
          >
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-[380px]">
            <div className="bg-white rounded-full flex items-center px-5 py-3 gap-3">
              <FiSend size={16} className="text-black/40 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-transparent outline-none text-sm text-black placeholder-black/40 flex-1 font-satoshi"
                required
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-black font-semibold rounded-full py-3.5 text-sm hover:bg-white/90 transition-colors"
            >
              {submitted ? '✓ Subscribed!' : 'Subscribe to Newsletter'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
