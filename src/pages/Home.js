import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

import moment from "moment"
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import alexa from '../images/nike2.avif';
import Kia from '../images/nike4.avif';
import woman from '../images/nike5.avif';
import apple from '../images/nike7.avif'
import Tostadora from '../images/homeapp.jpg';
import speacker from '../images/speaker.jpg';
import camera from '../images/camera.jpg';
import auriculares from '../images/acc.jpg'
import laptop from '../images/laptop.jpg'
import tv from '../images/tv.jpg';
import nike from '../images/nike.webp';
import headphone from '../images/headphone.jpg';
import famous from '../images/famous-01.webp';
import parlante1 from '../images/parlante-01.webp';
import parlante from '../images/parlante.jpg';
import room from '../images/room-01.webp';
import brand1 from '../images/brand-01.png';
import brand2 from '../images/brand-02.png';
import brand3 from '../images/brand-03.png';
import brand4 from '../images/brand-04.png';
import brand5 from '../images/brand-05.png';
import brand6 from '../images/brand-06.png';
import brand7 from '../images/brand-07.png';
import brand8 from '../images/brand-08.png';
import wish from '../images/wish.svg';
import relopink from '../images/relopink.jpg';
import prodcompare from '../images/prodcompare.svg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
import Container from '../components/Container';
import { getAllBlogs } from '../features/blogs/blogSlice';
import { services } from '../utils/Data.js';
import {addToWishlist} from '../features/user/userSlice.js';
import { getAllProducts } from '../features/product/productSlice.js';









const Home = () => {



  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };


const dispatch = useDispatch();
const navigate = useNavigate()
let location= useLocation();
const CustomerJSON = localStorage.getItem('customer');
const customer = JSON.parse(CustomerJSON);
const blogState = useSelector((state) => state?.blog?.blog);
const productState = useSelector((state) => state.product.product);
const User = useSelector ((state)=> state?.auth?.user);
const userId =  localStorage.getItem('customer') && customer._id;

const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

const handleClick = (id) => {
  // Navega a la página del producto
  navigate("/product/" + id);
  
  // Desplázate al inicio de la página
  window.scrollTo(0, 0);
};

const getBlogs = () => {
dispatch(getAllBlogs());

}

const addToWish = (productId,userId) => {
  console.log(productId);
  console.log(userId);
  dispatch(addToWishlist({productId,userId}));
}


useEffect(()=> {
  getBlogs();
  getallProducts();
}, [])  



