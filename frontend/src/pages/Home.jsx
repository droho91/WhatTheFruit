// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { motion } from 'framer-motion'; // Import Framer Motion

const Home = () => {
  const navigations = [
    { name: 'Menu', href: '/products' },
    { name: 'Contact', href: '/contact' },
    { name: 'About Us', href: '/about' }, // Updated href
  ];

  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8800")
      .then(res => {
        if (res.data.status === "Successful") {
          setAuth(true);
          setUsername(res.data.name);
        } else {
          setAuth(false);
          // Optional: Provide more descriptive error messages
          console.error("Authentication failed:", res.data.message);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogOut = () => {
    axios.get("http://localhost:8800/logout")
      .then(res => {
        location.reload(true);
      }).catch(err => console.log(err));
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3 
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="font-poppins relative bg-white overflow-x-hidden">
      {/* Header */}
      <header className="relative z-10">
        <nav className="flex items-center justify-between px-10 py-6 fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
          {/* Logo */}
          <div className="flex flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-3">
              <img
                  alt="Fruit House Logo"
                  src="./assets/mangosteen.png"
                  className="h-8 w-auto"
              />
              <p className="text-xl font-bold text-purple-700">FRUIT HOUSE</p>
            </a>
          </div>

          {/* Navigation */}
          <div className="flex gap-x-12">
            {navigations.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900 hover:text-purple-400 transition-colors">
                {item.name}
              </a>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {auth ? (
              <div className="flex items-center justify-center gap-3">
                <p className="text-lg font-medium text-gray-700">{username}</p>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-200">
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt="User Profile"
                        src="./assets/pfp.jpg"
                        className="h-8 w-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                  >
                    <MenuItem>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <div
                        onClick={handleLogOut}
                        className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Log Out
                      </div>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            ) : (
              <a href="/login" className="text-sm font-semibold text-gray-900 hover:text-purple-500 transition">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.div
        className="relative pt-28 pb-16 bg-gradient-to-tr from-purple-50 via-pink-50 to-purple-100 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Decorative Background Shapes */}
        <div className="absolute inset-0 -z-10 flex justify-center overflow-hidden">
          <div className="w-[120rem] flex-none">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-02.jpg"
              alt="Decorative Background"
              className="absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-1/2 blur-3xl opacity-50"
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-8">
          <motion.section
            className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0"
            variants={containerVariants}
          >
            {/* Left Section */}
            <motion.div
              className="md:w-1/2"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h1 className="text-purple-800 text-6xl font-extrabold leading-tight">
                Drinks from the <span className="text-purple-500">Homeland</span>
              </h1>
              <p className="text-gray-700 mt-6 text-lg max-w-lg">
                Indulge in nature's finest with our premium selection of fresh drinks,
                delivering exceptional taste and sweetness. Crafted with passion and sourced locally.
              </p>
              <button className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition transform hover:scale-105">
                <a href="/products">Visit the Menu</a>
              </button>
            </motion.div>

            {/* Right Section */}
            <motion.div
              className="md:w-1/2 relative"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="rounded-full bg-white/50 p-4 shadow-lg">
                <img
                  src="./assets/home.png"
                  alt="Coffee Cup"
                  className="w-full rounded-lg"
                />
              </div>
            </motion.div>
          </motion.section>
        </div>
      </motion.div>

      {/* Categories Section */}
      <motion.div
        className="mx-auto max-w-7xl px-8 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          className="text-purple-800 text-5xl font-bold text-center mb-14"
          variants={itemVariants}
        >
          Visit the Categories
        </motion.h2>

        <motion.div className="space-y-20" variants={containerVariants}>
          {/* Coffee Category */}
          <motion.section
            className="flex flex-col md:flex-row items-center justify-between gap-10 px-8"
            variants={itemVariants}
          >
            <div className="md:w-1/2 order-2 md:order-1">
              <h3 className="text-purple-800 text-5xl font-bold mb-4">
                Coffee
              </h3>
              <p className="text-gray-700 text-lg max-w-md">
                A popular beverage made from roasted coffee beans, our coffee selection features rich aromas and smooth flavors that awaken your senses.
              </p>
              <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition transform hover:scale-105">
                <a href="/products">Visit the Menu</a>
              </button>
            </div>
            <div className="md:w-1/2 order-1 md:order-2 relative">
              <motion.div
                className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src='./assets/cappuccino.png'
                  alt="Cappuccino"
                  className="w-full"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.section>

          {/* Tea Category */}
          <motion.section
            className="flex flex-col md:flex-row items-center justify-between gap-10 px-8"
            variants={itemVariants}
          >
            <div className="md:w-1/2 relative">
              <motion.div
                className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src='./assets/peach.png'
                  alt="Peach Tea"
                  className="w-full"
                  loading="lazy"
                />
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-purple-800 text-5xl font-bold mb-4">
                Tea
              </h3>
              <p className="text-gray-700 text-lg max-w-md">
                Experience the soothing embrace of our tea collection, infused with delicate flavors and natural goodness.
              </p>
              <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition transform hover:scale-105">
                <a href="/products">Visit the Menu</a>
              </button>
            </div>
          </motion.section>
        </motion.div>
      </motion.div>

      {/* About Section */}
      <motion.div
        className="mx-auto max-w-7xl px-8 py-20 bg-gradient-to-tr from-purple-100 to-pink-100"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          className="text-purple-800 text-5xl font-bold m-auto text-center mb-14"
          variants={itemVariants}
        >
          About Us
        </motion.h2>
        <motion.section
          className="flex flex-col md:flex-row items-center justify-between px-8 gap-10"
          variants={itemVariants}
        >
          <div className="md:w-1/2">
            <h3 className="text-purple-800 text-5xl font-bold mb-4">
              Our House
            </h3>
            <p className="text-gray-700 mt-4 text-lg max-w-md">
              Discover the story behind our brand. Our house is filled with handcrafted beverages, carefully selected ingredients, and a dedication to quality.
            </p>
            <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition transform hover:scale-105">
              <a href="/about">Find Out</a> {/* Updated link */}
            </button>
          </div>
          <div className="md:w-1/2 relative">
            <motion.div
              className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src='./assets/coffeeShop.jpg'
                alt="Our Coffee Shop"
                className="w-full"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.section>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Home;
