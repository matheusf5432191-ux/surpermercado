import { useState } from 'react';
import {
  FiX, FiPlus, FiEdit2, FiTrash2, FiSave, FiImage,
  FiSettings, FiPackage, FiLogOut, FiRefreshCw, FiCheck,
  FiAlertTriangle, FiInstagram, FiFacebook
} from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import { Product, StoreConfig } from '../types';
import { categories } from '../data/defaults';

interface AdminPanelProps {
  products: Product[];
  config: StoreConfig;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateConfig: (config: StoreConfig) => void;
  onReset: () => void;
  onClose: () => void;
}

const emptyProduct: Product = {
  id: '',
  name: '',
  price: 0,
  oldPrice: undefined,
  category: 'Mercearia',
  image: '',
  unit: 'un',
  featured: false,
};

export function AdminPanel({
  products, config,
  onAddProduct, onUpdateProduct, onDeleteProduct,
  onUpdateConfig, onReset, onClose,
}: AdminPanelProps) {
  const [tab, setTab] = useState<'products' | 'config'>('products');
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [localConfig, setLocalConfig] = useState<StoreConfig>(config);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const showSaved = (msg: string) => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(''), 2000);
  };

  const handleStartNew = () => {
    const newProduct = { ...emptyProduct, id: Date.now().toString() };
    setEditing(newProduct);
    setIsNew(true);
    setImagePreview('');
  };

  const handleStartEdit = (product: Product) => {
    setEditing({ ...product });
    setIsNew(false);
    setImagePreview(product.image);
  };

  const handleSaveProduct = () => {
    if (!editing || !editing.name.trim()) return;
    if (isNew) {
      onAddProduct(editing);
      showSaved('Produto adicionado!');
    } else {
      onUpdateProduct(editing);
      showSaved('Produto atualizado!');
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setEditing({ ...editing, image: result });
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveConfig = () => {
    onUpdateConfig(localConfig);
    showSaved('Configuracoes salvas!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-black text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <FiSettings className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-bold">Painel Administrativo</h2>
          </div>
          <div className="flex items-center gap-2">
            {savedMsg && (
              <div className="flex items-center gap-1 text-green-400 text-sm animate-pulse">
                <FiCheck className="w-4 h-4" />
                <span>{savedMsg}</span>
              </div>
            )}
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b shrink-0">
          <button
            onClick={() => { setTab('products'); setEditing(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
              tab === 'products' ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiPackage className="w-4 h-4" />
            Produtos ({products.length})
          </button>
          <button
            onClick={() => { setTab('config'); setEditing(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
              tab === 'config' ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FiSettings className="w-4 h-4" />
            Configuracoes
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {tab === 'products' && !editing && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Lista de Produtos</h3>
                <button
                  onClick={handleStartNew}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                  Novo Produto
                </button>
              </div>

              <div className="space-y-2">
                {products.map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiImage className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.category} - R$ {p.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {p.featured && (
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">Destaque</span>
                      )}
                      <button
                        onClick={() => handleStartEdit(p)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowConfirmDelete(p.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {showConfirmDelete === p.id && (
                      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowConfirmDelete(null)}>
                        <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-red-100 rounded-full p-2">
                              <FiAlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <h4 className="font-bold text-gray-900">Excluir Produto</h4>
                          </div>
                          <p className="text-gray-600 text-sm mb-6">Tem certeza que deseja excluir "{p.name}"?</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowConfirmDelete(null)}
                              className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => { onDeleteProduct(p.id); setShowConfirmDelete(null); showSaved('Produto excluido!'); }}
                              className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-12">
                  <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400">Nenhum produto cadastrado.</p>
                </div>
              )}
            </div>
          )}

          {tab === 'products' && editing && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800">{isNew ? 'Novo Produto' : 'Editar Produto'}</h3>
                <button
                  onClick={() => { setEditing(null); setIsNew(false); }}
                  className="text-sm text-gray-500 hover:text-gray-700 font-semibold"
                >
                  Voltar
                </button>
              </div>

              <div className="space-y-4">
                {/* Image Preview */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiImage className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Imagem (URL)</label>
                  <input
                    type="text"
                    value={editing.image}
                    onChange={e => {
                      setEditing({ ...editing, image: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    placeholder="https://exemplo.com/imagem.jpg"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Ou enviar arquivo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFile}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do Produto</label>
                    <input
                      type="text"
                      value={editing.name}
                      onChange={e => setEditing({ ...editing, name: e.target.value })}
                      placeholder="Ex: Arroz Tipo 1 - 5kg"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
                    <select
                      value={editing.category}
                      onChange={e => setEditing({ ...editing, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                    >
                      {categories.filter(c => c !== 'Todos').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Preco (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editing.price || ''}
                      onChange={e => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })}
                      placeholder="0,00"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Preco Anterior (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editing.oldPrice || ''}
                      onChange={e => setEditing({ ...editing, oldPrice: parseFloat(e.target.value) || undefined })}
                      placeholder="Opcional"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Unidade</label>
                    <input
                      type="text"
                      value={editing.unit}
                      onChange={e => setEditing({ ...editing, unit: e.target.value })}
                      placeholder="Ex: kg, un, pacote"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={e => setEditing({ ...editing, featured: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">Produto em Destaque</span>
                </label>

                <button
                  onClick={handleSaveProduct}
                  disabled={!editing.name.trim() || editing.price <= 0}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-sm transition-colors"
                >
                  <FiSave className="w-4 h-4" />
                  {isNew ? 'Adicionar Produto' : 'Salvar Alteracoes'}
                </button>
              </div>
            </div>
          )}

          {tab === 'config' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 mb-4">Configuracoes da Loja</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nome da Loja</label>
                <input
                  type="text"
                  value={localConfig.storeName}
                  onChange={e => setLocalConfig({ ...localConfig, storeName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Slogan</label>
                <input
                  type="text"
                  value={localConfig.storeSlogan}
                  onChange={e => setLocalConfig({ ...localConfig, storeSlogan: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp (com DDD)</label>
                <input
                  type="text"
                  value={localConfig.whatsapp}
                  onChange={e => setLocalConfig({ ...localConfig, whatsapp: e.target.value })}
                  placeholder="5511999999999"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Endereco</label>
                <input
                  type="text"
                  value={localConfig.address}
                  onChange={e => setLocalConfig({ ...localConfig, address: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Senha do Admin</label>
                <input
                  type="text"
                  value={localConfig.adminPassword}
                  onChange={e => setLocalConfig({ ...localConfig, adminPassword: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <hr className="my-4" />
              <h3 className="font-bold text-gray-800 mb-4">Redes Sociais</h3>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                  <FiInstagram className="w-4 h-4 text-pink-500" />
                  Instagram
                </label>
                <input
                  type="text"
                  value={localConfig.instagram}
                  onChange={e => setLocalConfig({ ...localConfig, instagram: e.target.value })}
                  placeholder="@seuusuario ou link completo"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                  <FiFacebook className="w-4 h-4 text-blue-600" />
                  Facebook
                </label>
                <input
                  type="text"
                  value={localConfig.facebook}
                  onChange={e => setLocalConfig({ ...localConfig, facebook: e.target.value })}
                  placeholder="nomedapagina ou link completo"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
                  <FaTiktok className="w-4 h-4 text-gray-800" />
                  TikTok
                </label>
                <input
                  type="text"
                  value={localConfig.tiktok}
                  onChange={e => setLocalConfig({ ...localConfig, tiktok: e.target.value })}
                  placeholder="@seuusuario ou link completo"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>

              <button
                onClick={handleSaveConfig}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm transition-colors"
              >
                <FiSave className="w-4 h-4" />
                Salvar Configuracoes
              </button>

              <hr className="my-6" />

              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h4 className="font-bold text-red-700 text-sm mb-2 flex items-center gap-2">
                  <FiAlertTriangle className="w-4 h-4" />
                  Zona de Perigo
                </h4>
                <p className="text-red-600 text-xs mb-3">Isso ira restaurar todos os produtos e configuracoes para o padrao original.</p>
                {!showConfirmReset ? (
                  <button
                    onClick={() => setShowConfirmReset(true)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    <FiRefreshCw className="w-4 h-4" />
                    Restaurar Padrao
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowConfirmReset(false)}
                      className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => { onReset(); setShowConfirmReset(false); setLocalConfig(config); showSaved('Restaurado!'); }}
                      className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-semibold text-sm"
                    >
                      Confirmar Reset
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-3 flex justify-center shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-semibold transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  );
}
