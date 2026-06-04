import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const stored = JSON.parse(localStorage.getItem('shopco_cart') || '[]')

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key = `${action.item.id}-${action.item.color}-${action.item.size}`
      const exists = state.find(i => i.key === key)
      if (exists) {
        return state.map(i => i.key === key ? { ...i, qty: i.qty + action.item.qty } : i)
      }
      return [...state, { ...action.item, key }]
    }
    case 'REMOVE':
      return state.filter(i => i.key !== action.key)
    case 'UPDATE_QTY':
      return state.map(i => i.key === action.key ? { ...i, qty: Math.max(1, action.qty) } : i)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, stored)

  useEffect(() => {
    localStorage.setItem('shopco_cart', JSON.stringify(items))
  }, [items])

  const addItem = (item) => dispatch({ type: 'ADD', item })
  const removeItem = (key) => dispatch({ type: 'REMOVE', key })
  const updateQty = (key, qty) => dispatch({ type: 'UPDATE_QTY', key, qty })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const totalItems = items.reduce((s, i) => s + i.qty, 0)
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
