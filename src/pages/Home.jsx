import { useState } from "react";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Categories from "../components/Categories";
import WhatsAppButton from "../components/WhatsAppButton";
import Offers from "../components/Offers";
import SearchBar from "../components/SearchBar";


function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <>
      
      <Hero />
      <SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>
      <Categories
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
/>
      <Offers />
      <WhatsAppButton />
    </>
  );
}

export default Home;