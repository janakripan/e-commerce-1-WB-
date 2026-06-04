import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext(null)

const stored = JSON.parse(localStorage.getItem('shopco_wishlist') || '[]')

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(stored)

  useEffect(() => {
    localStorage.setItem('shopco_wishlist', JSON.stringify(items))
  }, [items])

  const addItem = (product) => {
    setItems(prev => prev.find(i => i.id === product.id) ? prev : [...prev, product])
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const toggleItem = (product) => {
    setItems(prev =>
      prev.find(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product]
    )
  }

  const isWishlisted = (id) => items.some(i => i.id === id)

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, toggleItem, isWishlisted, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
