import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
  const exists = wishlistItems.find(
    (item) => item.id === product.id
  );
  

  if (exists) {

    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== product.id)
    );

    toast.info("💔 Removed from Wishlist", {
      toastId: "wishlist-remove",
      autoClose: 2000,
    });

  } else {

    setWishlistItems((prev) => [...prev, product]);

    toast.success("❤️ Added to Wishlist!", {
      toastId: "wishlist-add",
      autoClose: 2000,
    });
  

  }
};
const removeFromWishlist = (id) => {
  setWishlistItems((prev) =>
    prev.filter((item) => item.id !== id)
  );
};
  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}