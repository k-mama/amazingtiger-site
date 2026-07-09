"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import type { Product, ProductCategory } from "@/lib/shop/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

interface ShopCatalogueProps {
  products: Product[];
  locale: Locale;
  navBase: string;
  dict: Dictionary["shopPage"];
}

type CategoryFilter = "all" | ProductCategory;

export default function ShopCatalogue({ products, locale, navBase, dict }: ShopCatalogueProps) {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const filtered = filter === "all" ? products : products.filter((product) => product.category === filter);

  return (
    <>
      <nav className="category-filter" aria-label="Shop categories">
        {dict.categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`category-filter__link${filter === cat.id ? " is-active" : ""}`}
            aria-pressed={filter === cat.id}
            onClick={() => setFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <div className="product-grid">
        {filtered.map((product, i) => (
          <Reveal key={product.id} delay={i * 70}>
            <ProductCard product={product} locale={locale} navBase={navBase} dict={dict} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
