import type { Product } from '../../types/product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="product-card">
      <div className="product-image-side">
        {product.image && (
          <img src={product.image} alt={product.name} />
        )}
      </div>

      <div className="product-text-side">
        <div className="text-header">
          <span className="product-category">Jeju Special</span>
          <h3>{product.name}</h3>
        </div>
        <p className="product-description">{product.description}</p>
      </div>
    </div>
  );
}