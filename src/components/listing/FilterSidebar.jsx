import { motion, AnimatePresence } from 'framer-motion'
import { FiFilter, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { allCategories, allSizes, allStyles, filterColors, filterColorMap } from '../../data/products'

function Section({ title, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-[#e5e5e5] pb-5 mb-5">
      <button onClick={() => setOpen(o => !o)} className="flex items-center justify-between w-full mb-3">
        <span className="font-semibold text-black text-sm">{title}</span>
        {open ? <FiChevronUp size={16} className="text-black/50" /> : <FiChevronDown size={16} className="text-black/50" />}
      </button>
      <AnimatePresence initial={false}>
        {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">{children}</motion.div>}
      </AnimatePresence>
    </div>
  )
}

export default function FilterSidebar({ filters, onChange, onApply, onClose }) {
  const toggle = (key, val) => {
    const cur = filters[key] || []
    onChange({ ...filters, [key]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] })
  }

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-black text-base">Filters</h3>
        {onClose ? (
          <button onClick={onClose} className="p-1.5 hover:bg-[#F5F5F5] rounded-full transition-colors cursor-pointer" aria-label="Close filters">
            <FiX size={18} className="text-black" />
          </button>
        ) : (
          <FiFilter size={18} className="text-black/50" />
        )}
      </div>

      <Section title="Category">
        <div className="space-y-2.5">
          {allCategories.map(c => (
            <label key={c} className="flex items-center justify-between cursor-pointer group">
              <span className={`text-sm transition-colors ${filters.categories?.includes(c) ? 'text-black font-medium' : 'text-black/50 group-hover:text-black'}`}>{c}</span>
              <input type="checkbox" checked={filters.categories?.includes(c)} onChange={() => toggle('categories', c)} className="accent-black" />
            </label>
          ))}
        </div>
      </Section>

      <Section title="Price">
        <div className="px-1">
          <input type="range" min={0} max={500} value={filters.maxPrice || 500}
            onChange={e => onChange({ ...filters, maxPrice: +e.target.value })}
            className="w-full accent-black" />
          <div className="flex justify-between text-xs text-black/50 mt-1">
            <span>$0</span><span>${filters.maxPrice || 500}</span>
          </div>
        </div>
      </Section>

      <Section title="Colors">
        <div className="flex flex-wrap gap-3 pt-1">
          {filterColors.map(c => (
            <motion.button key={c} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
              onClick={() => toggle('colors', c)}
              style={{ backgroundColor: filterColorMap[c] }}
              className={`w-8 h-8 rounded-full border-2 transition-all ${filters.colors?.includes(c) ? 'border-black ring-2 ring-offset-1 ring-black' : 'border-transparent'}`}
              title={c}
            />
          ))}
        </div>
      </Section>

      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map(s => (
            <button key={s} onClick={() => toggle('sizes', s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                filters.sizes?.includes(s) ? 'bg-black text-white border-black' : 'border-[#e5e5e5] text-black/60 hover:border-black'
              }`}>{s}</button>
          ))}
        </div>
      </Section>

      <Section title="Dress Style">
        <div className="space-y-2.5">
          {allStyles.map(s => (
            <label key={s} className="flex items-center justify-between cursor-pointer group">
              <span className={`text-sm transition-colors ${filters.styles?.includes(s) ? 'text-black font-medium' : 'text-black/50 group-hover:text-black'}`}>{s}</span>
              <input type="checkbox" checked={filters.styles?.includes(s)} onChange={() => toggle('styles', s)} className="accent-black" />
            </label>
          ))}
        </div>
      </Section>

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={onApply}
        className="w-full bg-black text-white rounded-full py-3.5 text-sm font-medium mt-2">
        Apply Filter
      </motion.button>
    </div>
  )
}
