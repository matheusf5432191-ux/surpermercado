import { FiTag, FiTruck, FiClock, FiPercent } from 'react-icons/fi';

export function HeroBanner() {
  return (
    <section>
      {/* Hero */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-600 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-4 py-1.5 mb-6">
            <FiTag className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-semibold">OFERTAS DO DIA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            <span className="text-orange-500">Supermercado</span> Caetano
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-orange-400 mb-4">
            Economia que voce merece!
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Confira nossas ofertas especiais atualizadas diariamente.
            Produtos frescos e de qualidade com os melhores precos.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FiTruck, text: 'Entrega Rapida' },
              { icon: FiTag, text: 'Precos Baixos' },
              { icon: FiClock, text: 'Ofertas Diarias' },
              { icon: FiPercent, text: 'Descontos Exclusivos' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center justify-center gap-2 text-white font-semibold text-sm">
                <Icon className="w-5 h-5" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
