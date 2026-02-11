import { useState } from 'react';
import {
  FiX, FiShoppingBag, FiMapPin, FiPhone, FiClock,
  FiInstagram, FiFacebook, FiInfo, FiMail, FiStar,
  FiTruck, FiPercent, FiLock, FiArrowRight, FiShield,
  FiChevronRight, FiHeart, FiTag, FiHome,
} from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import { StoreConfig } from '../types';

interface SideMenuProps {
  isOpen: boolean;
  config: StoreConfig;
  onClose: () => void;
  onAdminAccess: () => void;
}

export function SideMenu({ isOpen, config, onClose, onAdminAccess }: SideMenuProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const nameParts = config.storeName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  const handleLogin = () => {
    if (password === config.adminPassword) {
      setShowLogin(false);
      setPassword('');
      setError(false);
      onClose();
      onAdminAccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  const scrollToProducts = () => {
    onClose();
    const el = document.getElementById('produtos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasSocials = config.instagram || config.facebook || config.tiktok;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Menu Panel */}
      <div className="relative w-80 max-w-[85vw] bg-black flex flex-col h-full shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-5 pb-4 border-b border-gray-800 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 rounded-xl p-2">
                <FiShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white leading-tight">
                  <span className="text-orange-500">{firstWord}</span>
                  {restWords && <span> {restWords}</span>}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <p className="text-orange-400/80 text-xs font-medium">{config.storeSlogan}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* Navigation */}
          <div className="p-4">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 px-1">Navegacao</p>
            <nav className="space-y-1">
              <button
                onClick={scrollToTop}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all group"
              >
                <FiHome className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold flex-1 text-left">Inicio</span>
                <FiChevronRight className="w-4 h-4 text-gray-700 group-hover:text-orange-500 transition-colors" />
              </button>

              <button
                onClick={scrollToProducts}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all group"
              >
                <FiTag className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold flex-1 text-left">Produtos</span>
                <FiChevronRight className="w-4 h-4 text-gray-700 group-hover:text-orange-500 transition-colors" />
              </button>

              <button
                onClick={scrollToProducts}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all group"
              >
                <FiStar className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold flex-1 text-left">Ofertas do Dia</span>
                <FiChevronRight className="w-4 h-4 text-gray-700 group-hover:text-orange-500 transition-colors" />
              </button>
            </nav>
          </div>

          {/* Destaques */}
          <div className="px-4 pb-4">
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiPercent className="w-5 h-5 text-white" />
                <p className="text-white font-bold text-sm">Ofertas Especiais</p>
              </div>
              <p className="text-orange-100 text-xs leading-relaxed">
                Confira nossas ofertas atualizadas diariamente. Economia de verdade para sua familia!
              </p>
            </div>
          </div>

          {/* Info da Loja */}
          <div className="p-4 border-t border-gray-800/60">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 px-1">Informacoes</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 px-1">
                <FiMapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-xs leading-relaxed">{config.address}</span>
              </div>
              <div className="flex items-center gap-3 px-1">
                <FiPhone className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-gray-400 text-xs">
                  {config.whatsapp.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')}
                </span>
              </div>
              <div className="flex items-center gap-3 px-1">
                <FiClock className="w-4 h-4 text-orange-500 shrink-0" />
                <div className="text-gray-400 text-xs">
                  <p>Seg a Sab: 7h - 22h</p>
                  <p>Dom e Feriados: 8h - 20h</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-1">
                <FiTruck className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="text-gray-400 text-xs">Entrega a partir de R$ 160,00</span>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          {hasSocials && (
            <div className="p-4 border-t border-gray-800/60">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 px-1">Redes Sociais</p>
              <div className="flex gap-3 px-1">
                {config.instagram && (
                  <a
                    href={config.instagram.startsWith('http') ? config.instagram : `https://instagram.com/${config.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl hover:scale-110 transition-transform shadow-lg"
                    title="Instagram"
                  >
                    <FiInstagram className="w-5 h-5 text-white" />
                  </a>
                )}
                {config.facebook && (
                  <a
                    href={config.facebook.startsWith('http') ? config.facebook : `https://facebook.com/${config.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 bg-blue-600 rounded-xl hover:scale-110 transition-transform shadow-lg"
                    title="Facebook"
                  >
                    <FiFacebook className="w-5 h-5 text-white" />
                  </a>
                )}
                {config.tiktok && (
                  <a
                    href={config.tiktok.startsWith('http') ? config.tiktok : `https://tiktok.com/@${config.tiktok.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 bg-gray-900 border border-gray-700 rounded-xl hover:scale-110 transition-transform shadow-lg"
                    title="TikTok"
                  >
                    <FaTiktok className="w-5 h-5 text-white" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Contato */}
          <div className="p-4 border-t border-gray-800/60">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 px-1">Fale Conosco</p>
            <a
              href={`https://wa.me/${config.whatsapp}?text=Ola! Gostaria de saber mais sobre as ofertas.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-3 rounded-xl bg-green-600/20 hover:bg-green-600/30 text-green-400 transition-all group"
            >
              <FiMail className="w-5 h-5" />
              <span className="text-sm font-semibold flex-1">WhatsApp</span>
              <FiChevronRight className="w-4 h-4 text-green-700 group-hover:text-green-400 transition-colors" />
            </a>
          </div>

          {/* Sobre */}
          <div className="p-4 border-t border-gray-800/60">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 px-1">Sobre</p>
            <div className="flex items-start gap-3 px-1 mb-3">
              <FiInfo className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-gray-500 text-xs leading-relaxed">
                O {config.storeName} oferece produtos frescos e de qualidade com os melhores precos.
                Trabalhamos todos os dias para levar economia e variedade ate voce.
              </p>
            </div>
            <div className="flex items-start gap-3 px-1">
              <FiHeart className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-gray-500 text-xs leading-relaxed">
                Sua satisfacao e nossa prioridade. Venha nos visitar!
              </p>
            </div>
          </div>

        </div>

        {/* Footer - Admin Access Hidden */}
        <div className="shrink-0 border-t border-gray-800 p-4">
          {!showLogin ? (
            <button
              onClick={() => setShowLogin(true)}
              className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-gray-500 transition-colors py-2"
              title="Area restrita"
            >
              <FiShield className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium">Area Restrita</span>
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <FiLock className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-gray-400 text-xs font-semibold">Acesso ADM</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Senha"
                  autoFocus
                  className={`flex-1 bg-gray-900 border rounded-lg px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-orange-500 ${
                    error ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                <button
                  onClick={handleLogin}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-xs">Senha incorreta.</p>
              )}
              <button
                onClick={() => { setShowLogin(false); setPassword(''); setError(false); }}
                className="text-gray-600 text-xs hover:text-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
