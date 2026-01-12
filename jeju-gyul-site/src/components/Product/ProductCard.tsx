import type { Product } from '../../types/product'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="product-card">
      {product.image && (
        <img src={product.image} alt={product.name} />
      )}
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  )
}
