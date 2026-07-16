import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918428902102?text=Hi%20Kabil%20Crackers,%20I%20want%20to%20place%20an%20order."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 duration-300 z-50"
    >
      <FaWhatsapp size={32} />
    </a>
  );
}

export default WhatsAppButton;