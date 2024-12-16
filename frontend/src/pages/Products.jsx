// src/pages/Products.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from "axios";
import { motion } from 'framer-motion';
import { debounce } from 'lodash'; // Optional: For debouncing search input

const Products = () => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('Coffee');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // For error handling

  const navigate = useNavigate();

  const handleClick = (info) => {
    // Navigate to ProductDetail with the element information
    navigate("/productDetail", { state: { info } });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        duration: 0.5,
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  // Fetch all categories
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8800/category");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      }
    };
    fetchAllCategories();
  }, []);

  // Fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/product");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      }
    };
    fetchAllProducts();
  }, []);

  // Sort products by price initially (LowToHigh)
  useEffect(() => {
    const sorted = [...products].sort((a, b) => a.productPrice - b.productPrice);
    setProducts(sorted);
  }, [products.length]); // Trigger when products are fetched

  // Debounced Search Handler (Optional)
  const handleSearch = debounce((value) => {
    setSearch(value);
  }, 300);

  function sortProductsByPrice(e) {
    e.stopPropagation();
    const sortedProducts = [...products];
    if (e.target.value === "LowToHigh") {
      sortedProducts.sort((a, b) => a.productPrice - b.productPrice);
    } else if (e.target.value === "HighToLow") {
      sortedProducts.sort((a, b) => b.productPrice - a.productPrice);
    }
  }

  {/* Render all category tabs */}
  const categoryNav = categories.map(category => {
    return (
      <div
        key={category.id}
        className="bg-primary-bg min-w-40 p-3 text-white text-xl font-semibold text-center rounded-xl cursor-pointer"
        style={{...(activeTab === category.categoryName ? styles.activeTab : {})}}
        onClick={() => setActiveTab(category.categoryName)}
      >
        <img src="./assets/fruits.png" alt="Category" className="mb-3" />
        {category.categoryName}
      </div>
  );

  // Category Sections
  const categorySection = categories.map(category => (
    <div key={category.id} id={category.categoryName} className="mb-16">
      {activeTab === category.categoryName && (
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-800 border-b border-gray-300 pb-2">
            {category.categoryName} Menu
          </h2>
          
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            {/* Search Products */}
            <motion.div className="relative w-full md:w-1/2 xl:w-1/3" variants={itemVariants}>
              <input
                type="search"
                className="block w-full rounded-full border border-gray-300 px-5 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                placeholder="Search products..."
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24"
                  strokeWidth="1.5" stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M11.25 6.75a4.5 4.5 0 104.148 6.222.75.75 0 011.147-.664l3.6 3.6a.75.75 0 11-1.06 1.06l-3.6-3.6a.75.75 0 01-.664-1.147A4.5 4.5 0 0011.25 6.75z" />
                </svg>
              </div>
            </motion.div>

            {/* Sort Products by Price */}
            <motion.div className="flex items-center text-gray-700 text-sm font-medium" variants={itemVariants}>
              Sort by Price:
              <select
                className="mx-3 px-3 py-1 border border-gray-300 text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                name="price"
                id="price"
                onChange={sortProductsByPrice}
              >
                <option value="LowToHigh">Low to High</option>
                <option value="HighToLow">High to Low</option>
              </select>
            </motion.div>
          </div>

          {/* Products Grid */}
          <motion.div
            className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
            variants={containerVariants}
          >
            {products
              .filter(product => {
                return search.toLowerCase() === ''
                  ? product
                  : product.productName.toLowerCase().includes(search.toLowerCase());
              })
              .filter(product => product.categoryID === category.id)
              .map(product => (
                <motion.div
                  key={product.id}
                  className="group relative cursor-pointer"
                  onClick={() => handleClick({
                    id: product.id,
                    category: category.categoryName,
                    name: product.productName,
                    desc: product.productDesc,
                    price: product.productPrice,
                    image: product.productImage
                  })}
                  variants={itemVariants}
                  whileHover="hover"
                >
                  {/* Product Image */}
                  <motion.div
                    className="overflow-hidden rounded-lg shadow-lg"
                    variants={hoverVariants}
                  >
                    <img
                      alt={`${product.productName} Image`}
                      src={`/assets/${product.productImage}`} // Use absolute path
                      className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Best Selling Badge */}
                  {product.bestSelling && 
                    <motion.div
                      className="absolute top-3 right-3 px-3 py-1 bg-purple-700 text-white text-sm rounded-full shadow-md"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      Best Selling
                    </motion.div>
                  }

                  {/* Product Info */}
                  <motion.div
                    className="mt-4 flex flex-col gap-1"
                    variants={itemVariants}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-500 transition-colors">
                      {product.productName}
                    </h3>
                    <p className="text-gray-600">{`$${product.productPrice.toFixed(2)}`}</p>
                  </motion.div>
                </motion.div>
              ))
            }
          </motion.div>
        </motion.div>
      )}
    </div>
  ));

  return (
    <>
      {/* Navbar */}
      <Navbar isMenu={true} isContact={false} isAbout={false} />

      {/* Hero / Banner */}
      <div
        className="relative bg-gradient-to-tr from-purple-100 via-pink-50 to-white py-20 px-8 md:px-16 overflow-hidden"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative Background Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -inset-x-1/2 -top-40 h-[50rem] w-[100rem] rotate-[30deg] bg-gradient-to-tr from-purple-200 to-pink-200 opacity-30 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-5">
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore Our Finest Selection of Drinks
            </h1>
            <p
              className="text-gray-700 text-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Discover unique flavors, best sellers, and new arrivals at unbeatable prices. Enjoy a world of taste at your fingertips.
            </p>
          </div>

          <div className="flex items-center gap-6 md:gap-8">
            {/* Search Icon */}
            <button
              className="flex items-center justify-center h-12 w-12 rounded-full border border-gray-300 hover:border-purple-400 hover:text-purple-600 transition-colors"
              aria-label="Search Products"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-600"
                fill="none" viewBox="0 0 24 24"
                strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M11.25 6.75a4.5 4.5 0 104.148 6.222.75.75 0 011.147-.664l3.6 3.6a.75.75 0 11-1.06 1.06l-3.6-3.6a.75.75 0 01-.664-1.147A4.5 4.5 0 0011.25 6.75z" />
              </svg>
            </button>
            {/* Cart Icon */}
            <button
              className="flex items-center justify-center h-12 w-12 rounded-full border border-gray-300 hover:border-purple-400 hover:text-purple-600 transition-colors relative"
              aria-label="View Cart"
              onClick={() => navigate("/checkout")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src="/assets/cart.png" alt="Cart" className='w-6 h-6' /> {/* Use absolute path */}
              {products.reduce((acc, product) => acc + product.quantity, 0) > 0 && (
                <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center'>
                  {products.reduce((acc, product) => acc + product.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white font-poppins">
        <div className="mx-auto max-w-2xl min-h-screen px-4 py-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">          
          {/* Category Tabs */}
          <h2 className="text-2xl font-bold tracking-tight text-primary-text mb-5">Categories</h2>
          <div className="flex gap-x-6 mb-10 overflow-x-scroll">
            {categoryNav}
          </div>

          {/* Products of a Category */}
          {categorySection}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default Products;
