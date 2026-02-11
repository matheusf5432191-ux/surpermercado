import { Product, StoreConfig } from '../types';

export const defaultConfig: StoreConfig = {
  storeName: 'Supermercado Caetano',
  storeSlogan: 'As melhores ofertas da cidade!',
  whatsapp: '5511999999999',
  address: 'Rua Principal, 123 - Centro',
  adminPassword: 'admin123',
  instagram: '',
  facebook: '',
  tiktok: '',
};

export const defaultProducts: Product[] = [];

export const categories = [
  'Todos',
  'Mercearia',
  'Hortifruti',
  'Acougue',
  'Laticinios',
  'Bebidas',
  'Padaria',
  'Higiene',
  'Limpeza',
];
