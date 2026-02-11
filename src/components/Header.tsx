import { FiShoppingCart, FiMapPin, FiPhone, FiMenu } from 'react-icons/fi';
import { StoreConfig } from '../types';

interface HeaderProps {
  config: StoreConfig;
  cartCount: number;
  onCartOpen: () => void;
  onMenuOpen: () => void;
}

export function Header({ config, cartCount, onCartOpen, onMenuOpen }: HeaderProps) {
  const nameParts = config.storeName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  return (
    <header className="bg-black text-white shadow-2xl sticky top-0 z-40">
      {/* Top bar */}
      <div className="bg-orange-600 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <FiMapPin className="w-3.5 h-3.5" />
            <span>{config.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiPhone className="w-3.5 h-3.5" />
            <span>WhatsApp: {config.whatsapp.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')}</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Menu Button + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuOpen}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            title="Abrir menu"
          >
            <FiMenu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-orange-500 rounded-xl p-2.5 hidden sm:flex">
              <FiShoppingCart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                <span className="text-orange-500">{firstWord}</span>
                {restWords && <span className="text-white"> {restWords}</span>}
              </h1>
              <p className="text-orange-300 text-[10px] sm:text-sm font-medium hidden sm:block">{config.storeSlogan}</p>
            </div>
          </div>
        </div>

        {/* Right: Cart Button */}
        <button
          onClick={onCartOpen}
          className="relative bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          title="Abrir carrinho"
        >
          <FiShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-black w-6 h-6 flex items-center justify-center rounded-full shadow-lg border-2 border-orange-500">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
