import type { ShopProduct } from "@/lib/i18n/types";

interface ProductCardProps {
  product: ShopProduct;
  addToCartLabel: string;
  viewDetailLabel: string;
}

export default function ProductCard({ product, addToCartLabel, viewDetailLabel }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        {product.badge && <span className="product-card__badge">{product.badge}</span>}
        <img
          src={`https://placehold.co/480x600/ece5d8/1a1712?text=${encodeURIComponent(product.title)}`}
          alt={product.title}
        />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__subtitle">{product.subtitle}</p>
        <p className="product-card__price">{product.price}</p>
        <div className="product-card__actions">
          <button type="button" className="btn btn-secondary btn-block">
            {addToCartLabel}
          </button>
          <button type="button" className="btn-link">
            {viewDetailLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
