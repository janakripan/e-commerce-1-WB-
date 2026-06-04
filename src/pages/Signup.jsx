import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectParam = searchParams.get('redirect') || '/'
  const redirect = redirectParam.startsWith('/') ? redirectParam : `/${redirectParam}`
  const [errorMsg, setErrorMsg] = useState('')

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Full Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required')
    }),
    onSubmit: (values) => {
      const res = signup(values.name, values.email, values.phone)
      if (res.success) {
        navigate(redirect)
      } else {
        setErrorMsg(res.message)
      }
    }
  })

  return (
    <div className="max-w-[450px] mx-auto my-16 px-4">
      <div className="bg-white border border-[#e5e5e5] rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl font-black tracking-tight text-black text-center mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Create Account
        </h2>
        <p className="text-sm text-black/50 text-center mb-8">
          Sign up to track orders and complete checkout
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-[#e5e5e5] rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none transition-colors"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500 mt-1 font-medium">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. john@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-[#e5e5e5] rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none transition-colors"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 mt-1 font-medium">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="10-digit mobile number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-[#e5e5e5] rounded-xl px-4 py-2.5 text-sm focus:border-black outline-none transition-colors"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-xs text-red-500 mt-1 font-medium">{formik.errors.phone}</p>
            )}
            {errorMsg && <p className="text-xs text-red-500 mt-1.5 font-medium">{errorMsg}</p>}
          </div>

          <button type="submit" className="w-full bg-black text-white py-3.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity mt-2">
            Register
          </button>

          <p className="text-center text-xs text-black/50 pt-2">
            Already have an account?{' '}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-black font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
