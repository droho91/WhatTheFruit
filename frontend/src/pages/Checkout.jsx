import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { removeFromCart, clearCart } from '../stores/cartSlice';

const CheckOut = () => {
    const cart = useSelector((state) => state.cart)

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1)

    const handleMinusQuantity = () => {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    }

    const handlePlusQuantity = () => {
        setQuantity(quantity + 1)
    }

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div>
            <Navbar isMenu={false} isContact={false} isAbout={false} />
            <div className="font-poppins mx-auto max-w-2xl px-4 pt-20 pb-80 sm:px-6 sm:pt-24 lg:max-w-7xl lg:px-8">
                <div className="flex gap-3">
                    {/* Product List */}
                    {cart.items.length === 0 ? (
                        <div className="flex-1 shadow-lg p-3 rounded-xl">
                            <p>Your cart is empty!</p>
                        </div>
                    ) : (
                        <div className="flex-1 shadow-lg p-3 rounded-xl">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-bold mb-5 text-primary-text">Your Cart</h1>
                                <button onClick={handleClearCart} className="px-3 border-solid border-2 border-primary-bg hover:bg-primary-bg hover:text-white transition-colors rounded-xl">Clear Cart</button>
                            </div>

                            {cart.items?.map(item => (
                                <div key={item.productId} className="flex items-center py-3">
                                    <img src={`./assets/${item.image}`} alt={item.name} className="w-20 mr-3 rounded-xl" />

                                    {/* Details */}
                                    <div className="flex-1">
                                        <h2 className="text-lg">{item.name}</h2>
                                        <p className="font-bold text-xl">${item.price}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <button className="bg-gray-300 rounded-full py-1 px-3 hover:opacity-80" onClick={handleMinusQuantity}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className="bg-gray-300 rounded-full py-1 px-3 hover:opacity-80" onClick={handlePlusQuantity}>+</button>
                                        </div>
                                        <button className="bg-red-400 py-1 px-3 rounded-xl text-white hover:opacity-80" onClick={() => handleRemoveFromCart(item)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Side Panel */}
                    <div className="flex-1">
                        <div className="p-3 rounded-xl shadow-lg">
                            <div className="flex justify-between mb-1">
                                <span>Subtotal</span>
                                <span>$190.0</span>
                            </div>
                            <div className="flex justify-between mb-1">
                                <span>Shipping</span>
                                <span>$10.0</span>
                            </div>
                            <div className="flex justify-between mb-3">
                                <span>Total</span>
                                <span className="font-bold text-lg">$200.0</span>
                            </div>
                            <div className="text-center px-3 py-1 border-solid border-2 border-primary-bg hover:bg-primary-bg hover:text-white transition-colors rounded-xl"><Link to="/shipping">Continue to checkout</Link></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckOut;