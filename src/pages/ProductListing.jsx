import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSliders, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import ReactPaginate from 'react-paginate'
import { products } from '../data/products'
import FilterSidebar from '../components/listing/FilterSidebar'
import ProductCard from '../components/ProductCard'

const ReactPaginateComponent = ReactPaginate.default || ReactPaginate

const PER_PAGE = 9

const defaultFilters = { categories: [], maxPrice: 500, colors: [], sizes: [], styles: [] }

export default function ProductListing() {
  const { category } = useParams()
  
  let title = 'All Products'
  if (category === 'mens') title = "Men's Clothing"
  else if (category === 'womens') title = "Women's Clothing"
  else if (category) title = category.charAt(0).toUpperCase() + category.slice(1)

  const getInitialFilters = (cat) => {
    const isStyle = cat && cat !== 'mens' && cat !== 'womens'
    return {
      ...defaultFilters,
      styles: isStyle ? [cat.charAt(0).toUpperCase() + cat.slice(1)] : [],
    }
  }

  const [filters, setFilters] = useState(() => getInitialFilters(category))
  const [applied, setApplied] = useState(() => getInitialFilters(category))
  const [sort, setSort] = useState('popular')
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)

  // Sync category changes during render (official React hook pattern)
  const [prevCategory, setPrevCategory] = useState(category)
  if (category !== prevCategory) {
    setPrevCategory(category)
    const init = getInitialFilters(category)
    setFilters(init)
    setApplied(init)
    setPage(0)
    setLoading(true)
  }

  // Handle loading timer
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 450)
      return () => clearTimeout(timer)
    }
  }, [loading])

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      if (category === 'mens' && p.gender !== 'men' && p.gender !== 'unisex') return false
      if (category === 'womens' && p.gender !== 'women' && p.gender !== 'unisex') return false
      
      if (applied.categories.length && !applied.categories.includes(p.category)) return false
      if (p.price > applied.maxPrice) return false
      if (applied.sizes.length && !applied.sizes.some(s => p.sizes.includes(s))) return false
      if (applied.styles.length && !applied.styles.includes(p.style)) return false
      return true
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    else if (sort === 'newest') list = [...list].filter(p => p.isNew).concat(list.filter(p => !p.isNew))
    return list
  }, [applied, sort, category])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const visible = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  const applyFilters = () => {
    setLoading(true)
    setApplied(filters)
    setPage(0)
  }

  const handlePageClick = (data) => {
    setLoading(true)
    setPage(data.selected)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-black/50 mb-6">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
        {category && <><span>/</span><span className="text-black font-medium">{title}</span></>}
      </nav>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[260px] shrink-0">
          <FilterSidebar filters={filters} onChange={setFilters} onApply={applyFilters} />
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col min-h-[760px]">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-black">{title}</h1>
              <p className="text-black/50 text-sm mt-0.5">Showing {visible.length} of {filtered.length} Products</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="lg:hidden border border-[#e5e5e5] rounded-full px-4 py-2 flex items-center gap-2 text-sm">
                <FiSliders size={15} /> Filters
              </button>
              <select value={sort} onChange={e => { setLoading(true); setSort(e.target.value); setPage(0) }}
                className="border border-[#e5e5e5] rounded-full px-4 py-2.5 text-sm outline-none bg-white cursor-pointer">
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Flex-grow container for product area and pagination */}
          <div className="flex-grow flex flex-col justify-between">
            {/* Grid Area with stable min-height to prevent jumping */}
            <div className="flex-grow flex flex-col min-h-[480px]">
              {loading ? (
                <div className="flex-grow flex items-center justify-center py-20">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs font-medium text-black/40">Loading products...</span>
                  </motion.div>
                </div>
              ) : visible.length === 0 ? (
                <div className="flex-grow flex items-center justify-center py-20 text-center text-black/40 font-medium">
                  No products match your filters.
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 flex-grow"
                >
                  {visible.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Pagination at the bottom */}
            <div className="mt-8 pt-6 border-t border-[#e5e5e5]">
              <ReactPaginateComponent
                previousLabel={<span className="flex items-center gap-2"><FiArrowLeft size={16} /> Previous</span>}
                nextLabel={<span className="flex items-center gap-2">Next <FiArrowRight size={16} /></span>}
                breakLabel={'...'}
                pageCount={totalPages || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                forcePage={page}
                containerClassName={'flex items-center justify-between w-full'}
                pageClassName={'list-none'}
                pageLinkClassName={'w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium text-black/50 hover:text-black hover:bg-[#F5F5F5] transition-all cursor-pointer'}
                activeLinkClassName={'!bg-black !text-white !font-bold rounded-lg'}
                previousClassName={'list-none'}
                previousLinkClassName={'flex items-center justify-center border border-[#e5e5e5] rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-[#F5F5F5] transition-all cursor-pointer select-none'}
                nextClassName={'list-none'}
                nextLinkClassName={'flex items-center justify-center border border-[#e5e5e5] rounded-lg px-4 py-2 text-sm font-medium text-black hover:bg-[#F5F5F5] transition-all cursor-pointer select-none'}
                breakClassName={'list-none'}
                breakLinkClassName={'w-9 h-9 flex items-center justify-center text-sm text-black/35 font-medium cursor-default select-none'}
                disabledClassName={'opacity-40 pointer-events-none'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
