import Hero from '../components/Hero'
import BrandBar from '../components/BrandBar'
import NewArrivals from '../components/NewArrivals'
import TopSelling from '../components/TopSelling'
import DressStyle from '../components/DressStyle'
import Testimonials from '../components/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <BrandBar />
      <NewArrivals />
      <div className="section-divider" />
      <TopSelling />
      <DressStyle />
      <Testimonials />
    </>
  )
}
