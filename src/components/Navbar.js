import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import logoImage from '../static/images/logo.png';
import { getCartProducts, increaseProductQuantity, decreaseProductQuantity, deleteItemFromCart } from '../services/cartService';


function Navbar({ cartCount ,cartList,  handleDelete  }) {
  const [isActive, setIsActive] = useState(false);


  const [isCartActive, setIsCartActive] = useState(false);

  const toggleCart = () => {
    setIsCartActive(!isCartActive);
  };


  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const [isSignupActive, setIsSignupActive] = useState(false);

  const handleSignupClick = () => {
    setIsSignupActive(true);
    document.querySelector('.slider').classList.add('moveslider');
  };

  const handleLoginClick = () => {
    setIsSignupActive(false);
    document.querySelector('.slider').classList.remove('moveslider');
  };

  
 
  return (
    <>
      <section id="header">
        <a href="#"><img src={logoImage} className="logo" alt="Logo" /></a>
        <ul id="navbar">
          <li><Link to='/' className='active'> Home</Link></li>

          <li><Link to='/shop'> Shop</Link></li>
          <li><Link to='/AboutUs'> About us</Link></li>
          <li><Link to='/contact'> Contact Us</Link></li>
          <li>
            <i className='bx bx-cart-alt' id="cart-icon" onClick={toggleCart}></i>
            <span className="navquantity">{cartCount}</span>
            <i className='bx bx-user' id="user-icon" onClick={toggleActive}></i>
          </li>
        </ul>
        <div className={`cart ${isCartActive ? 'active' : ''}`}>
                {cartList.map(cartItem => (
                    <div key={cartItem.id} className="box">
                        <img src={cartItem.image} alt={cartItem.name} />
                        <div className="text">
                            <h3>{cartItem.name}</h3>
                            <span>${cartItem.price * cartItem.quantity}</span>
                            <span>{cartItem.quantity}</span>
                        </div>
                        <i className='bx bxs-trash-alt' onClick={() => handleDelete(cartItem.id)}></i>
                    </div>
                ))}
        </div>
        <div className={`user ${isActive ? 'active' : ''}`}>
          <div className="container">
            <div className="slider"></div>
            <div className="loginbtn">
              <button className="login" onClick={handleLoginClick}>Login</button>
              <button className="signup" onClick={handleSignupClick}>Signup</button>
            </div>

            <div className={`form-section ${isSignupActive ? 'form-section-move' : ''}`}>
              <form className={`login-box ${isSignupActive ? 'hidden' : ''}`} id="login-form">
                <input
                  type="email"
                  className="email ele"
                  placeholder="youremail@email.com"
                  id="login-email"
                />
                <input
                  type="password"
                  className="password ele"
                  placeholder="password"
                  id="login-password"
                />
                <input
                  type="submit"
                  className="clkbtn"
                  value="Login"
                />
              </form>

              <form action="" className={`signup-box ${isSignupActive ? '' : 'hidden'}`} id="signup-form">
                <input
                  type="email"
                  className="email ele"
                  placeholder="youremail@email.com"
                  id="signup-email"
                />
                <input
                  type="password"
                  className="password ele"
                  placeholder="password"
                  id="signup-password"
                />
                <input
                  type="submit"
                  className="clkbtn"
                  value="signup"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Navbar
