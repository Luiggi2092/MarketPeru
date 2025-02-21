import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Layout from "./components/Layout.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import OurStore from "./pages/OurStore.js";
import Blog from './pages/Blog.js';
import CompareProduct from './pages/CompareProduct.js';
import Wishlist from './pages/Wishlist.js';
import Login from './pages/Login.js';
import Forgotpassword from './pages/Forgotpassword.js';

import Resetpassword from './pages/Resetpassword.js';
import SingleBlog from './pages/SingleBlog.js';
import PrivacyPolicy from './pages/PrivacyPolicy.js';
import RefundPolicy from './pages/RefundPolicy.js';
import ShippingPolicy from './pages/ShippingPolicy.js';
import TermAndContions from './pages/TermAndContions.js';
import SingleProduct from './pages/SingleProduct.js';
import Cart from './pages/Cart.js';
import Orders from './pages/Orders.js';
import Checkout from './pages/Checkout.js';
import Profile from './pages/Profile.js';
import { OpenRoutes } from './routes/OpenRoutes.js';
import { PrivateRoutes } from './routes/PrivateRoutes.js';
import Signup from './pages/Signup.js';
import Clothing from './pages/Clothing.js';
import Tecnology from './pages/Tecnology.js';
import Accesories from './pages/Accesories.js';
import HomeH from './pages/HomeH.js';
import Kids from './pages/Kids.js';











function App() {
  return (
<>
<Router>
<Routes>
<Route path="/" element={<Layout />}>
<Route index element={<Home />} />      
<Route path="about" element={<About />} />
<Route path="clothing" element={<Clothing />} />
<Route path="tecnology" element={<Tecnology />} />
<Route path="accesories" element={<Accesories />} />
<Route path="homeh" element={<HomeH />} />
<Route path="kids" element={<Kids />} />
<Route path="contact" element={<Contact />} />
<Route path="product" element={<OurStore />} />
<Route path="product/:id" element={<SingleProduct />} /> 
<Route path="blogs" element={<Blog />} />
<Route path="blog/:id" element={<SingleBlog />} />
<Route path="cart" element={<Cart/>} />
<Route path="my-orders" element={<Orders/>} />
<Route path="my-profile" element={<Profile/>} />
<Route path="checkout" element={<Checkout />} />
<Route path="compare-product" element={<CompareProduct />} />
<Route path="wishlist" element={<Wishlist />} />
<Route path="login" element={<Login/>} />
<Route path="forgot-password" element={<Forgotpassword />} />
<Route path="signup" element={<OpenRoutes><Signup/></OpenRoutes>} />
<Route path="reset-password/:token" element={<Resetpassword />} />
<Route path="privacy-policy" element={<PrivacyPolicy />} />
<Route path="refund-policy" element={<RefundPolicy />} />
<Route path="shipping-policy" element={<ShippingPolicy />} />
<Route path="term-conditions" element={<TermAndContions />} /> 
</Route>
</Routes>
</Router>
</>
);
}

export default App;



















 











 
  
