import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, findUserByPhone } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectParam = searchParams.get('redirect') || '/'
  const redirect = redirectParam.startsWith('/') ? redirectParam : `/${redirectParam}`

  const [step, setStep] = useState(1) // 1: Phone, 2: OTP
  const [phoneVal, setPhoneVal] = useState('')
  const [timer, setTimer] = useState(30)
  const [errorMsg, setErrorMsg] = useState('')

  // Formik for phone screen
  const phoneForm = useFormik({
    initialValues: { phone: '' },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required')
    }),
    onSubmit: (values) => {
      const exists = findUserByPhone(values.phone)
      if (exists) {
        setPhoneVal(values.phone)
        setErrorMsg('')
        setStep(2)
        setTimer(30)
      } else {
        setErrorMsg('Phone number not registered. Please sign up first.')
      }
    }
  })

  // Timer for resend button
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [step, timer])

  const handleOtpSubmit = (e) => {
    e.preventDefault()
    const success = login(phoneVal)
    if (success) {
      navigate(redirect)
    } else {
      setErrorMsg('Verification failed. Try again.')
    }
  }

  return (
    <div className="max-w-[450px] mx-auto my-16 px-4">
      <div className="bg-white border border-[#e5e5e5] rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl font-black tracking-tight text-black text-center mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          SHOP.CO
        </h2>
        <p className="text-sm text-black/50 text-center mb-8">
          {step === 1 ? 'Enter your mobile number to sign in' : 'Verify with pre-filled OTP code'}
        </p>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="phone-step"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={phoneForm.handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Mobile Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="e.g. 9876543210"
                  value={phoneForm.values.phone}
                  onChange={phoneForm.handleChange}
                  onBlur={phoneForm.handleBlur}
                  className="w-full border border-[#e5e5e5] rounded-xl px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                />
                {phoneForm.touched.phone && phoneForm.errors.phone && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{phoneForm.errors.phone}</p>
                )}
                {errorMsg && <p className="text-xs text-red-500 mt-1.5 font-medium">{errorMsg}</p>}
              </div>

              <button type="submit" className="w-full bg-black text-white py-3.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">
                Send OTP
              </button>

              <p className="text-center text-xs text-black/50 pt-2">
                New to SHOP.CO?{' '}
                <Link to={`/signup?redirect=${encodeURIComponent(redirect)}`} className="text-black font-semibold hover:underline">
                  Create an account
                </Link>
              </p>
            </motion.form>
          ) : (
            <motion.form
              key="otp-step"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onSubmit={handleOtpSubmit}
              className="space-y-6"
            >
              <div className="text-center">
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-3">Verification Code</label>
                <div className="flex justify-center gap-2">
                  <input
                    type="text"
                    disabled
                    value="1234"
                    className="w-24 text-center tracking-widest text-lg font-bold border border-[#e5e5e5] bg-[#F7F7F7] rounded-xl py-3 text-black/40"
                  />
                </div>
                <p className="text-xs text-black/40 mt-3">OTP is auto-filled for testing convenience.</p>
              </div>

              <button type="submit" className="w-full bg-black text-white py-3.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">
                Verify & Login
              </button>

              <div className="flex justify-between items-center text-xs pt-2">
                <button type="button" onClick={() => setStep(1)} className="text-black/60 hover:text-black font-medium">
                  ← Back to phone
                </button>
                {timer > 0 ? (
                  <span className="text-black/40 font-medium">Resend code in {timer}s</span>
                ) : (
                  <button type="button" onClick={() => setTimer(30)} className="text-black font-semibold hover:underline">
                    Resend Code
                  </button>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
