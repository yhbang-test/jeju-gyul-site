import type { Product } from '../../types/product'
import ProductCard from './ProductCard'
import mainHalla from '../../assets/AIHalla.jpg'
import mainRedHalla from '../../assets/redhalla.jpg'
import mainChanHalla from '../../assets/chanhalla.jpg'
const products: Product[] = [
  {
    id: 1,
    name: '한라봉',
    description: '달콤하고 향이 진한 제주 대표 감귤',
    image:mainHalla
  },
  {
    id: 2,
    name: '레드향',
    description: '붉은 빛과 깊은 향을 가진 프리미엄 귤',
    image: mainRedHalla
  },
  {
    id: 3,
    name: '천혜향',
    description: '부드럽고 고급스러운 향의 감귤',
    image: mainChanHalla
  },
]

export default function ProductSection() {
  return (
    <section>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}