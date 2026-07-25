import { useState } from "react";
import Hero from "../components/Hero";
import Products from "../components/Products";
import WhatsAppButton from "../components/WhatsAppButton";
import Offers from "../components/Offers";
import SearchBar from "../components/SearchBar";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  

  return (
    <>
      <Hero />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />


      <Products
        searchTerm={searchTerm}
        selectedCategory="All"
      />

      <Offers />
      <WhatsAppButton />
    </>
  );
}

export default Home;