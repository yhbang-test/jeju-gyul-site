import type { Product } from '../../types/product'
import ProductCard from './ProductCard'
import mainHalla from '../../assets/AIHalla.jpg'
import mainRedHalla from '../../assets/redhalla.jpg'
import mainChanHalla from '../../assets/chanhalla.jpg'
const products: Product[] = [
  {
    id: 1,
    name: '한라봉',
    description: '달콤하고 향이 진한 제주 대표 감귤 \n12월 부터 4월 까지 초기엔 상큼한 맛을 후기엔 달달해진 맛을 느낄 수 있습니다.',
    image:mainHalla
  },
  {
    id: 2,
    name: '레드향',
    description: '붉은 빛과 깊은 향을 가진 프리미엄 귤\n새해의 시작을 달콤하게',
    image: mainRedHalla
  },
  {
    id: 3,
    name: '천혜향',
    description: '부드럽고 고급스러운 향의 감귤\n설에 먹기에 가장 좋은 귤',
    image: mainChanHalla
  },
]

export default function ProductSection() {
  return (
    <section id="products" className="product-section">
      {/*제목 멘트 부분 */}
      <div className="section-header">
        <span className="section-badge">Premium Jeju</span>
        <h2 className="section-title">자연이 빚은 제주의 맛</h2>
        <p className="section-subtitle">365일 제주의 햇살과 바람을 머금고 자란...</p>
      </div>

      {/* 카드들을 정렬하기 위해 컨테이너로 한 번 감싸줍니다 */}
      <div className="product-list-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}