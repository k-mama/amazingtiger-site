import type { Locale } from "@/lib/i18n/config";

// Local, static catalogue for Shop V1. Field shape deliberately mirrors the
// products / product_translations split in supabase/schema.sql (stable
// business data vs. per-locale copy) so this module can be swapped for a
// Supabase read later without reshaping the rest of the shop UI.

export type ProductCategory = "books" | "limited" | "objects" | "gifts";

export type ProductAvailability = "available" | "limited" | "coming_soon" | "inquiry_only";

export interface ProductCopy {
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  details: string[];
}

export interface Product {
  id: string;
  slug: string;
  category: ProductCategory;
  priceLabel: string;
  availability: ProductAvailability;
  relatedProductIds: string[];
  visualToneA: string;
  visualToneB: string;
  emblem: "ring" | "line";
  homeFeatured?: boolean;
  translations: Record<Locale, ProductCopy>;
}

export const products: Product[] = [
  {
    id: "the-long-quiet-hardcover",
    slug: "the-long-quiet-hardcover",
    category: "books",
    priceLabel: "$48",
    availability: "available",
    relatedProductIds: ["notes-on-leaving", "manuscript-notebook"],
    visualToneA: "var(--dg-aqua)",
    visualToneB: "var(--dg-mint)",
    emblem: "ring",
    homeFeatured: true,
    translations: {
      en: {
        title: "The Long Quiet",
        subtitle: "Hardcover Edition, First Printing",
        description:
          "A quiet, interior novel about staying rather than leaving. The first title on Amazing Tiger's published list, set in cloth and printed in a single first run.",
        details: ["Hardcover, 312 pages", "First printing, signed bookplate laid in", "Printed on cream archival stock"],
      },
      ko: {
        title: "긴 침묵",
        subtitle: "양장본, 초판",
        description:
          "떠나기보다 머무는 일에 관한, 조용하고 내밀한 소설입니다. 어메이징 타이거 출판 목록의 첫 번째 작품으로, 초판 한정으로 양장 제본되었습니다.",
        details: ["양장본, 312쪽", "초판, 서명된 북플레이트 동봉", "크림색 아카이브 용지 인쇄"],
      },
    },
  },
  {
    id: "notes-on-leaving",
    slug: "notes-on-leaving",
    category: "books",
    priceLabel: "$26",
    availability: "available",
    relatedProductIds: ["the-long-quiet-hardcover", "reading-room-set"],
    visualToneA: "var(--dg-lemon)",
    visualToneB: "var(--dg-peach)",
    emblem: "line",
    homeFeatured: true,
    translations: {
      en: {
        title: "Notes on Leaving",
        subtitle: "Paperback Edition",
        description:
          "A slim collection of departures — essays and fragments written in transit. Companion volume to The Long Quiet, in a softcover built for travel.",
        details: ["Paperback, 168 pages", "French flaps", "Compact travel format"],
      },
      ko: {
        title: "떠남에 대한 기록",
        subtitle: "페이퍼백 에디션",
        description:
          "이동 중에 쓰인 에세이와 단상들 — 떠남에 대한 짧은 기록들의 모음입니다. 《긴 침묵》과 짝을 이루는, 여행에 어울리는 소프트커버입니다.",
        details: ["페이퍼백, 168쪽", "프렌치 플랩", "휴대하기 좋은 소형 판형"],
      },
    },
  },
  {
    id: "between-measures-ltd",
    slug: "between-measures-ltd",
    category: "limited",
    priceLabel: "$185",
    availability: "limited",
    relatedProductIds: ["founders-proof", "listening-notes-set"],
    visualToneA: "var(--dg-lavender)",
    visualToneB: "var(--dg-periwinkle)",
    emblem: "ring",
    homeFeatured: true,
    translations: {
      en: {
        title: "Between Measures",
        subtitle: "Numbered Edition of 200, Slipcased",
        badge: "Limited Edition",
        description:
          "A numbered run of 200, slipcased and hand-finished, pairing prose with a companion listening list. Each copy is individually numbered on the colophon.",
        details: ["Numbered edition of 200", "Cloth slipcase, hand-finished", "Includes companion listening notes"],
      },
      ko: {
        title: "마디 사이",
        subtitle: "200부 한정, 슬립케이스 포함",
        badge: "한정판",
        description:
          "200부 한정으로 제작되어 슬립케이스에 담기고 손으로 마무리된 에디션으로, 산문과 함께 듣는 리스트가 동봉됩니다. 각 부수마다 개별 번호가 매겨져 있습니다.",
        details: ["200부 한정판", "천 소재 슬립케이스, 핸드 피니시", "동봉된 리스닝 노트 포함"],
      },
    },
  },
  {
    id: "founders-proof",
    slug: "founders-proof",
    category: "limited",
    priceLabel: "Price by inquiry",
    availability: "inquiry_only",
    relatedProductIds: ["between-measures-ltd", "studio-fountain-pen"],
    visualToneA: "var(--dg-rose)",
    visualToneB: "var(--dg-gold-bright)",
    emblem: "line",
    homeFeatured: true,
    translations: {
      en: {
        title: "Founder's Proof Set",
        subtitle: "Signed Proof Pages, Archival Box",
        badge: "Collector's Item",
        description:
          "A small archive of signed proof pages from the studio's early manuscripts, held in an archival box. Offered only by private inquiry, in very limited number.",
        details: ["Signed proof pages, archival box", "Available only by private inquiry", "Extremely limited quantity"],
      },
      ko: {
        title: "설립자 교정쇄 세트",
        subtitle: "서명된 교정쇄, 아카이브 박스",
        badge: "컬렉터 아이템",
        description:
          "스튜디오 초기 원고에서 나온 서명된 교정쇄를 아카이브 박스에 담은 소장품입니다. 매우 소량으로, 비공개 문의를 통해서만 안내됩니다.",
        details: ["서명된 교정쇄, 아카이브 박스", "비공개 문의를 통해서만 제공", "극소량 한정"],
      },
    },
  },
  {
    id: "studio-fountain-pen",
    slug: "studio-fountain-pen",
    category: "objects",
    priceLabel: "$165",
    availability: "available",
    relatedProductIds: ["manuscript-notebook", "reading-room-set"],
    visualToneA: "var(--dg-peach)",
    visualToneB: "var(--dg-rose)",
    emblem: "line",
    translations: {
      en: {
        title: "Studio Fountain Pen",
        subtitle: "Brushed Bronze, Hand Assembled",
        description:
          "A weighted fountain pen in brushed bronze, hand-assembled in small batches for the studio's own writers before being offered more widely.",
        details: ["Brushed bronze body", "Hand assembled in small batches", "Medium nib, converter included"],
      },
      ko: {
        title: "스튜디오 만년필",
        subtitle: "브러시드 브론즈, 핸드메이드",
        description:
          "브러시드 브론즈 소재의 묵직한 만년필로, 스튜디오 작가들을 위해 소량으로 손수 조립한 뒤 더 넓게 선보이게 되었습니다.",
        details: ["브러시드 브론즈 소재", "소량 배치로 핸드메이드", "미디움 닙, 컨버터 포함"],
      },
    },
  },
  {
    id: "manuscript-notebook",
    slug: "manuscript-notebook",
    category: "objects",
    priceLabel: "$38",
    availability: "available",
    relatedProductIds: ["studio-fountain-pen", "the-long-quiet-hardcover"],
    visualToneA: "var(--dg-turquoise)",
    visualToneB: "var(--dg-aqua)",
    emblem: "ring",
    translations: {
      en: {
        title: "Manuscript Notebook",
        subtitle: "Cotton Paper, Smyth Sewn",
        description:
          "A studio notebook in cotton paper, Smyth sewn for a binding that lies flat. Built for drafting, not for decoration.",
        details: ["Cotton paper, 120gsm", "Smyth sewn, lies flat", "Ribbon marker, rounded corners"],
      },
      ko: {
        title: "원고 노트북",
        subtitle: "면지 재질, 사철 제본",
        description:
          "면 소재 용지로 만든 스튜디오 노트북으로, 평평하게 펼쳐지는 사철 제본을 적용했습니다. 장식이 아니라 초고를 위한 노트입니다.",
        details: ["면지, 120gsm", "사철 제본, 평평하게 펼쳐짐", "리본 마커, 라운드 코너"],
      },
    },
  },
  {
    id: "reading-room-set",
    slug: "reading-room-set",
    category: "gifts",
    priceLabel: "$210",
    availability: "available",
    relatedProductIds: ["studio-fountain-pen", "notes-on-leaving"],
    visualToneA: "var(--dg-mint)",
    visualToneB: "var(--dg-lemon)",
    emblem: "line",
    translations: {
      en: {
        title: "The Reading Room Set",
        subtitle: "Notebook, Pen, and First Edition, Boxed",
        description:
          "A considered pairing of the Manuscript Notebook, Studio Fountain Pen, and a first-edition title, boxed for giving.",
        details: ["Manuscript Notebook + Studio Fountain Pen", "One first-edition title, boxed", "Wrapped for gifting"],
      },
      ko: {
        title: "리딩룸 세트",
        subtitle: "노트북, 만년필, 초판 도서 박스 구성",
        description:
          "원고 노트북과 스튜디오 만년필, 그리고 초판 도서 한 권을 정성껏 짝지어 선물용 박스에 담았습니다.",
        details: ["원고 노트북 + 스튜디오 만년필", "초판 도서 한 권, 박스 구성", "선물용 포장"],
      },
    },
  },
  {
    id: "listening-notes-set",
    slug: "listening-notes-set",
    category: "gifts",
    priceLabel: "$225",
    availability: "coming_soon",
    relatedProductIds: ["between-measures-ltd", "reading-room-set"],
    visualToneA: "var(--dg-lavender)",
    visualToneB: "var(--dg-peach)",
    emblem: "ring",
    translations: {
      en: {
        title: "Listening Notes Gift Set",
        subtitle: "Between Measures with Studio Notebook",
        description:
          "Between Measures paired with a dedicated studio notebook for listening notes, in preparation for a small release run.",
        details: ["Between Measures, numbered edition", "Dedicated listening-notes notebook", "Release list opens before general availability"],
      },
      ko: {
        title: "리스닝 노트 선물 세트",
        subtitle: "《마디 사이》와 스튜디오 노트북 구성",
        description:
          "《마디 사이》와 리스닝 노트 전용 스튜디오 노트북을 함께 구성한 세트로, 소량 출시를 준비하고 있습니다.",
        details: ["《마디 사이》 번호판", "리스닝 노트 전용 노트북", "정식 판매 전 발매 알림 명단 운영"],
      },
    },
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductCopy(product: Product, locale: Locale): ProductCopy {
  return product.translations[locale] ?? product.translations.en;
}

export function getHomeFeaturedProducts(): Product[] {
  return products.filter((product) => product.homeFeatured);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedProductIds
    .map((id) => getProductBySlug(id))
    .filter((related): related is Product => Boolean(related));
}

/** Parses a simple "$185" style label into a number, or null for non-numeric labels like "Price by inquiry". */
export function parsePriceLabel(priceLabel: string): number | null {
  const match = priceLabel.match(/^\$([\d,]+(?:\.\d+)?)$/);
  if (!match) return null;
  const value = Number(match[1].replace(/,/g, ""));
  return Number.isFinite(value) ? value : null;
}
