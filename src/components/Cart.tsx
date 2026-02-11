import { useState } from 'react';
import {
  FiX, FiPlus, FiMinus, FiTrash2, FiShoppingCart,
  FiTruck, FiHome, FiAlertCircle, FiImage,
  FiCheckCircle, FiArrowLeft, FiSend, FiUser, FiMapPin, FiPhone,
} from 'react-icons/fi';
import { CartItem, StoreConfig } from '../types';

interface CartProps {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  canDeliver: boolean;
  config: StoreConfig;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
  onClose: () => void;
}

type Step = 'cart' | 'checkout';
type DeliveryMode = 'pickup' | 'delivery';

const MIN_DELIVERY = 160;

export function Cart({
  items, totalItems, totalPrice, canDeliver, config,
  onUpdateQuantity, onRemove, onClear, onClose,
}: CartProps) {
  const [step, setStep] = useState<Step>('cart');
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderSent, setOrderSent] = useState(false);

  const formatPrice = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;
  const remaining = MIN_DELIVERY - totalPrice;

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    setStep('checkout');
  };

  const buildWhatsAppMessage = () => {
    let msg = `*Pedido - ${config.storeName}*\n\n`;
    msg += `*Cliente:* ${customerName}\n`;
    msg += `*Telefone:* ${customerPhone}\n`;
    if (deliveryMode === 'delivery') {
      msg += `*Entrega em:* ${customerAddress}\n`;
    } else {
      msg += `*Retirada no local*\n`;
    }
    msg += `\n---\n*Itens do pedido:*\n\n`;

    items.forEach((item, i) => {
      const subtotal = item.product.price * item.quantity;
      msg += `${i + 1}. ${item.product.name}\n`;
      msg += `   ${item.quantity}x ${formatPrice(item.product.price)} = ${formatPrice(subtotal)}\n\n`;
    });

    msg += `---\n`;
    msg += `*Total: ${formatPrice(totalPrice)}*\n`;
    msg += `*Modalidade: ${deliveryMode === 'delivery' ? 'Entrega' : 'Retirada'}*\n`;

    return msg;
  };

  const handleSendOrder = () => {
    if (!customerName.trim() || !customerPhone.trim()) return;
    if (deliveryMode === 'delivery' && !customerAddress.trim()) return;

    const message = buildWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${config.whatsapp}?text=${encoded}`;

    window.open(url, '_blank');
    setOrderSent(true);
  };

  const handleFinish = () => {
    onClear();
    setOrderSent(false);
    setStep('cart');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setDeliveryMode('pickup');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Sidebar */}
      <div className="relative w-full max-w-md bg-white flex flex-col shadow-2xl h-full">
        {/* Header */}
        <div className="bg-black text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <FiShoppingCart className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-bold">
              {step === 'cart' ? 'Meu Carrinho' : orderSent ? 'Pedido Enviado' : 'Finalizar Pedido'}
            </h2>
            {step === 'cart' && totalItems > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* ========= STEP: CART ========= */}
        {step === 'cart' && (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <FiShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-semibold text-lg">Carrinho vazio</p>
                  <p className="text-gray-400 text-sm mt-1">Adicione produtos para comecar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                      {/* Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                        {item.product.image ? (
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FiImage className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{item.product.name}</p>
                        <p className="text-orange-600 font-bold text-sm mt-0.5">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                          >
                            <FiMinus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-lg transition-colors"
                          >
                            <FiPlus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal + Remove */}
                      <div className="flex flex-col items-end justify-between shrink-0">
                        <button
                          onClick={() => onRemove(item.product.id)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                        <p className="text-sm font-bold text-gray-800">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t shrink-0 p-4 space-y-3">
                {/* Delivery info banner */}
                {canDeliver ? (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                    <FiTruck className="w-5 h-5 text-green-600 shrink-0" />
                    <p className="text-green-700 text-xs font-semibold">
                      Voce ja pode escolher entrega!
                    </p>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5">
                    <FiAlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-orange-700 text-xs font-semibold">
                        Faltam {formatPrice(remaining)} para liberar entrega
                      </p>
                      <p className="text-orange-500 text-xs mt-0.5">
                        Pedido minimo para entrega: {formatPrice(MIN_DELIVERY)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-semibold">Total:</span>
                  <span className="text-2xl font-black text-orange-600">{formatPrice(totalPrice)}</span>
                </div>

                {/* Clear and Checkout buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={onClear}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-semibold text-sm transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Limpar
                  </button>
                  <button
                    onClick={handleProceedToCheckout}
                    className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm transition-colors"
                  >
                    <FiCheckCircle className="w-4 h-4" />
                    Finalizar Compra
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ========= STEP: CHECKOUT ========= */}
        {step === 'checkout' && !orderSent && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Back button */}
              <button
                onClick={() => setStep('cart')}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-semibold transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                Voltar ao carrinho
              </button>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 text-sm mb-3">Resumo do Pedido</h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 truncate flex-1 mr-2">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="text-gray-800 font-semibold shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-3 pt-3 flex items-center justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-black text-orange-600 text-lg">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              {/* Delivery Mode */}
              <div>
                <h3 className="font-bold text-gray-800 text-sm mb-3">Modalidade</h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Pickup always available */}
                  <button
                    onClick={() => setDeliveryMode('pickup')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      deliveryMode === 'pickup'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <FiHome className={`w-6 h-6 ${deliveryMode === 'pickup' ? 'text-orange-500' : 'text-gray-400'}`} />
                    <span className={`text-sm font-bold ${deliveryMode === 'pickup' ? 'text-orange-600' : 'text-gray-600'}`}>
                      Retirada
                    </span>
                    <span className="text-xs text-gray-400">No local</span>
                  </button>

                  {/* Delivery - only if >= R$160 */}
                  <button
                    onClick={() => canDeliver && setDeliveryMode('delivery')}
                    disabled={!canDeliver}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all relative ${
                      !canDeliver
                        ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
                        : deliveryMode === 'delivery'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <FiTruck className={`w-6 h-6 ${
                      !canDeliver ? 'text-gray-300' : deliveryMode === 'delivery' ? 'text-orange-500' : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-bold ${
                      !canDeliver ? 'text-gray-400' : deliveryMode === 'delivery' ? 'text-orange-600' : 'text-gray-600'
                    }`}>
                      Entrega
                    </span>
                    {canDeliver ? (
                      <span className="text-xs text-gray-400">No endereco</span>
                    ) : (
                      <span className="text-xs text-red-400 font-semibold">Min. {formatPrice(MIN_DELIVERY)}</span>
                    )}
                  </button>
                </div>

                {!canDeliver && (
                  <div className="flex items-start gap-2 mt-3 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5">
                    <FiAlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-orange-700 text-xs">
                      Para entrega, o pedido minimo e de <strong>{formatPrice(MIN_DELIVERY)}</strong>. Faltam <strong>{formatPrice(remaining)}</strong>. Voce pode selecionar <strong>Retirada</strong> no local.
                    </p>
                  </div>
                )}
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="font-bold text-gray-800 text-sm mb-3">Seus Dados</h3>
                <div className="space-y-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
                      <FiUser className="w-3.5 h-3.5" />
                      Nome
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="Seu nome completo"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
                      <FiPhone className="w-3.5 h-3.5" />
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>

                  {deliveryMode === 'delivery' && (
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
                        <FiMapPin className="w-3.5 h-3.5" />
                        Endereco de Entrega
                      </label>
                      <textarea
                        value={customerAddress}
                        onChange={e => setCustomerAddress(e.target.value)}
                        placeholder="Rua, numero, bairro, complemento..."
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Send button */}
            <div className="border-t shrink-0 p-4">
              <button
                onClick={handleSendOrder}
                disabled={
                  !customerName.trim() ||
                  !customerPhone.trim() ||
                  (deliveryMode === 'delivery' && !customerAddress.trim())
                }
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm transition-colors"
              >
                <FiSend className="w-4 h-4" />
                Enviar Pedido via WhatsApp
              </button>
            </div>
          </>
        )}

        {/* ========= ORDER SENT ========= */}
        {step === 'checkout' && orderSent && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-green-100 rounded-full p-5 mb-6">
              <FiCheckCircle className="w-14 h-14 text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Pedido Enviado!</h3>
            <p className="text-gray-500 text-sm mb-2">
              Seu pedido foi enviado para o WhatsApp do {config.storeName}.
            </p>
            <p className="text-gray-400 text-xs mb-8">
              Aguarde a confirmacao pelo WhatsApp.
            </p>
            <button
              onClick={handleFinish}
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors"
            >
              <FiCheckCircle className="w-4 h-4" />
              Concluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
