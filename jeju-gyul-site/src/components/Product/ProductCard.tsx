import type { Product } from '../../types/product'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  )
}