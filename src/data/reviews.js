export const reviews = [
  { id: 1, productId: 11, name: 'Samantha D.', rating: 5, date: 'August 14, 2023', text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow shopaholic, I can appreciate the attention to detail. It has become my favorite go-to shirt!", verified: true },
  { id: 2, productId: 11, name: 'Alex M.', rating: 4, date: 'August 15, 2023', text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is amazing. Being a fashion enthusiast, I'm always on the lookout for quality apparel, and this shirt definitely delivers.", verified: true },
  { id: 3, productId: 11, name: 'Ethan R.', rating: 4, date: 'August 16, 2023', text: "This t-shirt is a must-have for anyone who appreciates good design. The fabric is soft and the colors are vivid. The quality surpasses many brands I've tried, making this my go-to choice.", verified: true },
  { id: 4, productId: 11, name: 'Olivia P.', rating: 5, date: 'August 17, 2023', text: "As a UI/UX enthusiast, I love smart everyday functionality mixed with creativity. The fabric feels premium and the design is spot on. Made me realize most tee shirts aren't worth buying and this is just incredible.", verified: true },
  { id: 5, productId: 11, name: 'Liam K.', rating: 4, date: 'August 18, 2023', text: "I'm a big fan of bold and creative designs, and this t-shirt certainly delivers on that front. The artwork is stunning and the fabric is comfortable for all-day wear without any discomfort.", verified: false },
  { id: 6, productId: 11, name: 'Ava H.', rating: 5, date: 'August 19, 2023', text: "I absolutely love wearing a piece of design philosophy. The relaxed aesthetic and thoughtful layout of the design made this shirt a conversation starter everywhere I go.", verified: true },
  { id: 7, productId: 1, name: 'Michael T.', rating: 4, date: 'July 10, 2023', text: "Great quality t-shirt! The gradient design is subtle but eye-catching. Fits true to size and the fabric is very comfortable for everyday wear.", verified: true },
  { id: 8, productId: 1, name: 'Emma S.', rating: 3, date: 'July 15, 2023', text: "The t-shirt is decent quality but the gradient didn't look exactly like the photos. Still a good buy for the price, and the fabric is comfortable.", verified: true },
]

export function getProductReviews(productId, limit) {
  const filtered = reviews.filter(r => r.productId === parseInt(productId))
  const all = filtered.length > 0 ? filtered : reviews.slice(0, 6)
  return limit ? all.slice(0, limit) : all
}
