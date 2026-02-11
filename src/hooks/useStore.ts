import { useState, useEffect, useCallback } from 'react';
import { Product, StoreConfig } from '../types';
import { defaultProducts, defaultConfig } from '../data/defaults';

const PRODUCTS_KEY = 'supermarket_products';
const CONFIG_KEY = 'supermarket_config';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return fallback;
}

export function useStore() {
  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage(PRODUCTS_KEY, defaultProducts)
  );
  const [config, setConfig] = useState<StoreConfig>(() =>
    loadFromStorage(CONFIG_KEY, defaultConfig)
  );

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  }, [config]);

  const addProduct = useCallback((product: Product) => {
    setProducts(prev => [...prev, product]);
  }, []);

  const updateProduct = useCallback((product: Product) => {
    setProducts(prev => prev.map(p => (p.id === product.id ? product : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateConfig = useCallback((newConfig: StoreConfig) => {
    setConfig(newConfig);
  }, []);

  const resetToDefaults = useCallback(() => {
    setProducts(defaultProducts);
    setConfig(defaultConfig);
  }, []);

  return {
    products,
    config,
    addProduct,
    updateProduct,
    deleteProduct,
    updateConfig,
    resetToDefaults,
  };
}
