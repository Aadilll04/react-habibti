import React, { useState, useEffect } from 'react';
import '../App.css';
import '../styles/Home.css'

import fetchProducts from '../services/fetchProducts';
import { addProductToCart, getCartProducts, increaseProductQuantity, decreaseProductQuantity, deleteItemFromCart } from '../services/cartService';

import f1 from '../static/images/features/f1.png';
import f2 from '../static/images/features/f2.png';
import f3 from '../static/images/features/f3.png';
import f4 from '../static/images/features/f4.png';
import f5 from '../static/images/features/f5.png';
import f6 from '../static/images/features/f6.png';
import n1 from '../static/images/products/n1.jpg';
import n2 from '../static/images/products/n2.jpg';
import n3 from '../static/images/products/n3.jpg';
import n4 from '../static/images/products/n4.jpg';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const banners = [
  { title: 'Crazy Deals', subtitle: 'Buy 1 Get 1 Free', description: 'The best classic dress is on sale at cara', buttonText: 'Learn More' },
  { title: 'Spring/Summer', subtitle: 'Upcoming Season', description: 'The best classic dress is on sale at cara', buttonText: 'Collection' },
  { title: 'SEASONAL SALE', subtitle: 'Winter Collection -50% OFF', description: '' },
  { title: 'NEW FOOTWEAR Collection', subtitle: 'Spring / Summer 2022', description: '' },
  { title: 'T-shirts', subtitle: 'New Trendy Prints', description: '' }
];

const Home = () => {
  const features = [
    { name: 'Free Shipping', image: f1 },
    { name: 'Online Order', image: f2 },
    { name: 'Save Money', image: f3 },
    { name: 'Promotions', image: f4 },
    { name: 'Happy Sell', image: f5 },
    { name: '24/7 Support', image: f6 },
  ];

  const newArrivalsProducts = [
    { id: 1, img: n1, brand: 'adidas', name: 'New T-shirt-1', price: '100' },
    { id: 2, img: n2, brand: 'adidas', name: 'New T-shirt-2', price: '200' },
    { id: 3, img: n3, brand: 'adidas', name: 'New T-shirt-3', price: '600' },
    { id: 4, img: n4, brand: 'adidas', name: 'New T-shirt-4', price: '900' },
  ];

  const [products, setProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    getProducts();
  }, []);

  /*cart */
  useEffect(() => {
    fetchCartProducts();
  }, []);

  const fetchCartProducts = async () => {
    const cartProducts = await getCartProducts();
    setCartList(cartProducts);
    updateCartCounter(cartProducts.length);
  };

  /*cart functions */
  const handleAddToCart = async (product) => {
    product.quantity = 1;
    await addProductToCart(product);
    setCartList(prevCartList => [...prevCartList, product]);
    setCartCount(prevCount => prevCount + 1);
  };

  const handleIncrement = async (productId) => {
    await increaseProductQuantity(productId);
    setCartList(prevCartList => prevCartList.map(product => product.id === productId ? { ...product, quantity: product.quantity + 1 } : product));
  };

  const handleDecrement = async (productId) => {
    const product = cartList.find(product => product.id === productId);
    if (product.quantity === 1) {
      await handleDelete(productId);
    } else {
      await decreaseProductQuantity(productId);
      setCartList(prevCartList => prevCartList.map(product => product.id === productId ? { ...product, quantity: product.quantity - 1 } : product));
    }
  };

  const handleDelete = async (productId) => {
    await deleteItemFromCart(productId);
    setCartList(prevCartList => prevCartList.filter(product => product.id !== productId));
    setCartCount(prevCount => prevCount - 1);
  };


  const updateCartCounter = (count) => {
    setCartCount(count);
  };


  return (
    <>
      <Navbar
        cartCount={cartCount}
        cartList={cartList}
        handleDelete={handleDelete}
      />
      {/* hero */}
      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <button>Shop Now</button>
      </section>
      {/* features */}
      <section id="feature" className="section-p1">
        {features.map((feature, index) => (
          <div className="fe-box" key={index}>
            <img src={feature.image} alt={feature.name} />
            <h6>{feature.name}</h6>
          </div>
        ))}
      </section>

      {/* FeaturedProducts  */}

      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collection New Modern Design</p>
        <div className="pro-container" id="products-container">
          {products.map(product => {
            const productInCart = cartList.find(item => item.id === product.id);
            return (
              <div className="pro" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="des">
                  <h5>{product.name}</h5>
                  <span>{product.des}</span>
                  <div className="star">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4>${product.price}</h4>
                </div>
                {productInCart ? (
                  <div className="input-group">
                    <button
                      onClick={() => handleDecrement(product.id)}
                      className="decrement"
                    >
                      -
                    </button>
                    <input type="number" value={productInCart.quantity} readOnly />
                    <button
                      onClick={() => handleIncrement(product.id)}
                      className="increment"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <i className='fal fa-shopping-cart cart-icon' onClick={() => handleAddToCart(product)}></i>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* banner */}
      <section id="banner" className="section-m1">
        <h4>Repair Services</h4>
        <h2>Up to <span>70% off</span> - All T-shirts & Accessories</h2>
        <button className="normal">Explore More</button>
      </section>
      {/* new Arrivals */}
      <section id="product1" className="section-p1">
        <h2>New Arrivals</h2>
        <p>Summer Collection New Modern Design</p>
        <div className="pro-container">
          {newArrivalsProducts.map(product => (
            <div className="pro" key={product.id}>
              <img src={`${product.img}`} alt={product.name} />
              <div className="des">
                <span>{product.brand}</span>
                <h5>{product.name}</h5>
                <div className="star">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <h4>Rs.{product.price}</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart-icon"></i></a>
            </div>
          ))}
        </div>
      </section>
      {/* SmallBanner */}
      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
          <h4>Crazy Deals</h4>
          <h2>Buy 1 Get 1 Free</h2>
          <span>The best classic dress is on sale at cara</span>
          <button className="white">Learn More</button>
        </div>
        <div className="banner-box banner-box2">
          <h4>Spring/Summer</h4>
          <h2>Upcoming Season</h2>
          <span>The best classic dress is on sale at cara</span>
          <button className="white">Collection</button>
        </div>
      </section>

      <section id="banner3">
        <div className="banner-box">
          <h2>SEASONAL SALE</h2>
          <h3>Winter Collection -50% OFF</h3>
        </div>
        <div className="banner-box banner-box2">
          <h2>NEW FOOTWEAR Collection</h2>
          <h3>Spring / Summer 2022</h3>
        </div>
        <div className="banner-box banner-box3">
          <h2>T-shirts</h2>
          <h3>New Trendy Prints</h3>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Home