import { SHOP } from "../config/shopConfig";

function Contact() {
  return (
    <div className="min-h-screen bg-blue-950 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-10">
          📞 Contact Us
        </h1>

        <div className="bg-blue-900 rounded-2xl p-8 shadow-xl">

          <h2 className="text-3xl font-bold text-yellow-300 mb-6">
            {SHOP.name}
          </h2>

          <div className="space-y-5 text-lg">

            <p>
              📞 <strong>Mobile 1:</strong> {SHOP.phones[0]}
            </p>

            <p>
              📱 <strong>Mobile 2:</strong> {SHOP.phones[1]}
            </p>

            <p>
              💬 <strong>WhatsApp:</strong> {SHOP.whatsapp}
            </p>

            <p>
              📧 <strong>Email:</strong> {SHOP.email}
            </p>

            <p>
              📍 <strong>Address:</strong><br />
              {SHOP.address.line1}<br />
              {SHOP.address.area}<br />
              {SHOP.address.city}<br />
              {SHOP.address.state} - {SHOP.address.pincode}
            </p>

            <p>
              🕒 <strong>Working Hours:</strong><br />
              {SHOP.workingHours}
            </p>

            <a
              href={SHOP.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-pink-600 hover:bg-pink-500 px-6 py-3 rounded-xl font-bold transition"
            >
              📷 Follow us on Instagram
            </a>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Contact;