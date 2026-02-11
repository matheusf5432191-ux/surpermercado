import { FiMapPin, FiPhone, FiClock, FiShoppingCart, FiInstagram, FiFacebook } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import { StoreConfig } from '../types';

interface FooterProps {
  config: StoreConfig;
}

export function Footer({ config }: FooterProps) {
  const nameParts = config.storeName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  const hasSocials = config.instagram || config.facebook || config.tiktok;

  return (
    <footer className="bg-black text-white mt-12">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-orange-500 rounded-lg p-2">
                <FiShoppingCart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">
                <span className="text-orange-500">{firstWord}</span>
                {restWords && <span> {restWords}</span>}
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {config.storeSlogan} Venha nos visitar e aproveite as melhores ofertas
              todos os dias.
            </p>

            {/* Redes Sociais */}
            {hasSocials && (
              <div className="flex gap-3 mt-5">
                {config.instagram && (
                  <a
                    href={config.instagram.startsWith('http') ? config.instagram : `https://instagram.com/${config.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 rounded-lg transition-all hover:scale-110"
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
                    className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg transition-all hover:scale-110"
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
                    className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-900 border border-gray-700 rounded-lg transition-all hover:scale-110"
                    title="TikTok"
                  >
                    <FaTiktok className="w-4 h-4 text-white" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-orange-500 font-bold mb-4 text-sm uppercase tracking-wider">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiMapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{config.address}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiPhone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{config.whatsapp.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-orange-500 font-bold mb-4 text-sm uppercase tracking-wider">Horario</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiClock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Seg a Sab: 7h - 22h</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FiClock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Dom e Feriados: 8h - 20h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            {new Date().getFullYear()} {config.storeName}. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-xs">Ofertas validas enquanto durarem os estoques.</p>
        </div>
      </div>
    </footer>
  );
}
