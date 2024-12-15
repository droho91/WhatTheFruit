// ShippingPage.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import axios from 'axios'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ShippingPage = () => {
    const cart = useSelector((state) => state.cart)

    const handlePayment = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:8800/payment");
            console.log(response, 'res');

            if (response.data.message == "Thành công.") {
                // Redirect to MOMO transaction page
                window.location.href = response.data.payUrl;
            }
        } catch (error) {
            console.error('Error during payment:', error);
            alert("Error!");
        }
    }

    const orderSummary = {
        subtotal: 191.65,
        shipping: 10.0,
        total: 201.65,
    };

    return (
        <>
            <Navbar isMenu={false} isContact={false} isAbout={false} />
            <div className="bg-white font-poppins">
                <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="mb-5">
                        <Link to="/checkout" className="hover:text-primary-bg transition-colors"><span>&larr;</span> Back to Cart</Link>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-5">
                        {/* Left Section */}
                        <div className="md:w-1/2 flex flex-col gap-y-5">
                            <div className="rounded-xl shadow-lg px-5 py-3">
                                <h2 className="text-xl font-bold">Your Information</h2>
                                <div className="my-5">
                                    <div className="flex items-center gap-3 mb-1">
                                        <img src="./assets/user.svg" alt="User" />
                                        Đăng Khôi
                                    </div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <img src="./assets/email.svg" alt="User" />
                                        nguyenkhoi200455@gmail.com
                                    </div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <img src="./assets/phone.svg" alt="User" />
                                        (+84) 767 009 955
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold">Your Address</h2>
                                <input type="text" placeholder="e.g, Dĩ An, Bình Dương" className="my-3 px-3 py-1 w-full"/>
                            </div>

                            <div className="rounded-xl shadow-lg px-5 py-3">
                                <h2 className="text-xl font-bold">Your Order</h2>
                                {cart.items?.map(item => (
                                    <div key={item.productId} className="flex items-center py-3">
                                        <img src={`./assets/${item.image}`} alt={item.name} className="w-20 mr-3 rounded-xl" />

                                        {/* Details */}
                                        <div>
                                            <h2 className="text-lg">{item.name}</h2>
                                            <p className="font-bold text-lg">${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="self-start md:w-1/2 mt-8 md:mt-0 relative rounded-xl shadow-lg px-5 py-3">
                            <h2 className="text-xl font-bold">Order Summary</h2>

                            <div className="my-5">
                                <p>Subtotal: ${orderSummary.subtotal.toFixed(2)}</p>
                                <p>Shipping: ${orderSummary.shipping.toFixed(2)}</p>
                                <p className="text-lg font-bold mt-1">Total: ${orderSummary.total.toFixed(2)}</p>
                            </div>

                            <div className="flex items-center justify-center gap-x-3">
                                <button className="px-3 py-1 border-solid border-2 border-pink-500 hover:bg-pink-500 hover:text-white transition-colors rounded-xl" onClick={handlePayment}>Pay with MOMO</button>
                                <button className="px-3 py-1 border-solid border-2 border-primary-bg hover:bg-primary-bg hover:text-white transition-colors rounded-xl"><a href="/successful">Pay Order</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ShippingPage;