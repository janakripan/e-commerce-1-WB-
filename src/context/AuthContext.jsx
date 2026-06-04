import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('shopco_user') || 'null')
  })
  
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem('shopco_orders') || '[]')
  })

  // Keep localStorage in sync with user state
  useEffect(() => {
    if (user) {
      localStorage.setItem('shopco_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('shopco_user')
    }
  }, [user])

  // Keep localStorage in sync with orders state
  useEffect(() => {
    localStorage.setItem('shopco_orders', JSON.stringify(orders))
  }, [orders])

  const findUserByPhone = (phone) => {
    const users = JSON.parse(localStorage.getItem('shopco_users') || '[]')
    return users.find(u => u.phone === phone) || null
  }

  const login = (phone) => {
    const existing = findUserByPhone(phone)
    if (existing) {
      setUser(existing)
      return true
    }
    return false
  }

  const signup = (name, email, phone) => {
    const users = JSON.parse(localStorage.getItem('shopco_users') || '[]')
    if (users.some(u => u.phone === phone)) {
      return { success: false, message: 'Phone number already registered' }
    }
    const newUser = { name, email, phone }
    users.push(newUser)
    localStorage.setItem('shopco_users', JSON.stringify(users))
    setUser(newUser)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
  }

  const placeOrder = (items, total, shippingInfo) => {
    if (!user) return null
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000)
    const newOrder = {
      id: orderId,
      userPhone: user.phone,
      items,
      total,
      shippingInfo,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: 'Processing'
    }
    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }

  const userOrders = orders.filter(o => user && o.userPhone === user.phone)

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, placeOrder, orders: userOrders, findUserByPhone }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