const getallProducts = () => {
  dispatch(getAllProducts());
};






  return (    
<>
<section className="home-wrapper-1 py-5">
<div className='container-xxl'>
<div className='row'>
<div className='col-6'>
<div className='main-banner position-relative '>
  <img src={nike} 
    alt='main-banner1'
    className='img-fluid rounded-3'
/>
<div className='main-banner-content position-absolute'>
  <h4>Zapatillas Nike</h4>
  <h5>Modelo</h5>
</div>
</div>
</div>
<div className='col-6'>
<div className='d-flex flex-wrap gap-15 justify-content-between align-items-center'>
<div className='small-banner position-relative'>
<img src={alexa} 
    alt='main-banner'
    className='img-fluid rounded-3'
/>
</div>
<div className='small-banner position-relative'>
<img src={Kia} 
    alt='main-banner'
    className='img-fluid rounded-3'
/>
</div>
<div className='small-banner position-relative'>
<img src={alexa} 
    alt='main-banner'
    className='img-fluid rounded-3'
/>
</div>
<div className='small-banner position-relative'>
<img src={Kia} 
    alt='main-banner'
    className='img-fluid rounded-3'
/>
</div>
</div>
</div>
</div>
</div>
</section>


                                                  {/* SERVICE */}

<Container className="home-wrapper-2 py-5 ">
<div className='row justify-content-center'>
    {services?.map((service, index) => (
<div className='col-lg-2 col-md-6 mb-3' key={index}>
<div className='service-box'>
    <img src={service.image} alt='services' />
<div className='service-info'>
    <h6>{service.title}</h6>
  <p className="mb-0">{service.tagline}</p>
</div>
</div>
</div>
))}
</div>
</Container>



<Container class1='home-wrapper-2 py-5'>
<div className='row'>
<div className='col-12'>
<div className='categories d-flex align-items-center justify-content-between flex-wrap'>
<div className='d-flex gap align-items-center '>
<div>
<h6>Tostadora</h6>
{/* <p> 10 Items</p> */}
</div>
<img src={Tostadora} alt='camara'/>
</div>

<div className='d-flex gap align-items-center '>
<div>
<h6>Musica & Juego</h6>
{/* <p> 10 Items</p> */}
</div>
<img src={speacker} alt='camara'/>
</div>

<div className='d-flex gap align-items-center '>
<div>
<h6>Smart Tv</h6>
</div>
<img src={tv} alt='camara'/>
</div>

<div className='d-flex gap align-items-center '>
<div>
<h6>Smart Watches</h6>
</div>
<img src={headphone} alt='camara'/>
</div>

<div className='d-flex gap align-items-center '>
<div>
<h6>Camara</h6>
</div>
<img src={camera} alt='camara'/>
</div>

<div className='d-flex gap align-items-center '>
<div>
<h6>Musica</h6>
</div>
<img src={auriculares} alt='camara'/>
</div>

<div className='d-flex gap align-items-center '>
<div>
<h6>Notebook</h6>
</div>
<img src={laptop} alt='camara'/>
</div>

<div className='d-flex gap align-items-center '>
<div>
<h6>Altavoz</h6>
</div>
<img src={speacker} alt='camara'/>
</div>
</div>
</div>
</div>
</Container>

{/* ///////////////////////////////////////////Coleccion destacada//////////////////////////////////////////////// */}
<Container class1='featured-wrapper py-5 home-wrapper-2'>
<div className='row'>
<div className='col-12'>
  <h3 className='section-heading'>Colección Destacada</h3>
</div>

{productState && 
  productState?.map((item, index) => {
   if(item?.tags === "featured") {  
 return (
<div key={index}
	className= {"col-3"}
>
<div 			
	className='product-card position-relative'>
{userId && <div className='wishlist-icon position-absolute'>
<button className='border-0 bg-transparent' onClick={(e) => {addToWish(item?._id,userId)}}>
<img src={wish} alt='wishlist'/>
</button>
</div>} 
			
<div /*className='product-image'*/>
<img src={item?.images && item?.images[0]?.url ? item.images[0].url : ''} 
className="img-fluid" alt='product image'/>
{/* <img src={relopink} 
className="img-fluid" alt='product image'/> */}
</div>
			
<div className='product-details'>
<h6 className='brand'>{item?.brand}</h6>
<h5 className='product-title' style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
    {item?.title}
</h5>

<ReactStars
		count={5}
		size={24}
		value={typeof item?.totalrating === 'number' ? item.totalrating : 0}
		edit={false}
		activeColor="#ffd700"
/>

<p className='price'>$ {item?.price}</p>
</div>
			
<div className='action-bar position-absolute'>
<div className='d-flex flex-column gap-15'>
{/* <button className='border-0 bg-transparent'>
		<img src={prodcompare} alt='compare' onClick={() => navigate("/compare-product/")}/>
</button> */}

<button className='border-0 bg-transparent'>
		<img onClick={() => handleClick(item?._id)} src={view} alt='view'/>
</button>

<button className='border-0 bg-transparent'>
		<img src={addcart} alt='addcart'/>
</button>
</div>
</div>
</div>
</div> 	
 )
  }
})
}
</div>
</Container>


<Container class1='famous-wrapper py-5 home-wrapper-2'>
<div className='row'>
<div className='col-3'>
<div className='famous-card position-relative'>
  <img src={famous} 
  className='imgwatch img-fluid' alt='famous'/>
<div className='famous-content position-absolute'>
<h5>BIG SCREEN</h5>
<h6>Smart Watch Series 7</h6>
<p>Desde $399 a $16.62/mes <br/>Por 24/meses</p>

</div>
</div>
</div>
<div className='col-3'>
<div className='famous-card position-relative'>
  <img src={parlante1} className='imgwatch img-fluid' alt='famous'/>
<div className='famous-content position-absolute'>
<h5 className='text-red'>STUDIO DISPLAY</h5>
<h6 className='text-dark'> 600 Nits Of Brightness.</h6>
<p className='text-dark'>27-inch 5k Retina display <br/></p>
</div>
</div>
</div>
<div className='col-3'>
<div className='famous-card position-relative'>
  <img src={parlante} className='imgwatch img-fluid' alt='famous'/>
<div className='famous-content position-absolute'>
<h5 className='text-red'>SMARTPHONES</h5>
<h6 className='text-dark'> Parlante JBL.</h6>
<p className='text-dark'>Ahora en Azul  Desde $999.00 a $41.62/mes<br/>Por 24/meses</p>
</div>
</div>
</div>

<div className='col-3'>
<div className='famous-card position-relative'>
  <img src={room} className='imgwatch img-fluid' alt='famous'/>
<div className='famous-content position-absolute'>
<h5 className='text-red'>HOME SPEAKERS</h5>
<h6 className='text-dark'>Room-filling sound.</h6>
<p className='text-dark'>from $699 a $116.58/mes <br/>Por 12/meses</p>
</div>
</div>
</div>

</div>
</Container>


<Container class1='special-wrapper py-5 home-wrapper-2'>
<div className='row'>
<div className='col-12'>
  <h3 className='section-heading'>Productos Especiales</h3>
</div>
</div>

<div className='row'>

{
  productState && productState?.map((item, index) => {
    if(item?.tags === "special") { 
 return (
 <SpecialProduct key={index} 
 id={item?._id}
 title={item?.title}
 brand={item?.brand}
 images={item?.images[0].url}
 price={item?.price}
 totalrating={item?.totalrating.toString()}
 sold={item?.sold}
 quantity={item?.quantity}
 /> 
 )
  }
})
}
</div>
</Container>


                           {/* //////////////////////////////////PRODUCTOS POPULARES///////////////////////////////// */}
<Container class1='popular-wrapper py-5 home-wrapper-2'>
<div className='row'>
<div className='col-12'>
  <h3 className='section-heading'>Productos Populares</h3>
</div>
</div>
<div className='row'>
{productState && 
  productState?.map((item, index) => {
   if(item.tags === "popular") {  
 return (
<div key={index}
	className= {"col-3"}
>
<div className='product-card position-relative'>
{userId && <div className='wishlist-icon position-absolute'>
<button className='border-0 bg-transparent' 
onClick={(e) => {addToWish(item?._id,userId)}}>
<img src={wish} alt='wishlist'/>
</button>
</div>} 
			
<div /*className='product-image'*/>
<img src={item?.images && item?.images[0]?.url ? item.images[0].url : ''} 
className="img-fluid" alt='product image'/>
{/* <img src={relopink} 
className="img-fluid" alt='product image'/>*/}
</div> 
			
<div className='product-details'>
<h6 className='brand'>{item?.brand}</h6>
<h5 className='product-title' style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
    {item?.title}
</h5>

<ReactStars
		count={5}
		size={24}
		value={typeof item?.totalrating === 'number' ? item.totalrating : 0}
		edit={false}
		activeColor="#ffd700"
/>

<p className='price'>$ {item?.price}</p>
</div>
			
<div className='action-bar position-absolute'>
<div className='d-flex flex-column gap-15'>
{/* <button className='border-0 bg-transparent'>
		<img src={prodcompare} alt='compare'/>
</button> */}

<button className='border-0 bg-transparent'>
		<img onClick={() => handleClick(item?._id)} src={view} alt='view'/>
</button>

<button className='border-0 bg-transparent'>
		<img src={addcart} alt='addcart'/>
</button>
</div>
</div>
</div>
</div> 	
 )
  }
})
}

</div>
</Container>


<Container class1='marque-wrapper py-5'>
<div className='row'>
<div className='col-12'>
<div className='marquee-inner-wrapper p-3 card-wrapper'>
<Marquee className='d-flex'>
<div className='mx-4 w-25'>
 <img src={brand1} alt='brand'/>
</div>
<div className='mx-4 w-25'>
 <img src={brand2} alt='brand'/>
</div>
<div className='mx-4 w-25'>
 <img src={brand3} alt='brand'/>
</div>
<div className='mx-4 w-25'>
 <img src={brand4} alt='brand'/>
</div>
<div className='mx-4 w-25'>
 <img src={brand5} alt='brand'/>
</div>
<div className='mx-4 w-25'>
 <img src={brand6} alt='brand'/>
</div>
<div className='mx-4 w-25'>
 <img src={brand7} alt='brand'/>
</div>
<div className='mx-4 w-25'>
 <img src={brand8} alt='brand'/>
</div>
</Marquee>
</div>
</div>
</div>
</Container>


<Container class1='blog-wrapper py-5 home-wrapper-2'>
<div className='row'>
<div className='col-12'>
  <h3 className='section-heading'>Nuestro Último Blog</h3>
</div>
</div>

<div className='row'>
{Array.isArray(blogState) && blogState?.map((item, index) => {
 if (index < 4) {
  return (
    <div key={index} className='col-3 m-0'>
        <BlogCard id={item?._id} 
        title={item?.title} 
        description={item?.description} 
         image={item?.images[0]?.url} 
        date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm a')}/>
    </div>          
    );
 }
})}
</div>
</Container>
</>
);
}

export default Home