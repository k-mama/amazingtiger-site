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
  /** Optional real product photo (falls back to the EditorialObject mark when absent). */
  image?: string;
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
    image: "/images/homepage/shop/born-rare-readers-journal.webp",
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
      es: {
        title: "Diario Anotado del Lector BORN RARE",
        subtitle: "Un compañero silencioso para lectores que quieren escribir junto al libro.",
        type: "Diario de Lector Premium",
        badge: "Diario de Lector",
        description:
          "Un diario de escritura en tono marfil inspirado en BORN RARE, con preguntas sobre memoria, voz, límites y transformación.",
        details: [
          "Diario de estilo tapa dura",
          "120 páginas rayadas",
          "Interior color marfil",
          "Preguntas de reflexión sobre memoria, voz y transformación",
          "Página de título Amazing Tiger",
          "Diseñado para notas de lectura, fragmentos de memorias y frases privadas",
        ],
      },
      "es-CO": {
        title: "Diario Anotado del Lector BORN RARE",
        subtitle: "Un compañero silencioso para quienes quieren escribir al lado del libro.",
        type: "Diario de Lector Premium",
        badge: "Diario de Lector",
        description:
          "Un diario de escritura en tono marfil inspirado en BORN RARE, con preguntas sobre la memoria, la voz, los límites y el proceso de convertirse en quien uno es.",
        details: [
          "Diario estilo tapa dura",
          "120 páginas rayadas",
          "Interior color marfil",
          "Preguntas de reflexión sobre la memoria, la voz y el proceso de convertirse",
          "Página de título Amazing Tiger",
          "Pensado para notas de lectura, fragmentos de memorias y frases personales",
        ],
      },
      "pt-BR": {
        title: "Caderno Anotado do Leitor BORN RARE",
        subtitle: "Uma companhia silenciosa para leitores que querem escrever ao lado do livro.",
        type: "Caderno de Leitor Premium",
        badge: "Caderno de Leitor",
        description:
          "Um caderno de escrita em tom marfim inspirado em BORN RARE, com estímulos sobre memória, voz, limites e transformação.",
        details: [
          "Caderno estilo capa dura",
          "120 páginas pautadas",
          "Miolo em tom marfim",
          "Estímulos de reflexão sobre memória, voz e transformação",
          "Página de título Amazing Tiger",
          "Pensado para notas de leitura, fragmentos de memórias e frases privadas",
        ],
      },
      ja: {
        title: "BORN RARE アノテーテッド・リーダーズジャーナル",
        subtitle: "本と並んで、静かに書き綴るための伴侶。",
        type: "プレミアム・リーダーズジャーナル",
        badge: "リーダーズジャーナル",
        description:
          "BORN RAREにインスパイアされたアイボリートーンのジャーナル。記憶、声、境界、そして変化についての問いを収めています。",
        details: [
          "ハードカバー仕立てのジャーナル",
          "120ページの罫線入り",
          "アイボリーの紙面",
          "記憶、声、変化についての内省的な問い",
          "Amazing Tigerタイトルページ",
          "読書ノート、回想の断片、私的な一文のために",
        ],
      },
      "zh-TW": {
        title: "BORN RARE 讀者手記",
        subtitle: "陪伴讀者在書頁旁靜靜書寫的靜謐夥伴。",
        type: "頂級讀者手記",
        badge: "讀者手記",
        description:
          "靈感源自 BORN RARE 的象牙白書寫手記,收錄關於記憶、聲音、界線與蛻變的提問。",
        details: [
          "精裝風格手記本",
          "120 頁劃線內頁",
          "象牙白內頁",
          "關於記憶、聲音與蛻變的反思提問",
          "Amazing Tiger 標題頁",
          "適合閱讀筆記、回憶錄片段與私密文字",
        ],
      },
      "zh-CN": {
        title: "BORN RARE 读者手记",
        subtitle: "陪伴读者在书页旁静静书写的静谧伙伴。",
        type: "高级读者手记",
        badge: "读者手记",
        description:
          "灵感源自 BORN RARE 的象牙白书写手记,收录关于记忆、声音、边界与蜕变的提问。",
        details: [
          "精装风格手记本",
          "120 页划线内页",
          "象牙白内页",
          "关于记忆、声音与蜕变的反思提问",
          "Amazing Tiger 标题页",
          "适合阅读笔记、回忆片段与私密文字",
        ],
      },
      "en-GB": {
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
    image: "/images/homepage/shop/quiet-power-studio-tote.webp",
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
      es: {
        title: "Bolso de Estudio Quiet Power",
        subtitle: "Un bolso de estudio para libros, cuadernos, audífonos y un universo privado en movimiento.",
        type: "Bolso de Lona Premium",
        badge: "Objeto de Estudio",
        description:
          "Un bolso cotidiano y refinado que lleva la energía silenciosa y firme de la frase Amazing Tiger: tranquila, fuerte, útil, literaria.",
        details: [
          "Lona de algodón gruesa",
          "Logotipo frontal minimalista",
          "Tarjeta con cita en el interior",
          "Ideal para libros, portátil, diario y trabajo creativo diario",
          "Tamaño práctico para el día a día en Norteamérica",
        ],
      },
      "es-CO": {
        title: "Bolso de Estudio Quiet Power",
        subtitle: "Un bolso de estudio para libros, cuadernos, audífonos y todo un universo privado en movimiento.",
        type: "Bolso de Lona Premium",
        badge: "Objeto de Estudio",
        description:
          "Un bolso para el día a día, refinado, que lleva la energía silenciosa y firme de la frase Amazing Tiger: tranquila, fuerte, útil, literaria.",
        details: [
          "Lona de algodón gruesa",
          "Logo frontal minimalista",
          "Tarjeta con frase en el interior",
          "Le caben libros, el computador, el diario y el trabajo creativo del día",
          "Tamaño práctico, pensado para el uso diario",
        ],
      },
      "pt-BR": {
        title: "Bolsa de Estúdio Quiet Power",
        subtitle: "Uma bolsa de estúdio para livros, cadernos, fones de ouvido e um universo privado em movimento.",
        type: "Bolsa de Lona Premium",
        badge: "Objeto de Estúdio",
        description:
          "Uma bolsa refinada para o dia a dia, carregando a energia silenciosa e firme da frase Amazing Tiger: quieta, forte, útil, literária.",
        details: [
          "Lona de algodão encorpada",
          "Logotipo frontal minimalista",
          "Cartão com frase no interior",
          "Cabe livros, notebook, caderno e o trabalho criativo do dia",
          "Tamanho prático para o uso diário",
        ],
      },
      ja: {
        title: "Quiet Power スタジオトート",
        subtitle: "本、ノート、ヘッドホン、そして動き続ける私的な世界を運ぶスタジオトート。",
        type: "プレミアム・キャンバストート",
        badge: "スタジオオブジェクト",
        description:
          "Amazing Tigerの文章のエネルギー——静かで、強く、実用的で、文学的——を宿した、洗練された日常使いのトートバッグです。",
        details: [
          "厚手のコットンキャンバス素材",
          "ミニマルなフロントワードマーク",
          "内側にクオートカードを封入",
          "本、ノートパソコン、ジャーナル、日々の創作作業に対応",
          "北米の日常に馴染む実用的なサイズ",
        ],
      },
      "zh-TW": {
        title: "Quiet Power 工作室托特包",
        subtitle: "容納書籍、筆記本、耳機,以及不斷前行的私人世界的工作室托特包。",
        type: "頂級帆布托特包",
        badge: "工作室物件",
        description:
          "承載 Amazing Tiger 語句能量——靜謐、堅定、實用、富有文學氣息——的日常精緻托特包。",
        details: [
          "厚實純棉帆布材質",
          "極簡正面標誌",
          "內附語錄卡片",
          "可容納書籍、筆電、手記與日常創作用品",
          "貼合北美生活的實用尺寸",
        ],
      },
      "zh-CN": {
        title: "Quiet Power 工作室托特包",
        subtitle: "容纳书籍、笔记本、耳机,以及不断前行的私人世界的工作室托特包。",
        type: "高级帆布托特包",
        badge: "工作室物件",
        description:
          "承载 Amazing Tiger 语句能量——静谧、坚定、实用、富有文学气息——的日常精致托特包。",
        details: [
          "厚实纯棉帆布材质",
          "极简正面标志",
          "内附语录卡片",
          "可容纳书籍、笔记本电脑、手记与日常创作用品",
          "贴合日常生活的实用尺寸",
        ],
      },
      "en-GB": {
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
          "Practical everyday size",
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
    image: "/images/homepage/shop/rest-your-busy-mind-mug.webp",
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
      es: {
        title: "Taza de Cerámica Rest Your Busy Mind",
        subtitle: "Un objeto matutino para escritores, lectores y mentes que se mueven demasiado rápido.",
        type: "Taza de Cerámica",
        badge: "Taza de Estudio",
        description: "Una taza cálida inspirada en la música de Emma y la frase Rest Your Busy Mind.",
        details: [
          "Taza de cerámica",
          "Blanco porcelana suave",
          "Toque pastel Dream Glass",
          "Cita inspirada en la música de EMMAESTRO",
          "Para café, té y sesiones de escritura nocturnas",
        ],
      },
      "es-CO": {
        title: "Taza de Cerámica Rest Your Busy Mind",
        subtitle: "Un objeto para la mañana, pensado para escritores, lectores y mentes que van demasiado rápido.",
        type: "Taza de Cerámica",
        badge: "Taza de Estudio",
        description: "Una taza cálida inspirada en la música de Emma y en la frase Rest Your Busy Mind.",
        details: [
          "Taza de cerámica",
          "Blanco porcelana suave",
          "Toque pastel Dream Glass",
          "Frase inspirada en la música de EMMAESTRO",
          "Para el café, el té y las noches de escritura",
        ],
      },
      "pt-BR": {
        title: "Caneca de Cerâmica Rest Your Busy Mind",
        subtitle: "Um objeto matinal para escritores, leitores e mentes que se movem rápido demais.",
        type: "Caneca de Cerâmica",
        badge: "Caneca de Estúdio",
        description: "Uma caneca acolhedora inspirada na música de Emma e na frase Rest Your Busy Mind.",
        details: [
          "Caneca de cerâmica",
          "Branco porcelana suave",
          "Toque pastel Dream Glass",
          "Frase inspirada na música da EMMAESTRO",
          "Para café, chá e sessões de escrita noturnas",
        ],
      },
      ja: {
        title: "Rest Your Busy Mind セラミックマグ",
        subtitle: "動きすぎる心のための、書き手と読み手の朝のオブジェクト。",
        type: "セラミックマグ",
        badge: "スタジオマグ",
        description: "Emmaの音楽とRest Your Busy Mindというフレーズにインスパイアされた、温かみのあるマグ。",
        details: [
          "セラミックマグ",
          "柔らかなポーセリンホワイト",
          "Dream Glassパステルアクセント",
          "EMMAESTROの音楽にインスパイアされたフレーズ",
          "コーヒー、お茶、そして夜の執筆の時間に",
        ],
      },
      "zh-TW": {
        title: "Rest Your Busy Mind 陶瓷馬克杯",
        subtitle: "獻給步調過快的心靈,作家與讀者的晨間物件。",
        type: "陶瓷馬克杯",
        badge: "工作室馬克杯",
        description: "靈感源自 Emma 的音樂與 Rest Your Busy Mind 這句話的溫暖馬克杯。",
        details: [
          "陶瓷馬克杯",
          "柔和瓷白色澤",
          "Dream Glass 粉彩點綴",
          "靈感源自 EMMAESTRO 音樂的字句",
          "適合咖啡、茶,以及深夜書寫的時光",
        ],
      },
      "zh-CN": {
        title: "Rest Your Busy Mind 陶瓷马克杯",
        subtitle: "献给节奏过快的心灵,作家与读者的晨间物件。",
        type: "陶瓷马克杯",
        badge: "工作室马克杯",
        description: "灵感源自 Emma 的音乐与 Rest Your Busy Mind 这句话的温暖马克杯。",
        details: [
          "陶瓷马克杯",
          "柔和瓷白色泽",
          "Dream Glass 粉彩点缀",
          "灵感源自 EMMAESTRO 音乐的字句",
          "适合咖啡、茶,以及深夜书写的时光",
        ],
      },
      "en-GB": {
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
      es: {
        title: "Lámina Artística Aurora After the Storm",
        subtitle: "Una lámina luminosa para espacios donde comienza un nuevo capítulo.",
        type: "Lámina para Pared",
        badge: "Edición Limitada",
        description:
          "Una lámina de aurora en tonos pastel inspirada en el apéndice de BORN RARE: colisión, color y dirección después del impacto.",
        details: [
          "Calidad de póster de museo",
          "Paleta de aurora suave",
          "Campo de color Dream Glass",
          "Edición numerada",
          "Pensada para salas de lectura, estudios y escritorios creativos",
        ],
      },
      "es-CO": {
        title: "Lámina Artística Aurora After the Storm",
        subtitle: "Una lámina luminosa para los espacios donde empieza un capítulo nuevo.",
        type: "Lámina para Pared",
        badge: "Edición Limitada",
        description:
          "Una lámina de aurora en tonos pastel, inspirada en el apéndice de BORN RARE: el choque, el color y el rumbo después del impacto.",
        details: [
          "Calidad de póster de museo",
          "Paleta de aurora suave",
          "Campo de color Dream Glass",
          "Edición numerada",
          "Pensada para salas de lectura, estudios y escritorios creativos",
        ],
      },
      "pt-BR": {
        title: "Gravura Artística Aurora After the Storm",
        subtitle: "Uma gravura luminosa para espaços onde um novo capítulo começa.",
        type: "Gravura de Parede",
        badge: "Edição Limitada",
        description:
          "Uma gravura de aurora em tons pastel inspirada no clima do apêndice de BORN RARE: colisão, cor e direção depois do impacto.",
        details: [
          "Qualidade de pôster de museu",
          "Paleta de aurora suave",
          "Campo de cor Dream Glass",
          "Edição numerada",
          "Pensada para salas de leitura, estúdios e mesas de trabalho criativas",
        ],
      },
      ja: {
        title: "Aurora After the Storm アートプリント",
        subtitle: "新しい章が始まる部屋のための、光を纏ったプリント。",
        type: "ウォールアートプリント",
        badge: "限定プリント",
        description:
          "BORN RARE付録の情緒——衝突、色彩、そしてその後の方向性——にインスパイアされた、パステルオーロラのアートプリント。",
        details: [
          "美術館ポスター品質",
          "柔らかなオーロラパレット",
          "Dream Glassカラーフィールド",
          "ナンバリング・エディション",
          "リーディングルーム、スタジオ、創作デスクのために",
        ],
      },
      "zh-TW": {
        title: "Aurora After the Storm 藝術版畫",
        subtitle: "為新篇章開始的空間,獻上一幅光影流動的版畫。",
        type: "牆面藝術版畫",
        badge: "限量版畫",
        description:
          "靈感源自 BORN RARE 附錄氛圍——衝撞、色彩,以及衝擊之後的方向——的粉彩極光藝術版畫。",
        details: [
          "博物館海報品質",
          "柔和極光色調",
          "Dream Glass 色域",
          "編號限量版",
          "適合閱讀室、工作室與創作書桌",
        ],
      },
      "zh-CN": {
        title: "Aurora After the Storm 艺术版画",
        subtitle: "为新篇章开始的空间,献上一幅光影流动的版画。",
        type: "墙面艺术版画",
        badge: "限量版画",
        description:
          "灵感源自 BORN RARE 附录氛围——碰撞、色彩,以及冲击之后的方向——的粉彩极光艺术版画。",
        details: [
          "博物馆海报质量",
          "柔和极光色调",
          "Dream Glass 色域",
          "编号限量版",
          "适合阅读室、工作室与创作书桌",
        ],
      },
      "en-GB": {
        title: "Aurora After the Storm Art Print",
        subtitle: "A luminous print for rooms where a new chapter begins.",
        type: "Wall Art Print",
        badge: "Limited Print",
        description:
          "A pastel aurora inspired art print based on the BORN RARE appendix mood: collision, colour, and direction after impact.",
        details: [
          "Museum poster quality",
          "Soft aurora palette",
          "Dream Glass colour field",
          "Numbered edition",
          "Designed for reading rooms, studios, and creative desks",
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
      es: {
        title: "Cápsula de Stickers Amazing Tiger Sentence",
        subtitle: "Pequeñas marcas literarias para diarios, portátiles, cartas y paredes de estudio.",
        type: "Paquete de Stickers",
        badge: "Cápsula de Stickers",
        description:
          "Una cápsula de stickers refinada con frases cortas y símbolos del universo Amazing Tiger.",
        details: [
          "Set de 12 stickers",
          "Paleta pastel Dream Glass",
          "Frases cortas y trazos abstractos del tigre",
          "Para diarios, empaques, portátiles y regalos para lectores",
          "Refinado, sin caer en lo infantil",
        ],
      },
      "es-CO": {
        title: "Cápsula de Stickers Amazing Tiger Sentence",
        subtitle: "Marcas literarias pequeñas para diarios, portátiles, cartas y paredes de estudio.",
        type: "Paquete de Stickers",
        badge: "Cápsula de Stickers",
        description: "Una cápsula de stickers, refinada, con frases cortas y símbolos del universo Amazing Tiger.",
        details: [
          "Set de 12 stickers",
          "Paleta pastel Dream Glass",
          "Frases cortas y trazos abstractos del tigre",
          "Para diarios, empaques, portátiles y regalos para lectores",
          "Refinado, sin caer en lo infantil",
        ],
      },
      "pt-BR": {
        title: "Cápsula de Adesivos Amazing Tiger Sentence",
        subtitle: "Pequenas marcas literárias para cadernos, notebooks, cartas e paredes de estúdio.",
        type: "Pacote de Adesivos",
        badge: "Cápsula de Adesivos",
        description:
          "Uma cápsula de adesivos refinada, com frases curtas e símbolos do universo Amazing Tiger.",
        details: [
          "Conjunto de 12 adesivos",
          "Paleta pastel Dream Glass",
          "Frases curtas e traços abstratos do tigre",
          "Para cadernos, embalagens, notebooks e presentes para leitores",
          "Refinado, sem cair no infantil",
        ],
      },
      ja: {
        title: "Amazing Tiger センテンス・ステッカーカプセル",
        subtitle: "ジャーナル、ノートパソコン、手紙、スタジオの壁のための、小さな文学的な印。",
        type: "ステッカーパック",
        badge: "ステッカーカプセル",
        description:
          "Amazing Tiger世界観の短いフレーズとシンボルをあしらった、洗練されたステッカーカプセル。",
        details: [
          "12枚セット",
          "Dream Glassパステルパレット",
          "短いフレーズと抽象的なタイガーのトレース",
          "ジャーナル、梱包、ノートパソコン、読者への贈り物に",
          "子供っぽくならない、洗練されたトーン",
        ],
      },
      "zh-TW": {
        title: "Amazing Tiger 語句貼紙膠囊",
        subtitle: "獻給手記、筆電、信件與工作室牆面的微小文學印記。",
        type: "貼紙組合包",
        badge: "貼紙膠囊",
        description:
          "以 Amazing Tiger 世界觀的短句與符號構成的精緻貼紙膠囊。",
        details: [
          "12 枚一組",
          "Dream Glass 粉彩色調",
          "短句與抽象老虎印記",
          "適合手記、包裝、筆電與讀者贈禮",
          "精緻而不流於童趣",
        ],
      },
      "zh-CN": {
        title: "Amazing Tiger 语句贴纸胶囊",
        subtitle: "献给手记、笔记本电脑、信件与工作室墙面的微小文学印记。",
        type: "贴纸组合包",
        badge: "贴纸胶囊",
        description:
          "以 Amazing Tiger 世界观的短句与符号构成的精致贴纸胶囊。",
        details: [
          "12 枚一组",
          "Dream Glass 粉彩色调",
          "短句与抽象老虎印记",
          "适合手记、包装、笔记本电脑与读者赠礼",
          "精致而不流于童趣",
        ],
      },
      "en-GB": {
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
      es: {
        title: "Funda de Teléfono EMMAESTRO Dream Glass",
        subtitle: "Un fragmento de bolsillo del universo musical y cromático de Emma.",
        type: "Funda de Teléfono",
        badge: "Próximamente",
        description:
          "Una funda de teléfono colorida pero elegante, con el lenguaje visual de sonido, onda y Dream Glass de EMMAESTRO.",
        details: [
          "Patrón Dream Glass suave e iridiscente",
          "Marca EMMAESTRO sutil",
          "Inspirada en ondas sonoras, color y movimiento",
          "Futuro producto de la expansión de artículos para creadores",
        ],
      },
      "es-CO": {
        title: "Funda de Celular EMMAESTRO Dream Glass",
        subtitle: "Un fragmento de bolsillo del universo musical y de color de Emma.",
        type: "Funda de Celular",
        badge: "Muy Pronto",
        description:
          "Una funda de celular colorida pero elegante, con el lenguaje visual de sonido, onda y Dream Glass de EMMAESTRO.",
        details: [
          "Patrón Dream Glass suave e iridiscente",
          "Marca EMMAESTRO sutil",
          "Inspirada en ondas de sonido, color y movimiento",
          "Futuro producto de la expansión de artículos para creadores",
        ],
      },
      "pt-BR": {
        title: "Capinha de Celular EMMAESTRO Dream Glass",
        subtitle: "Um fragmento de bolso do universo musical e cromático de Emma.",
        type: "Capinha de Celular",
        badge: "Em Breve",
        description:
          "Uma capinha de celular colorida, mas elegante, com a linguagem visual de som, onda e Dream Glass da EMMAESTRO.",
        details: [
          "Padrão Dream Glass suave e iridescente",
          "Marca EMMAESTRO sutil",
          "Inspirada em ondas sonoras, cor e movimento",
          "Futuro produto da expansão de itens para criadores",
        ],
      },
      ja: {
        title: "EMMAESTRO Dream Glass フォンケース",
        subtitle: "Emmaの音楽と色彩の世界を宿した、ポケットサイズの断片。",
        type: "フォンケース",
        badge: "近日公開",
        description:
          "EMMAESTROのサウンド、ウェーブ、そしてDream Glassのビジュアル言語をあしらった、カラフルでいてエレガントなフォンケース。",
        details: [
          "柔らかく虹色に輝くDream Glassパターン",
          "控えめなEMMAESTROマーク",
          "サウンドウェーブ、色彩、動きにインスパイアされたデザイン",
          "クリエイターグッズ拡張のための今後の製品",
        ],
      },
      "zh-TW": {
        title: "EMMAESTRO Dream Glass 手機殼",
        subtitle: "承載 Emma 音樂與色彩世界的口袋尺寸片段。",
        type: "手機殼",
        badge: "即將推出",
        description:
          "融合 EMMAESTRO 聲音、波形與 Dream Glass 視覺語言的手機殼,繽紛卻不失優雅。",
        details: [
          "柔和的珠光 Dream Glass 圖案",
          "低調的 EMMAESTRO 標誌",
          "靈感源自音波、色彩與動態",
          "創作者商品系列的未來新品",
        ],
      },
      "zh-CN": {
        title: "EMMAESTRO Dream Glass 手机壳",
        subtitle: "承载 Emma 音乐与色彩世界的口袋尺寸片段。",
        type: "手机壳",
        badge: "即将推出",
        description:
          "融合 EMMAESTRO 声音、波形与 Dream Glass 视觉语言的手机壳,缤纷却不失优雅。",
        details: [
          "柔和的珠光 Dream Glass 图案",
          "低调的 EMMAESTRO 标志",
          "灵感源自音波、色彩与动态",
          "创作者商品系列的未来新品",
        ],
      },
      "en-GB": {
        title: "EMMAESTRO Dream Glass Phone Case",
        subtitle: "A pocket-sized fragment of Emma's music and colour universe.",
        type: "Phone Case",
        badge: "Coming Soon",
        description:
          "A colourful but elegant phone case using EMMAESTRO sound, wave, and Dream Glass visual language.",
        details: [
          "Soft iridescent Dream Glass pattern",
          "Subtle EMMAESTRO mark",
          "Inspired by sound waves, colour, and motion",
          "Future product for the creator goods expansion",
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
