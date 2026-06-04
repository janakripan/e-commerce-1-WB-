import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiLogOut, FiPackage, FiMapPin, FiCalendar } from 'react-icons/fi'

export default function Account() {
  const { user, logout, orders } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=account')
    }
  }, [user, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) return null

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-black/50 mb-6">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <span className="text-black font-medium">My Account</span>
      </nav>

      <div className="grid md:grid-cols-[280px_1fr] gap-8">
        {/* Profile Sidebar */}
        <div className="bg-white border border-[#e5e5e5] rounded-3xl p-6 self-start space-y-6 shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-black/40 mb-1">Signed In As</p>
            <h2 className="text-xl font-bold text-black truncate">{user.name}</h2>
          </div>

          <div className="space-y-3.5 text-sm pt-2 border-t border-[#f0f0f0]">
            <div>
              <p className="text-[11px] font-bold text-black/40 uppercase">Email Address</p>
              <p className="text-black truncate">{user.email}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-black/40 uppercase">Phone Number</p>
              <p className="text-black">{user.phone}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 rounded-xl py-3 text-sm font-medium hover:bg-red-50 transition-all cursor-pointer"
          >
            <FiLogOut size={16} /> Log Out
          </button>
        </div>

        {/* Orders list */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            ORDER HISTORY
          </h2>

          {orders.length === 0 ? (
            <div className="bg-[#fcfcfc] border border-dashed border-[#e5e5e5] rounded-3xl p-16 text-center text-black/45">
              <FiPackage size={44} className="mx-auto text-black/25 mb-4" />
              <p className="font-semibold mb-1">No orders found</p>
              <p className="text-sm text-black/40 mb-5">You haven't placed any orders yet.</p>
              <Link to="/shop" className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-medium hover:opacity-90 inline-block">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-[#e5e5e5] rounded-3xl overflow-hidden shadow-sm hover:shadow transition-shadow">
                  {/* Order header */}
                  <div className="bg-[#fbfbfb] px-6 py-4 border-b border-[#e5e5e5] flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-black/60">
                    <div className="flex gap-6 flex-wrap">
                      <div>
                        <span className="block text-black/40 uppercase text-[10px]">Order Placed</span>
                        <span className="flex items-center gap-1.5 text-black font-semibold mt-0.5"><FiCalendar /> {order.date}</span>
                      </div>
                      <div>
                        <span className="block text-black/40 uppercase text-[10px]">Total Value</span>
                        <span className="text-black font-semibold mt-0.5">${order.total}</span>
                      </div>
                      <div>
                        <span className="block text-black/40 uppercase text-[10px]">Order ID</span>
                        <span className="text-black font-semibold mt-0.5">#{order.id}</span>
                      </div>
                    </div>
                    <div>
                      <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{order.status}</span>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="p-6 divide-y divide-[#f0f0f0]">
                    {order.items.map((item) => (
                      <div key={item.key} className="py-4 first:pt-0 last:pb-0 flex gap-4 text-sm">
                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover border bg-[#F0EEED] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-black truncate">{item.name}</h4>
                          <p className="text-xs text-black/50 mt-1">
                            Size: <span className="font-medium text-black">{item.size}</span> | Color: <span className="font-medium text-black capitalize">{item.color}</span>
                          </p>
                          <p className="text-xs text-black/50 mt-0.5">Qty: <span className="font-medium text-black">{item.qty}</span></p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-black">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping footer */}
                  <div className="bg-[#fdfdfd] border-t border-[#f5f5f5] px-6 py-3.5 flex items-center gap-2 text-xs text-black/50">
                    <FiMapPin size={14} className="shrink-0" />
                    <span>Shipped to: {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zip}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
