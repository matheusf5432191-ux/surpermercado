export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  unit: string;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreConfig {
  storeName: string;
  storeSlogan: string;
  whatsapp: string;
  address: string;
  adminPassword: string;
  instagram: string;
  facebook: string;
  tiktok: string;
}
