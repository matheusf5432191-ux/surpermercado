import { useState } from 'react';
import { FiGrid, FiStar, FiShoppingBag, FiImage, FiShoppingCart, FiCheck } from 'react-icons/fi';
import { Product } from '../types';
import { categories } from '../data/defaults';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative h-48 sm:h-52 bg-gray-100 overflow-hidden">
        {!imgError && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <FiImage className="w-16 h-16 text-gray-400" />
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
            -{discount}%
          </div>
        )}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-black text-orange-400 p-1.5 rounded-full shadow-lg">
            <FiStar className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="text-gray-900 font-bold mt-1 text-sm sm:text-base leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-400 text-xs mt-1">{product.unit}</p>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-2xl font-black text-orange-600">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through mb-0.5">
              R$ {product.oldPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>

        {/* Add to cart button */}
        <div className="mt-4 mt-auto pt-2">
          <button
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-black hover:bg-orange-500 text-white'
            }`}
          >
            {added ? (
              <>
                <FiCheck className="w-4 h-4" />
                Adicionado
              </>
            ) : (
              <>
                <FiShoppingCart className="w-4 h-4" />
                Adicionar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredProducts = products.filter(p => {
    if (activeCategory !== 'Todos' && p.category !== activeCategory) return false;
    if (showFeaturedOnly && !p.featured) return false;
    return true;
  });

  const usedCategories = categories.filter(
    c => c === 'Todos' || products.some(p => p.category === c)
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-10" id="produtos">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 rounded-lg p-2">
            <FiShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Nossos Produtos</h2>
            <p className="text-gray-500 text-sm">{filteredProducts.length} produtos encontrados</p>
          </div>
        </div>

        <button
          onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            showFeaturedOnly
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FiStar className="w-4 h-4" />
          Destaques
        </button>
      </div>

      {/* Categories */}
      {usedCategories.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {usedCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-black text-orange-400 shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FiGrid className="w-3.5 h-3.5" />
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-semibold">Nenhum produto cadastrado ainda.</p>
          <p className="text-gray-400 text-sm mt-2">Em breve teremos ofertas incriveis para voce!</p>
        </div>
      )}
    </section>
  );
}
