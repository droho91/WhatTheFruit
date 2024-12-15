// ProductDetail.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { useDispatch } from 'react-redux'
import { addToCart } from '../stores/cartSlice'

const styles = {
    productImage: {
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    thumbnail: {
        display: 'flex',
        gap: '0.5rem',
    },
    thumbnailImage: {
        width: '50px',
        height: '50px',
        cursor: 'pointer',
        border: '2px solid transparent',
    },
    selectedThumbnail: {
        border: '2px solid #ffd43b',
    },
    productDetails: {
        flex: 1,
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: '600',
        color: '#333',
        marginBottom: '1rem',
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.875rem',
        color: '#888',
        marginBottom: '1rem',
    },
    priceBox: {
        backgroundColor: '#f9f9f9',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1rem',
    },
    price: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#333',
    },
    addToCartButton: {
        backgroundColor: '#6b21a8',
        color: '#fff',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '1rem',
        border: 'none',
        cursor: 'pointer',
        marginTop: '1rem',
        width: '100%',
    },
    tabs: {
        display: 'flex',
        gap: '1rem',
        marginTop: '2rem',
    },
    tab: {
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        borderBottom: '2px solid transparent',
        fontSize: '1rem',
    },
    activeTab: {
        borderBottom: '2px solid #ffd43b',
        fontWeight: '600',
    },
    tabContent: {
        marginTop: '1rem',
    },
};

const ProductDetail = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { info } = location.state || {} // Retrieve passed data

    const tabs = ['Description', 'Reviews', 'Similar Products'];
    const reviewsArr = [
        {
            id: 1,
            profile: "pfp2.jpg",
            username: "Rain Auston",
            comment: "This tastes good"
        },
        {
            id: 2,
            profile: "pfp3.jpg",
            username: "Miller Eddy",
            comment: "I like this drink!"
        },
    ]

    const [price, setPrice] = useState(info.price)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('Description')
    const [reviews, setReviews] = useState(reviewsArr)
    const [inputReview, setInputReview] = useState('')

    const handleOption = (e) => {
        e.target.value.includes("XL") ? setPrice(info.price + 0.5) : setPrice(info.price)
    }

    const handleMinusQuantity = () => {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    }

    const handlePlusQuantity = () => {
        setQuantity(quantity + 1)
    }

    const handleSubmitReview = (e) => {
        e.preventDefault();
        const newReview = {
            username: "test5",
            comment: inputReview
        }
        
        setReviews(prevReviews => [...prevReviews, newReview])
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: info.id,
            image: info.image,
            name: info.name,
            price: price,
            quantity: quantity
        }))
    }

    const reviewCard = reviews.map(review => {
        return (
            <div key={review.id} className="flex gap-5 mb-5 px-5 py-2.5">
                <img src={`./assets/${review.profile}`} alt="Profile" className="w-16 object-cover rounded-full" />
                <div className="flex-1 px-5 py-1 bg-gray-300 rounded-xl">
                    <h4 className="text-lg font-bold">{review.username} <span className="text-sm font-normal ml-5">09/12</span></h4>
                    <p>{review.comment}</p>
                </div>
            </div>
        )
    })

    return (
        <>
            <Navbar isMenu={true} isContact={false} isAbout={false} />
            <div className="bg-white font-poppins">
                <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="text-lg mb-2">
                        <Link to="/products" className="hover:text-primary-bg transition-colors">Menu</Link> &gt; {info.category} &gt; <span className="font-semibold">{info.name}</span> 
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex gap-5">
                            {/* Product Image Section */}
                            <div className="self-start w-96 object-cover rounded-xl shadow-xl">
                                <img src={`./assets/${info.image}`} alt="Product"/>   
                            </div>

                            {/* Product Details Section */}
                            <div className="flex-1 px-7 py-5">
                                <h2 className="text-3xl font-bold mb-2">{info.name}</h2>
                                <p className="text-2xl font-bold mb-2 text-primary-text">{`$${price}`}</p>

                                <div>
                                    <p className="mb-2">Choose a size:</p>
                                    <select style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }} onClick={handleOption}>
                                        <option>L (+ $0)</option>
                                        <option>XL (+ $0.5)</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <button className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex items-center justify-center" onClick={handleMinusQuantity}>
                                        -
                                    </button>
                                    <span className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex items-center justify-center">{quantity}</span>
                                    <button className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex items-center justify-center" onClick={handlePlusQuantity}>
                                        +
                                    </button>
                                </div>

                                <button style={styles.addToCartButton} className="hover:opacity-80 transition-opacity" onClick={handleAddToCart}>Add to cart</button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div style={styles.tabs}>
                        {tabs.map((tab) => (
                        <div
                            key={tab}
                            style={{ ...styles.tab, ...(activeTab === tab ? styles.activeTab : {}) }}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div style={styles.tabContent}>
                        {activeTab === 'Description' && (
                        <p>{info.desc}</p>
                        )}

                        {activeTab === 'Reviews' && (
                        <div>
                            <div className="my-5 flex gap-5">
                                <input type="text" placeholder="Submit a review here..." className="px-5" value={inputReview} onChange={e => setInputReview(e.target.value)} />
                                <button className="bg-gray-300 py-2 px-5 rounded-lg" onClick={handleSubmitReview}>Submit</button>
                            </div>

                            <h3 className="text-xl font-bold mb-2.5">{`${reviews.length} Reviews`}</h3>
                            {reviewCard}
                        </div>
                        )}

                        {activeTab === 'Similar Products' && (
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquid explicabo. Modi, quidem, ullam et!</p>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetail;