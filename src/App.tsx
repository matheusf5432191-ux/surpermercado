import { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { WhatsAppButton } from './components/WhatsAppButton';
import { SideMenu } from './components/SideMenu';
import { useStore } from './hooks/useStore';
import { useCart } from './hooks/useCart';

export function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {
    products,
    config,
    addProduct,
    updateProduct,
    deleteProduct,
    updateConfig,
    resetToDefaults,
  } = useStore();

  const {
    items,
    isOpen,
    totalItems,
    totalPrice,
    canDeliver,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        config={config}
        cartCount={totalItems}
        onCartOpen={openCart}
        onMenuOpen={() => setShowMenu(true)}
      />
      <HeroBanner />

      <main className="flex-1">
        <ProductGrid products={products} onAddToCart={addToCart} />
      </main>

      <Footer config={config} />

      <WhatsAppButton whatsapp={config.whatsapp} />

      {/* Side Menu (Hamburger) */}
      <SideMenu
        isOpen={showMenu}
        config={config}
        onClose={() => setShowMenu(false)}
        onAdminAccess={() => setShowAdmin(true)}
      />

      {/* Cart Sidebar */}
      {isOpen && (
        <Cart
          items={items}
          totalItems={totalItems}
          totalPrice={totalPrice}
          canDeliver={canDeliver}
          config={config}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
          onClose={closeCart}
        />
      )}

      {/* Admin Panel */}
      {showAdmin && (
        <AdminPanel
          products={products}
          config={config}
          onAddProduct={addProduct}
          onUpdateProduct={updateProduct}
          onDeleteProduct={deleteProduct}
          onUpdateConfig={updateConfig}
          onReset={resetToDefaults}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
}
