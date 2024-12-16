// src/pages/AboutUs.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const AboutUs = () => {
  // Define animation variants for staggered children
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
    <>
      {/* Helmet for SEO and meta tags */}
      <Helmet>
        <title>About Us | FruityDelights</title>
        <meta name="description" content="Learn more about FruityDelights, our mission, vision, and the team behind our success." />
        {/* Add more meta tags as needed */}
      </Helmet>

      <Navbar isMenu={false} isContact={false} isAbout={true} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-bg text-white py-20">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-2xl">
            Discover our story, mission, and the team behind our success.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-100">
        <motion.div
          className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Mission */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-semibold text-primary mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg">
              Our mission is to provide the freshest and highest quality fruits to our customers, ensuring satisfaction and promoting healthy living.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-semibold text-primary mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg">
              To be the leading fruit market recognized for our commitment to quality, sustainability, and exceptional customer service.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="text-3xl font-semibold text-center text-gray-800 mb-12" variants={itemVariants}>
            Meet Our Team
          </motion.h2>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" variants={containerVariants}>
            {/* Team Member 1 */}
            <motion.div className="bg-white rounded-xl shadow-lg overflow-hidden" variants={itemVariants}>
              <img src="./assets/team1.jpg" alt="Alice Johnson" className="w-full h-56 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Alice Johnson</h3>
                <p className="text-gray-600">Founder & CEO</p>
                <p className="text-gray-700 mt-2">
                  With over a decade in the fruit market industry, Alice founded our company with a passion for quality and sustainability.
                </p>
                <div className="mt-4 flex space-x-3">
                  <a href="#" className="text-primary hover:text-primary-bg transition-colors" aria-label="Alice Johnson on Facebook">
                    {/* Facebook Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35C.597 0 0 .6 0 1.333v21.333C0 23.4.597 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.4 24 22.667V1.333C24 .6 23.403 0 22.675 0z" />
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:text-primary-bg transition-colors" aria-label="Alice Johnson on Twitter">
                    {/* Twitter Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.574 4.902 4.902 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084c.63 1.953 2.445 3.376 4.6 3.416A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.056 0 14.01-7.496 14.01-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:text-primary-bg transition-colors" aria-label="Alice Johnson on Instagram">
                    {/* Instagram Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V8a4 4 0 014-4h2a4 4 0 014 4v8m-4 4v-4m0 0H11m4 0h-4m1-1a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Repeat similar blocks for other team members */}
            {/* Team Member 2 */}
            <motion.div className="bg-white rounded-xl shadow-lg overflow-hidden" variants={itemVariants}>
              <img src="./assets/team2.jpg" alt="Bob Williams" className="w-full h-56 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Bob Williams</h3>
                <p className="text-gray-600">Head of Operations</p>
                <p className="text-gray-700 mt-2">
                  Bob oversees the day-to-day operations, ensuring that our supply chain runs smoothly and efficiently.
                </p>
                <div className="mt-4 flex space-x-3">
                  <a href="#" className="text-primary hover:text-primary-bg transition-colors" aria-label="Bob Williams on LinkedIn">
                    {/* LinkedIn Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zM7.5 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.5c0-1.075-.925-2-2-2s-2 .925-2 2v4.5h-3v-9h3v1.5c.828-1.377 2.645-2.25 4.5-2.25 3.038 0 5.5 2.462 5.5 5.5v4.5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div className="bg-white rounded-xl shadow-lg overflow-hidden" variants={itemVariants}>
              <img src="./assets/team3.jpg" alt="Carol Martinez" className="w-full h-56 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Carol Martinez</h3>
                <p className="text-gray-600">Marketing Manager</p>
                <p className="text-gray-700 mt-2">
                  Carol leads our marketing strategies, ensuring that our brand reaches a wide audience through innovative campaigns.
                </p>
                <div className="mt-4 flex space-x-3">
                  <a href="#" className="text-primary hover:text-primary-bg transition-colors" aria-label="Carol Martinez on Twitter">
                    {/* Twitter Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.574 4.902 4.902 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084c.63 1.953 2.445 3.376 4.6 3.416A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.056 0 14.01-7.496 14.01-13.986 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Company History */}
      <section className="py-16 bg-gray-100">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="text-3xl font-semibold text-center text-gray-800 mb-12" variants={itemVariants}>
            Our History
          </motion.h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Timeline */}
            <motion.div className="md:w-1/2" variants={itemVariants}>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-gray-300"></div>

                {/* Timeline Items */}
                <div className="space-y-12">
                  {/* Year 2020 */}
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8 text-right">
                      <h3 className="text-xl font-semibold text-gray-800">2020</h3>
                      <p className="text-gray-600">
                        Founded our fruit market with a vision to provide fresh and organic fruits to the community.
                      </p>
                    </div>
                    <div className="w-1/2 pl-8 flex justify-center">
                      <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-md"></div>
                    </div>
                  </div>

                  {/* Year 2021 */}
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8 text-right">
                      <h3 className="text-xl font-semibold text-gray-800">2021</h3>
                      <p className="text-gray-600">
                        Expanded our operations to three new locations, increasing our reach and customer base.
                      </p>
                    </div>
                    <div className="w-1/2 pl-8 flex justify-center">
                      <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-md"></div>
                    </div>
                  </div>

                  {/* Year 2022 */}
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8 text-right">
                      <h3 className="text-xl font-semibold text-gray-800">2022</h3>
                      <p className="text-gray-600">
                        Launched our online store, making it easier for customers to order their favorite fruits from anywhere.
                      </p>
                    </div>
                    <div className="w-1/2 pl-8 flex justify-center">
                      <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-md"></div>
                    </div>
                  </div>

                  {/* Year 2023 */}
                  <div className="flex items-center">
                    <div className="w-1/2 pr-8 text-right">
                      <h3 className="text-xl font-semibold text-gray-800">2023</h3>
                      <p className="text-gray-600">
                        Introduced a variety of exotic fruits, enhancing our product range and catering to diverse tastes.
                      </p>
                    </div>
                    <div className="w-1/2 pl-8 flex justify-center">
                      <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div className="md:w-1/2" variants={itemVariants}>
              <img src="./assets/history.jpg" alt="Company History" className="w-full rounded-xl shadow-lg object-cover h-96" loading="lazy" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="text-3xl font-semibold text-center text-gray-800 mb-12" variants={itemVariants}>
            What Our Customers Say
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" variants={containerVariants}>
            {/* Testimonial 1 */}
            <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={itemVariants}>
              <p className="text-gray-700 mb-4">
                "FruityDelights provides the freshest fruits I've ever tasted. Their customer service is exceptional!"
              </p>
              <div className="flex items-center gap-4">
                <img src="./assets/customer1.jpg" alt="John Doe" className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">John Doe</h4>
                  <p className="text-gray-500">Fruit Lover</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={itemVariants}>
              <p className="text-gray-700 mb-4">
                "I love their variety of exotic fruits. Always fresh and delivered on time. Highly recommended!"
              </p>
              <div className="flex items-center gap-4">
                <img src="./assets/customer2.jpg" alt="Jane Smith" className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Jane Smith</h4>
                  <p className="text-gray-500">Health Enthusiast</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={itemVariants}>
              <p className="text-gray-700 mb-4">
                "Their online store is user-friendly and the delivery was prompt. Excellent quality fruits every time."
              </p>
              <div className="flex items-center gap-4">
                <img src="./assets/customer3.jpg" alt="Emily Clark" className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Emily Clark</h4>
                  <p className="text-gray-500">Busy Professional</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
