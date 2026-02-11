import { FiMessageCircle } from 'react-icons/fi';

interface WhatsAppButtonProps {
  whatsapp: string;
}

export function WhatsAppButton({ whatsapp }: WhatsAppButtonProps) {
  return (
    <a
      href={`https://wa.me/${whatsapp}?text=Ola! Gostaria de saber mais sobre as ofertas.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-30 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
      title="Fale conosco pelo WhatsApp"
    >
      <FiMessageCircle className="w-7 h-7" />
    </a>
  );
}
