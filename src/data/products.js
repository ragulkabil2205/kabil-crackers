export const GLOBAL_DISCOUNT = 90;

const products = [
  {
    id: 1,
    name: "240 Sky Shots",
    category: "Sky Shots",

    originalPrice: 29990,
    price: 2999,

    featured: true,
    bestseller: true,
    inStock: true,

    rating: 4.9,
    reviews: 284,

    image: "/images/products/240-shots.jpg",

    images: [
  "/images/products/240-shots.jpg",
  "/images/products/240-shots.jpg",
  "/images/products/240-shots.jpg",
  "/images/products/240-shots.jpg",
],
  reviewsData: [
  {
    id: 1,
    name: "Arun Kumar",
    rating: 5,
    date: "10 Jul 2026",
    review:
      "Excellent quality crackers. Super sound and colorful effects. Delivery was on time.",
  },]
  
  },

  {
    id: 2,
    name: "Flower Pots",
    category: "Fancy",

    originalPrice: 2500,
    price: 250,

    featured: true,
    bestseller: true,
    inStock: true,

    rating: 4.8,
    reviews: 197,

    image: "/images/products/flower-pot.jpg",

    images: [
  "/images/products/240-shots.jpg",
  "/images/products/240-shots.jpg",
  "/images/products/240-shots.jpg",
  "/images/products/240-shots.jpg",
],
reviewsData: [
  {
    id: 1,
    name: "Arun Kumar",
    rating: 5,
    date: "10 Jul 2026",
    review:
      "Excellent quality crackers. Super sound and colorful effects. Delivery was on time.",
  },]
  },

  {
    id: 3,
    name: "Chitti",
    category: "Bijili",

    originalPrice: 1800,
    price: 180,

    featured: false,
    bestseller: false,
    inStock: true,

    rating: 4.7,
    reviews: 146,

    image: "/images/products/chitti.jpg",

    images: [
  "/images/products/240-shots.jpg",
  "/images/products/240-shots.jpg",
  "/images/products/240-shots.jpg",
  "/images/products/240-shots.jpg",
],
reviewsData: [
  {
    id: 1,
    name: "Arun Kumar",
    rating: 5,
    date: "10 Jul 2026",
    review:
      "Excellent quality crackers. Super sound and colorful effects. Delivery was on time.",
  },]
  },

  {
    id: 4,
    name: "Colour Koti",
    category: "Fancy",

    originalPrice: 3500,
    price: 350,

    featured: true,
    bestseller: true,
    inStock: false,

    rating: 4.9,
    reviews: 223,

    image: "/images/products/colour-koti.jpg",

    images: [
  "/images/products/240-shots.jpg",
  "/images/products/240-shots.jpg",
  "/images/products/240-shots.jpg",
  "/images/products/240-shots.jpg",
],
reviewsData: [
  {
    id: 1,
    name: "Arun Kumar",
    rating: 5,
    date: "10 Jul 2026",
    review:
      "Excellent quality crackers. Super sound and colorful effects. Delivery was on time.",
  },]

  },
];

export default products;