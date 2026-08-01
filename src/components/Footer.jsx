import { SHOP } from "../config/shopConfig";

function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-yellow-400">
          🎆 {SHOP.name}
        </h2>

        <p className="mt-4 text-gray-300">
          Premium Sivakasi Fireworks
        </p> 

        <div className="mt-8 space-y-2">

          <p>📞 {SHOP.phones[0]}</p>

          <p>📱 {SHOP.phones[1]}</p>

          <p>💬 WhatsApp: {SHOP.whatsapp}</p>

          <p>📧 {SHOP.email}</p>

          <p>
            📍 {SHOP.address.line1},{" "}
            {SHOP.address.area},{" "}
            {SHOP.address.city},{" "}
            {SHOP.address.state} - {SHOP.address.pincode}
          </p>

          <p>🕒 {SHOP.workingHours}</p>

          <a
            href={SHOP.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-pink-600 hover:bg-pink-500 px-5 py-2 rounded-lg font-semibold transition"
          >
            📷 Follow us on Instagram
          </a>

        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-gray-400">
          © {new Date().getFullYear()} {SHOP.name}. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;