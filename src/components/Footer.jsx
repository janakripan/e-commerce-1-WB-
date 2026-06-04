import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa'
import { SiVisa, SiMastercard, SiPaypal, SiApplepay, SiGooglepay } from 'react-icons/si'

const footerLinks = {
  Company: ['About', 'Features', 'Works', 'Career'],
  Help: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'],
  FAQ: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
  Resources: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'YouTube Playlist'],
}

const socials = [
  { Icon: FaFacebook, href: '#', label: 'Facebook' },
  { Icon: FaTwitter, href: '#', label: 'Twitter' },
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaGithub, href: '#', label: 'GitHub' },
  { Icon: FaYoutube, href: '#', label: 'YouTube' },
]

const paymentIcons = [
  { Icon: SiVisa, label: 'Visa' },
  { Icon: SiMastercard, label: 'Mastercard' },
  { Icon: SiPaypal, label: 'PayPal' },
  { Icon: SiApplepay, label: 'Apple Pay' },
  { Icon: SiGooglepay, label: 'Google Pay' },
]

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] pt-16 pb-6">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="text-2xl font-black text-black tracking-tight block mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              SHOP.CO
            </Link>
            <p className="text-black/50 text-sm leading-relaxed mb-5">We have clothes that suit your style and which you're proud to wear. From women to men.</p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-full border border-black/20 bg-white flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-black text-sm mb-5 tracking-widest uppercase">{category}</h4>
              <ul className="flex flex-col gap-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-black/50 text-sm hover:text-black transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-black/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-black/40 text-xs">Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex items-center gap-2">
            {paymentIcons.map(({ Icon, label }) => (
              <div key={label} className="bg-white rounded-md px-2.5 py-1.5 flex items-center justify-center border border-black/10" title={label}>
                <Icon size={26} className="text-black/70" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
