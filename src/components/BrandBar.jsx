export default function BrandBar() {
  const brands = [
    'VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein',
    'VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein',
    'VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein',
    'VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein',
  ]

  return (
    <div className="bg-black py-5 overflow-hidden">
      <div className="ticker-track">
        {brands.map((brand, i) => (
          <span
            key={i}
            className="mx-10 text-white text-xl font-bold tracking-wide whitespace-nowrap shrink-0 opacity-90 hover:opacity-100 cursor-default transition-opacity"
            style={{ fontFamily: brand === 'Calvin Klein' ? 'Satoshi, sans-serif' : 'Satoshi, sans-serif' }}
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  )
}
