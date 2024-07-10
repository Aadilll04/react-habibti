import React from 'react';
import '../styles/Footer.css'
import app from '../static/images/pay/app.jpg';
import pay from '../static/images/pay/pay.png';
import play from '../static/images/pay/play.jpg';
import logoImage from '../static/images/logo.png'; 

const Footer = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        <img className="logo" src={logoImage} alt="Logo" />
        <h4>Contact</h4>
        <p><strong>Address:</strong> Solar system</p>
        <p><strong>Phone:</strong> 123456789</p>
        <p><strong>Hours:</strong> 10:00 - 18:00 , Mon - Sat</p>
        <div className="follow">
          <h4>Follow Us</h4>
          <div className="icon">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-pinterest-p"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
      <div className="col">
        <h4>About</h4>
        <a href="#">About Us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact Us</a>
      </div>
      <div className="col">
        <h4>My Account</h4>
        <a href="#">Sign In</a>
        <a href="#">View Cart</a>
        <a href="#">My Wishlist</a>
        <a href="#">Track My Order</a>
        <a href="#">Help</a>
      </div>
      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div className="row">
          <img src={app} alt="App Store" />
          <img src={play} alt="Google Play" />
        </div>
        <p>Secure Payment Gateways</p>
        <img src={pay} alt="Payment Gateways" />
      </div>
      <div className="copyright">
        <p>A website of clothes</p>
      </div>
    </footer>
  );
};

export default Footer;
