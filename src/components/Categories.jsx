import {
  FaRocket,
  FaGift,
  FaBomb,
  FaStar,
} from "react-icons/fa";

const categories = [
  { name: "All", icon: <FaStar /> },
  { name: "Sky Shots", icon: <FaRocket /> },
  { name: "Fancy", icon: <FaGift /> },
  { name: "Bijili", icon: <FaBomb /> },
];

function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
          🎆 Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`rounded-2xl p-8 text-center cursor-pointer duration-300 ${
                selectedCategory === cat.name
                  ? "bg-yellow-400 text-black"
                  : "bg-blue-900 text-white hover:bg-yellow-400 hover:text-black"
              }`}
            >
              <div className="text-5xl mb-4 flex justify-center">
                {cat.icon}
              </div>

              <h3 className="font-bold text-lg">
                {cat.name}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;