import type { Locale } from "@/lib/i18n/config";

// The Amazing Tiger goods catalogue for Shop V1. Field shape deliberately
// mirrors the products / product_translations split in supabase/schema.sql
// (stable business data vs. per-locale copy) so this module can be swapped
// for a Supabase read later without reshaping the rest of the shop UI.

export type ProductCategory = "stationery" | "objects" | "prints" | "small_goods";

export type ProductAvailability = "available" | "limited" | "coming_soon" | "inquiry_only";

export interface ProductCopy {
  title: string;
  subtitle: string;
  type: string;
  description: string;
  badge?: string;
  details: string[];
}

export interface Product {
  id: string;
  slug: string;
  category: ProductCategory;
  priceLabel: string;
  priceAmount: number | null;
  currency: string;
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
    id: "born-rare-readers-journal",
    slug: "born-rare-readers-journal",
    category: "stationery",
    priceLabel: "$32",
    priceAmount: 32,
    currency: "USD",
    availability: "available",
    relatedProductIds: ["quiet-power-studio-tote", "amazing-tiger-sentence-sticker-capsule"],
    visualToneA: "var(--dg-lemon)",
    visualToneB: "var(--dg-peach)",
    emblem: "line",
    homeFeatured: true,
    translations: {
      en: {
        title: "BORN RARE Annotated Reader's Journal",
        subtitle: "A quiet companion for readers who want to write beside the book.",
        type: "Premium Reader's Journal",
        badge: "Reader's Journal",
        description:
          "A soft ivory writing journal inspired by BORN RARE, with prompts for memory, voice, boundaries, and becoming.",
        details: [
          "Hardcover-style journal",
          "120 lined pages",
          "Ivory interior",
          "Reflection prompts for memory, voice, and becoming",
          "Amazing Tiger title page",
          "Designed for reading notes, memoir fragments, and private sentences",
        ],
      },
      ko: {
        title: "BORN RARE 리더스 저널",
        subtitle: "책과 나란히, 조용히 써 내려가는 동반자.",
        type: "프리미엄 리더스 저널",
        badge: "리더스 저널",
        description:
          "BORN RARE에서 영감을 받은 아이보리 톤의 저널로, 기억과 목소리, 경계와 되어감에 대한 질문을 담았습니다.",
        details: [
          "하드커버 스타일 저널",
          "120쪽 줄노트",
          "아이보리 속지",
          "기억, 목소리, 되어감에 대한 성찰 질문",
          "어메이징 타이거 타이틀 페이지",
          "독서 노트, 회고 단상, 사적인 문장을 위한 구성",
        ],
      },
    },
  },
  {
    id: "quiet-power-studio-tote",
    slug: "quiet-power-studio-tote",
    category: "objects",
    priceLabel: "$42",
    priceAmount: 42,
    currency: "USD",
    availability: "available",
    relatedProductIds: ["born-rare-readers-journal", "rest-your-busy-mind-mug"],
    visualToneA: "var(--dg-mint)",
    visualToneB: "var(--dg-turquoise)",
    emblem: "ring",
    homeFeatured: true,
    translations: {
      en: {
        title: "Quiet Power Studio Tote",
        subtitle: "A studio tote for books, notebooks, headphones, and a private universe in motion.",
        type: "Premium Canvas Tote",
        badge: "Studio Object",
        description:
          "A refined everyday tote carrying the Amazing Tiger sentence energy: quiet, strong, useful, literary.",
        details: [
          "Heavy cotton canvas feel",
          "Minimal front wordmark",
          "Inside quote card",
          "Fits books, laptop, journal, and daily creative work",
          "North America friendly, everyday practical size",
        ],
      },
      ko: {
        title: "Quiet Power 스튜디오 토트",
        subtitle: "책과 노트, 헤드폰, 그리고 움직이는 하나의 사적인 세계를 담는 스튜디오 토트백.",
        type: "프리미엄 캔버스 토트백",
        badge: "스튜디오 오브제",
        description:
          "조용하지만 단단한 어메이징 타이거의 문장 에너지를 담은, 매일 들기 좋은 세련된 토트백입니다.",
        details: [
          "두툼한 코튼 캔버스 소재",
          "미니멀한 프론트 워드마크",
          "인사이드 쿼트 카드 동봉",
          "책, 노트북, 저널 등 일상적인 창작 작업에 적합",
          "북미 라이프스타일에 맞춘 실용적인 사이즈",
        ],
      },
    },
  },
  {
    id: "rest-your-busy-mind-mug",
    slug: "rest-your-busy-mind-mug",
    category: "objects",
    priceLabel: "$28",
    priceAmount: 28,
    currency: "USD",
    availability: "available",
    relatedProductIds: ["quiet-power-studio-tote", "aurora-after-the-storm-print"],
    visualToneA: "var(--dg-peach)",
    visualToneB: "var(--dg-rose)",
    emblem: "ring",
    translations: {
      en: {
        title: "Rest Your Busy Mind Ceramic Mug",
        subtitle: "A morning object for writers, readers, and minds that move too fast.",
        type: "Ceramic Mug",
        badge: "Studio Mug",
        description: "A warm mug inspired by Emma's music and the phrase Rest Your Busy Mind.",
        details: [
          "Ceramic mug",
          "Soft porcelain white",
          "Dream Glass pastel accent",
          "Quote inspired by EMMAESTRO music",
          "For coffee, tea, and late-night writing sessions",
        ],
      },
      ko: {
        title: "Rest Your Busy Mind 세라믹 머그",
        subtitle: "너무 빨리 움직이는 마음을 위한, 작가와 독자의 아침 오브제.",
        type: "세라믹 머그",
        badge: "스튜디오 머그",
        description: "Emma의 음악과 'Rest Your Busy Mind'라는 문장에서 영감을 받은 따뜻한 머그입니다.",
        details: [
          "세라믹 머그",
          "부드러운 포슬린 화이트",
          "드림 글래스 파스텔 포인트",
          "EMMAESTRO 음악에서 영감을 받은 문장",
          "커피, 차, 그리고 늦은 밤 글쓰기 시간을 위해",
        ],
      },
    },
  },
  {
    id: "aurora-after-the-storm-print",
    slug: "aurora-after-the-storm-print",
    category: "prints",
    priceLabel: "$48",
    priceAmount: 48,
    currency: "USD",
    availability: "limited",
    relatedProductIds: ["rest-your-busy-mind-mug", "emmaestro-dream-glass-phone-case"],
    visualToneA: "var(--dg-lavender)",
    visualToneB: "var(--dg-periwinkle)",
    emblem: "line",
    homeFeatured: true,
    translations: {
      en: {
        title: "Aurora After the Storm Art Print",
        subtitle: "A luminous print for rooms where a new chapter begins.",
        type: "Wall Art Print",
        badge: "Limited Print",
        description:
          "A pastel aurora inspired art print based on the BORN RARE appendix mood: collision, color, and direction after impact.",
        details: [
          "Museum poster quality",
          "Soft aurora palette",
          "Dream Glass color field",
          "Numbered edition",
          "Designed for reading rooms, studios, and creative desks",
        ],
      },
      ko: {
        title: "Aurora After the Storm 아트 프린트",
        subtitle: "새로운 챕터가 시작되는 공간을 위한, 빛나는 프린트.",
        type: "월 아트 프린트",
        badge: "한정 프린트",
        description:
          "BORN RARE 애펜딕스의 정서 — 충돌과 색채, 그리고 그 이후의 방향 — 에서 영감을 받은 파스텔 오로라 아트 프린트입니다.",
        details: [
          "뮤지엄 포스터 품질",
          "부드러운 오로라 팔레트",
          "드림 글래스 컬러 필드",
          "넘버링 에디션",
          "리딩룸, 스튜디오, 창작 데스크를 위한 구성",
        ],
      },
    },
  },
  {
    id: "amazing-tiger-sentence-sticker-capsule",
    slug: "amazing-tiger-sentence-sticker-capsule",
    category: "small_goods",
    priceLabel: "$18",
    priceAmount: 18,
    currency: "USD",
    availability: "available",
    relatedProductIds: ["born-rare-readers-journal", "quiet-power-studio-tote"],
    visualToneA: "var(--dg-rose)",
    visualToneB: "var(--dg-lemon)",
    emblem: "ring",
    translations: {
      en: {
        title: "Amazing Tiger Sentence Sticker Capsule",
        subtitle: "Tiny literary marks for journals, laptops, letters, and studio walls.",
        type: "Sticker Pack",
        badge: "Sticker Capsule",
        description:
          "A refined sticker capsule using short phrases and symbols from the Amazing Tiger universe.",
        details: [
          "Set of 12 stickers",
          "Dream Glass pastel palette",
          "Short phrases and abstract tiger trace marks",
          "For journals, packaging, laptops, and reader gifts",
          "Refined, not childish or cartoonish",
        ],
      },
      ko: {
        title: "Amazing Tiger 센텐스 스티커 캡슐",
        subtitle: "저널과 노트북, 편지와 스튜디오 벽을 위한, 아주 작은 문학적 흔적들.",
        type: "스티커 팩",
        badge: "스티커 캡슐",
        description: "어메이징 타이거 세계관의 짧은 문장과 상징을 담은, 정제된 스티커 캡슐입니다.",
        details: [
          "스티커 12매 세트",
          "드림 글래스 파스텔 팔레트",
          "짧은 문장과 추상적인 타이거 트레이스 마크",
          "저널, 패키징, 노트북, 독자 선물용으로 적합",
          "유치하지 않은, 정제된 톤앤매너",
        ],
      },
    },
  },
  {
    id: "emmaestro-dream-glass-phone-case",
    slug: "emmaestro-dream-glass-phone-case",
    category: "objects",
    priceLabel: "$36",
    priceAmount: 36,
    currency: "USD",
    availability: "coming_soon",
    relatedProductIds: ["aurora-after-the-storm-print", "amazing-tiger-sentence-sticker-capsule"],
    visualToneA: "var(--dg-periwinkle)",
    visualToneB: "var(--dg-turquoise)",
    emblem: "line",
    translations: {
      en: {
        title: "EMMAESTRO Dream Glass Phone Case",
        subtitle: "A pocket-sized fragment of Emma's music and color universe.",
        type: "Phone Case",
        badge: "Coming Soon",
        description:
          "A colorful but elegant phone case using EMMAESTRO sound, wave, and Dream Glass visual language.",
        details: [
          "Soft iridescent Dream Glass pattern",
          "Subtle EMMAESTRO mark",
          "Inspired by sound waves, color, and motion",
          "Future product for the creator goods expansion",
        ],
      },
      ko: {
        title: "EMMAESTRO 드림 글래스 폰 케이스",
        subtitle: "Emma의 음악과 컬러 세계를 담은, 손안의 작은 조각.",
        type: "폰 케이스",
        badge: "출시 예정",
        description:
          "EMMAESTRO의 사운드와 웨이브, 드림 글래스의 시각 언어를 담은 컬러풀하면서도 우아한 폰 케이스입니다.",
        details: [
          "부드러운 이리데센트 드림 글래스 패턴",
          "은은한 EMMAESTRO 마크",
          "사운드 웨이브와 컬러, 움직임에서 영감을 받음",
          "크리에이터 굿즈 확장을 위한 향후 출시 제품",
        ],
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
