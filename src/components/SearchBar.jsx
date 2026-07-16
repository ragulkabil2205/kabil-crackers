import { FaSearch } from "react-icons/fa";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-lg">

       <input
  type="text"
  placeholder="Search Crackers..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="w-full px-5 py-4 outline-none text-black"
/>

        <button className="bg-yellow-400 px-6 py-4 hover:bg-yellow-300">
          <FaSearch className="text-black text-xl" />
        </button>

      </div>
    </div>
  );
}

export default SearchBar;