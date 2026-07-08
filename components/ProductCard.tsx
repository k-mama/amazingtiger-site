import type { ShopProduct } from "@/lib/i18n/types";
import EditorialObject from "./EditorialObject";
import { dreamGlassTones } from "./DreamGlassIcon";

interface ProductCardProps {
  product: ShopProduct;
  addToCartLabel: string;
  viewDetailLabel: string;
  index?: number;
}

export default function ProductCard({ product, addToCartLabel, viewDetailLabel, index = 0 }: ProductCardProps) {
  const toneA = dreamGlassTones[index % dreamGlassTones.length];
  const toneB = dreamGlassTones[(index + 3) % dreamGlassTones.length];

  return (
    <article className="product-card">
      <div className="product-card__media">
        {product.badge && <span className="product-card__badge">{product.badge}</span>}
        <EditorialObject toneA={toneA} toneB={toneB} emblem={index % 2 === 0 ? "ring" : "line"} />
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
