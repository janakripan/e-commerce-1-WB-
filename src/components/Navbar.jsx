import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'

function ShopDropdown({ onClose }) {
  const links = [
    { label: 'Shop for Men', to: '/shop/mens' },
    { label: 'Shop for Women', to: '/shop/womens' },
    { label: 'All Products', to: '/shop' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-[#e5e5e5] py-1.5 z-50 overflow-hidden"
    >
      <div className="flex flex-col">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={onClose}
            className="px-4 py-2.5 text-sm text-black/70 hover:text-black hover:bg-[#F5F5F5] transition-all font-medium"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

const otherLinks = [
  { label: 'On Sale', href: '/shop' },
  { label: 'New Arrivals', href: '/shop' },
  { label: 'Brands', href: '#brands' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [query, setQuery] = useState('')
  const closeTimer = useRef(null)
  const navigate = useNavigate()
  const { totalItems } = useCart()
  const { count: wishCount } = useWishlist()
  const { user, logout } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) { navigate('/shop'); setSearchOpen(false); setQuery('') }
  }

  const openShop = () => {
    clearTimeout(closeTimer.current)
    setShopOpen(true)
  }
  const closeShop = () => {
    closeTimer.current = setTimeout(() => setShopOpen(false), 120)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e5e5e5]">
      {/* Announcement bar */}
      <div className="relative bg-black text-white text-center text-xs py-2 px-4">
        Sign up and get 20% off to your first order.{' '}
        <a href="#" className="underline font-semibold hover:opacity-80 transition-opacity">Sign Up Now</a>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"><FiX size={14} /></button>
      </div>

      {/* Main nav */}
      <nav className="max-w-[1240px] mx-auto px-4 lg:px-8 flex items-center gap-4 h-16">
        <button className="lg:hidden text-black p-1" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        <Link to="/" className="text-2xl font-black tracking-tight text-black mr-4 shrink-0"
          style={{ fontFamily: 'Satoshi, sans-serif' }}>
          SHOP.CO
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6 flex-1">
          {/* Shop with dropdown */}
          <li className="relative" onMouseEnter={openShop} onMouseLeave={closeShop}>
            <Link to="/shop"
              className="flex items-center gap-1 text-[15px] font-medium text-black/80 hover:text-black transition-colors py-6">
              Shop
              <motion.span animate={{ rotate: shopOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <FiChevronDown size={14} />
              </motion.span>
            </Link>
            <AnimatePresence>
              {shopOpen && <ShopDropdown onClose={() => setShopOpen(false)} />}
            </AnimatePresence>
          </li>

          {otherLinks.map(link => (
            <li key={link.label}>
              <Link to={link.href}
                className="text-[15px] font-medium text-black/80 hover:text-black transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-[400px] items-center bg-[#F0F0F0] rounded-full px-4 py-2 gap-2">
          <FiSearch size={16} className="text-black/40 shrink-0" />
          <input value={query} onChange={e => setQuery(e.target.value)} type="text"
            placeholder="Search for products..."
            className="bg-transparent outline-none text-sm text-black/70 placeholder-black/40 w-full" />
        </form>

        {/* Icons */}
        <div className="flex items-center gap-3 ml-auto lg:ml-0">
          <button className="lg:hidden text-black" onClick={() => setSearchOpen(!searchOpen)}><FiSearch size={20} /></button>

          <Link to="/wishlist" className="relative text-black hover:opacity-70 transition-opacity" aria-label="Wishlist">
            <AiOutlineHeart size={24} />
            {wishCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{wishCount}</span>
            )}
          </Link>

          <Link to="/cart" className="relative text-black hover:opacity-70 transition-opacity" aria-label="Cart">
            <FiShoppingCart size={22} />
            {totalItems > 0 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </motion.span>
            )}
          </Link>

          <div className="relative" onMouseLeave={() => setUserMenuOpen(false)}>
            {user ? (
              <>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  onMouseEnter={() => setUserMenuOpen(true)}
                  className="text-black hover:opacity-70 transition-opacity flex items-center gap-1.5 focus:outline-none cursor-pointer"
                  aria-label="Account Menu"
                >
                  <FiUser size={22} />
                  <span className="hidden sm:inline text-xs font-semibold text-black/70">Hi, {user.name.split(' ')[0]}</span>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 top-full pt-1.5 w-48 z-50"
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-[#e5e5e5] py-2 overflow-hidden">
                        <div className="px-4 py-2 border-b border-[#f0f0f0]">
                          <p className="text-[10px] text-black/40 font-bold uppercase tracking-wider">Signed in as</p>
                          <p className="text-sm font-bold text-black truncate">{user.name}</p>
                        </div>
                        <Link
                          to="/account"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-black/70 hover:text-black hover:bg-[#F5F5F5] transition-all font-medium"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/account"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-black/70 hover:text-black hover:bg-[#F5F5F5] transition-all font-medium border-b border-[#f0f0f0]"
                        >
                          Order History
                        </Link>
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                            navigate('/');
                          }}
                          className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all font-medium cursor-pointer"
                        >
                          Log Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link to="/login" className="text-black hover:opacity-70 transition-opacity" aria-label="Account">
                <FiUser size={22} />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden px-4 pb-3 lg:hidden">
            <form onSubmit={handleSearch} className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-2.5 gap-2">
              <FiSearch size={16} className="text-black/40" />
              <input value={query} onChange={e => setQuery(e.target.value)} type="text"
                placeholder="Search for products..."
                className="bg-transparent outline-none text-sm text-black/70 placeholder-black/40 w-full" autoFocus />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[#e5e5e5] lg:hidden">
            <ul className="px-4 py-4 flex flex-col gap-1">
              <li className="font-semibold text-sm text-black/40 uppercase tracking-widest px-2 pt-1 pb-2">Shop</li>
              <li>
                <Link to="/shop/mens" onClick={() => setMenuOpen(false)}
                  className="block px-2 py-2 text-base font-medium text-black/85 rounded-xl hover:bg-[#F0F0F0] transition-colors">
                  Shop for Men
                </Link>
              </li>
              <li>
                <Link to="/shop/womens" onClick={() => setMenuOpen(false)}
                  className="block px-2 py-2 text-base font-medium text-black/85 rounded-xl hover:bg-[#F0F0F0] transition-colors">
                  Shop for Women
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => setMenuOpen(false)}
                  className="block px-2 py-2 text-base font-medium text-black/85 rounded-xl hover:bg-[#F0F0F0] transition-colors">
                  All Products
                </Link>
              </li>
              <div className="my-2 border-t border-[#e5e5e5]" />
              {otherLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.href} onClick={() => setMenuOpen(false)}
                    className="block px-2 py-2.5 text-base font-medium text-black rounded-xl hover:bg-[#F0F0F0] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
