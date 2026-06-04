import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Newsletter from './components/Newsletter'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import ProductListing from './pages/ProductListing'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Checkout from './pages/Checkout'
import Account from './pages/Account'

export default function App() {
  return (
    <div style={{ fontFamily: 'Satoshi, sans-serif' }}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/shop" element={<ProductListing />} />
          <Route path="/shop/:category" element={<ProductListing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
      <Newsletter />
      <Footer />
    </div>
  )
}
