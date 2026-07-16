import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-black flex items-center justify-center">
      <div className="text-center px-6">

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <img
            src="/images/logo/logo.jpeg"
            alt="Kabil Crackers Logo"
            className="w-72 md:w-96 object-contain mb-8"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 font-medium"
        >
          Premium Sivakasi Fireworks for Every Celebration 🎆
        </motion.p>

        <div className="mt-10 flex justify-center gap-5 flex-wrap">
          <button className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 duration-300">
            Shop Now
          </button>

          <button className="border border-yellow-400 text-yellow-400 px-8 py-4 rounded-xl hover:bg-yellow-400 hover:text-black duration-300">
            Download Catalog
          </button>
        </div>

      </div>
    </section>
  );
}

export default Hero;