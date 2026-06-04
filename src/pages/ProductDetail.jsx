import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getProductById } from '../data/products'
import ImageGallery from '../components/product/ImageGallery'
import ProductInfo from '../components/product/ProductInfo'
import ProductTabs from '../components/product/ProductTabs'
import RelatedProducts from '../components/product/RelatedProducts'

function Breadcrumb({ name }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-black/50 mb-8">
      <Link to="/" className="hover:text-black transition-colors">Home</Link>
      <span>/</span>
      <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
      <span>/</span>
      <span className="text-black font-medium truncate max-w-[160px]">{name}</span>
    </nav>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)

  if (!product) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Product not found</h1>
        <Link to="/shop" className="text-black underline">Browse all products</Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8">
      <Breadcrumb name={product.name} />

      {/* Main layout: images + info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-8 lg:gap-14"
      >
        <ImageGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </motion.div>

      {/* Tabs */}
      <ProductTabs product={product} />

      {/* Related */}
      <RelatedProducts productId={product.id} />
    </div>
  )
}
