import { FaWhatsapp } from "react-icons/fa";

function FloatingWhatsApp() {
  const phoneNumber = "918428902102";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce"
    >
      <FaWhatsapp className="text-white text-4xl" />
    </a>
  );
}

export default FloatingWhatsApp;