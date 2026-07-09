export type UserRole = "member" | "admin";

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  role: UserRole;
  created_at: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export type ConsultationStatus = "new" | "in_progress" | "closed";

export interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  project_type: string | null;
  message: string;
  status: ConsultationStatus;
  created_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string | null;
  guest_identifier: string | null;
  created_at: string;
}

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  session_id: string;
  role: ChatRole;
  content: string;
  created_at: string;
}

export interface AdminNote {
  id: string;
  author_id: string;
  subject_type: string;
  subject_id: string;
  note: string;
  created_at: string;
}

export type ProductCategoryDb = "stationery" | "objects" | "prints" | "small_goods";
export type ProductStatus = "draft" | "active" | "archived";

export interface ProductRow {
  id: string;
  sku: string | null;
  category: ProductCategoryDb;
  price_cents: number;
  currency: string;
  status: ProductStatus;
  badge: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductTranslation {
  id: string;
  product_id: string;
  locale: string;
  title: string;
  subtitle: string | null;
  description: string | null;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  variant_name: string;
  sku_suffix: string | null;
  price_cents_override: number | null;
  inventory_count: number;
  sort_order: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
}

export type CartStatus = "active" | "converted" | "abandoned";

export interface Cart {
  id: string;
  user_id: string;
  status: CartStatus;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  created_at: string;
}

export type OrderStatus = "pending_inquiry" | "pending" | "paid" | "fulfilled" | "cancelled" | "refunded";

export interface Order {
  id: string;
  user_id: string | null;
  status: OrderStatus;
  total_cents: number;
  currency: string;
  shipping_address: Record<string, unknown> | null;
  customer_name: string | null;
  customer_email: string | null;
  phone: string | null;
  locale: string;
  message: string | null;
  country: string | null;
  region: string | null;
  billing_first_name: string | null;
  billing_last_name: string | null;
  billing_address_line1: string | null;
  billing_address_line2: string | null;
  billing_city: string | null;
  billing_state: string | null;
  billing_postal_code: string | null;
  shipping_same_as_billing: boolean;
  shipping_first_name: string | null;
  shipping_last_name: string | null;
  shipping_country: string | null;
  shipping_address_line1: string | null;
  shipping_address_line2: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_postal_code: string | null;
  order_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  variant_id: string | null;
  product_slug: string | null;
  product_title_snapshot: string | null;
  quantity: number;
  unit_price_cents: number;
  unit_price_label: string | null;
  created_at: string;
}
