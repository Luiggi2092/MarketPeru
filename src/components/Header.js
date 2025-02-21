import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FaCodeCompare } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import {BsSearch} from "react-icons/bs"
import userhed from "../images/user.svg"
import cart from "../images/cart.svg"
import menu from "../images/menu.svg"
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'; 
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct } from '../features/product/productSlice';
import { getUserCart } from '../features/user/userSlice';






const Header = () => {




const navigate = useNavigate()
const dispatch = useDispatch();
const cartState = useSelector(state => state?.auth?.cartProducts);
const productState = useSelector(state => state?.product?.product);
const authState = useSelector(state => state.auth);
const User = useSelector(state => state?.auth?.user);
const CustomerJSON = localStorage.getItem('customer');
const customer = JSON.parse(CustomerJSON);
const userId =  localStorage.getItem('customer') && customer._id;
const [total, setTotal] = useState(null);
const [productOpt, setProductOpt] = useState([]);
const [paginate, setPaginate] = useState(true);
const productsCar = cartState?.cart;

console.log(cartState);
console.log(User);

const getTokenFromLocalStorage = localStorage.getItem("customer")
? JSON.parse(localStorage.getItem("customer"))
: null;

const config2 = {
headers: {
  Authorization: `Bearer ${
    getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
  }`,
  Accept: "application/json",
},
};


useEffect(() => {
  if (User !== null) {
  dispatch(getUserCart(userId))
  console.log("holi me repeti seis veces");
  }else {
    // Si el usuario cierra sesión, limpiar el estado del carrito
    dispatch(getUserCart(userId))
  }
 }, [User])

 useEffect(() => {
  
  if (User !== null) {
    dispatch(getUserCart(userId))
    console.log("holi me repeti seis veces");
    }else {
      // Si el usuario cierra sesión, limpiar el estado del carrito
      dispatch(getUserCart(null))
    }
 }, []) 

console.log(productsCar);

useEffect(()=> {

  if(cartState){
    setTotal(0);
  } 

  let sum = 0
for (let index = 0; index < productsCar?.length; index++) {
  sum = sum + (Number(productsCar[index].quantity) * Number(productsCar[index].price))
  setTotal(sum) 
}
},[cartState])



useEffect(() => {
let data = []
for (let index = 0; index < productState.length; index++) {
  const element = productState[index];
  data.push({id:index, prod:element?._id, name:element?.title})
}
setProductOpt(data)
  
}, [productState])





const handleLogout = () => {
  localStorage.clear()
  window.location.reload()
  //navigate("/");
}
;
;

  return (
<>
<header className='header-top-strip py-2'>
<div className='container-xxl'> 
<div className='row'>
<div className='col-6'>
<p style={{ fontSize: '0.75rem' }} className='text-white mb-0'>Envío gratis a partir de $6.000 y devoluciones gratis</p>
</div>
<div style={{ fontSize: '0.75rem' }} className='col-6'>
<p className='text-end text-white mb-0'>Línea directa: 
<a className="text-white" href='tel:+54 9 11 2278 1197' style={{ textDecoration: 'none', fontSize: '0.75rem', marginLeft: '5px' }}>
    +54 9 11 2278 1197
  </a></p>
</div>
</div>
</div>
</header>



<header className='header-upper py-3'>
<div className='container-xxl'>
<div className='row align-items-center'>
<div className='col-2'>
<h3>
    <Link to="/" className='text-white'>GIAMZON</Link>
</h3>
</div>

<div className='col-5'>
<div className="input-group">
<Typeahead
  id="pagination-example"
  onPaginate={() => console.log('Results paginated')}
  onChange={(selected) => {
  navigate(`/product/${selected[0]?.prod}`)
  dispatch(getAProduct(selected[0]?.prod))
}}
        
  options={productOpt}
  paginate={paginate}
  labelKey={"name"}
  minLength = {2}
  placeholder="Buscar Producto..."
/>
<span className="input-group-text p-2" id="basic-addon2">
    <BsSearch className='fs-8'/>
</span>
</div>
</div>

<div className='col-5'>
<div className='header-upper-links d-flex align-items-center justify-content-between'>
{userId ? <div >
<Link to="/wishlist" className='d-flex align-items-center gap-10 text-white' onClick={() => console.log('Clicked wishlist link')}>
    <FaHeartbeat className='compare1'/>
    <p className='pcompare1 mb-0'>Favoritos </p>
</Link>
</div>:<div></div>}

<Link to={authState?.user === null ? "/login" : "/my-profile"} className='d-flex align-items-center gap-10 text-white'>
  <FaRegUser className='compare3'/>
<div className="username-container">
  {
    authState?.user === null ? 
    <p className='pcompare3 mb-0'>Ingresar</p> : 
    <p className='pcompare3 mb-0' id="username" title={authState?.user?.firstname}>{authState?.user?.firstname}</p>
           
}
</div>
</Link>

 { User != null  ? <div className='header-upper-links d-flex align-items-center justify-content-between'>

<button onClick={handleLogout} className="btn1 border border-0 bg-transparent text-uppercase d-flex justify-content-between" style={{ color: '#1ef5d1' }} type="button">Cerrar Sesión</button>
</div>:<div></div>}

<div>
<Link to="/cart" className='d-flex align-items-center gap-10 text-white'>
    <FaCartArrowDown className='compare4'/>
<div className='d-flex flex-column gap-10'>
<span className='badge bg-white text-dark'>{productsCar?.length}</span>
<p className='pcompare4 mb-0'>$ {total ? total.toFixed(2) : 0}</p>
</div>
</Link>
</div>

</div>
</div>
</div>
</div>
</header>


<header className='header-bottom py-3'>
<div className='container-xxl'>
<div className='row'>
<div className='col-12'>
<div className='menu-bottom d-flex align-items-center gap-30'>
<div>
<div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" 
  type="button" 
  data-bs-toggle="dropdown" 
  aria-expanded="false">
 <img src={menu} alt=''/><span> Categorías De Tienda</span>
  </button>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item text-white" to="/clothing">Indumentaría</Link></li>
    <li><Link className="dropdown-item text-white" to="/tecnology">Tecnología</Link></li>
    <li><Link className="dropdown-item text-white" to="/accesories">Accesorios</Link></li>
    <li><Link className="dropdown-item text-white" to="/homeh">Hogar</Link></li>
    <li><Link className="dropdown-item text-white" to="/kids">Kids</Link></li>
    
  </ul>
</div>

</div>


<div className='menu-links'>
<div className='d-flex align-items-center gap-35'>
<NavLink className="" to="/">Inicio</NavLink>
<NavLink className="" to="/product">Nuestra Tienda</NavLink>
<NavLink className="" to="/my-orders">Mis Pedidos</NavLink>
<NavLink className="" to="/blogs">Blogs</NavLink>
<NavLink className="" to="/contact">Contactos</NavLink>

</div>
</div>
</div>

</div>
</div>
</div>
</header>
</>
)
}

export default Header



















// import React, { useEffect, useState } from 'react'
// import { NavLink, Link, useNavigate } from 'react-router-dom'
// import { FaCodeCompare } from "react-icons/fa6";
// import { FaHeartbeat } from "react-icons/fa";
// import { FaRegUser } from "react-icons/fa";
// import { FaCartArrowDown } from "react-icons/fa6";
// import {BsSearch} from "react-icons/bs"
// import userhed from "../images/user.svg"
// import cart from "../images/cart.svg"
// import menu from "../images/menu.svg"
// import { useDispatch, useSelector } from 'react-redux';
// import { Typeahead } from 'react-bootstrap-typeahead'; 
// import 'react-bootstrap-typeahead/css/Typeahead.css';
// import { getAProduct } from '../features/product/productSlice';
// import { getUserCart } from '../features/user/userSlice';






// const Header = () => {




// const navigate = useNavigate()
// const dispatch = useDispatch();
// const cartState = useSelector(state => state?.auth?.cartProducts);
// const productState = useSelector(state => state?.product?.product);
// const authState = useSelector(state => state.auth);
// const [total, setTotal] = useState(null);
// const [productOpt, setProductOpt] = useState([]);
// const [paginate, setPaginate] = useState(true);



// const getTokenFromLocalStorage = localStorage.getItem("customer")
// ? JSON.parse(localStorage.getItem("customer"))
// : null;

// const config2 = {
// headers: {
//   Authorization: `Bearer ${
//     getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
//   }`,
//   Accept: "application/json",
// },
// };

// useEffect(() => {
//   dispatch(getUserCart(config2))
//  }, [])




// useEffect(()=> {
//   let sum = 0
// for (let index = 0; index < cartState?.length; index++) {
//   sum = sum + (Number(cartState[index].quantity) * Number(cartState[index].price))
//   setTotal(sum) 
// }
// },[cartState])



// useEffect(() => {
// let data = []
// for (let index = 0; index < productState.length; index++) {
//   const element = productState[index];
//   data.push({id:index, prod:element?._id, name:element?.title})
// }
// setProductOpt(data)
  
// }, [productState])





// const handleLogout = () => {
//   localStorage.clear()
//   window.location.reload()
// }




//   return (
// <>
// <header className='header-top-strip py-2'>
// <div className='container-xxl'> 
// <div className='row'>
// <div className='col-6'>
// <p style={{ fontSize: '0.75rem' }} className='text-white mb-0'>Envío gratis a partir de $6.000 y devoluciones gratis</p>
// </div>
// <div style={{ fontSize: '0.75rem' }} className='col-6'>
// <p className='text-end text-white mb-0'>Línea directa: 
// <a className="text-white" href='tel:+54 9 11 2278 1197' style={{ textDecoration: 'none', fontSize: '0.75rem', marginLeft: '5px' }}>
//     +54 9 11 2278 1197
//   </a></p>
// </div>
// </div>
// </div>
// </header>



// <header className='header-upper py-3'>
// <div className='container-xxl'>
// <div className='row align-items-center'>
// <div className='col-2'>
// <h3>
//     <Link to="/" className='text-white'>GIAMZON</Link>
// </h3>
// </div>

// <div className='col-5'>
// <div className="input-group">
// <Typeahead
//   id="pagination-example"
//   onPaginate={() => console.log('Results paginated')}
//   onChange={(selected) => {
//   navigate(`/product/${selected[0]?.prod}`)
//   dispatch(getAProduct(selected[0]?.prod))
// }}
        
//   options={productOpt}
//   paginate={paginate}
//   labelKey={"name"}
//   minLength = {2}
//   placeholder="Buscar Producto..."
// />
// <span className="input-group-text p-2" id="basic-addon2">
//     <BsSearch className='fs-8'/>
// </span>
// </div>
// </div>

// <div className='col-5'>
// <div className='header-upper-links d-flex align-items-center justify-content-between'>
// <div >
// <Link to="/compare-product" className='d-flex align-items-center gap-10 text-white'>
//     <FaCodeCompare className='compare1'/>
//     <p className='pcompare1 mb-0'>Comparar </p>
// </Link>
// </div>

// <div >
// <Link to="/wishlist" className='d-flex align-items-center gap-10 text-white' onClick={() => console.log('Clicked wishlist link')}>
//     <FaHeartbeat className='compare2'/>
//     <p className='pcompare2 mb-0'>Favoritos</p>
// </Link>
// </div>

// <Link to={authState?.user === null ? "/login" : "/my-profile"} className='d-flex align-items-center gap-10 text-white'>
//   <FaRegUser className='compare3'/>
// <div className="username-container">
//   {
//     authState?.user === null ? 
//     <p className='pcompare3 mb-0'>Ingresar</p> : 
//     <p className='pcompare3 mb-0' id="username" title={authState?.user?.firstname}>{authState?.user?.firstname}</p>
           
// }
// </div>
// </Link>

// <div>
// <Link to="/cart" className='d-flex align-items-center gap-10 text-white'>
//     <FaCartArrowDown className='compare4'/>
// <div className='d-flex flex-column gap-15'>
// <span className='badge bg-white text-dark'>{cartState?.length ? cartState?.length : 0}</span>
// <p className='pcompare4 mb-0'>$ {total ? total : 0}</p>
// </div>
// </Link>
// </div>

// </div>
// </div>
// </div>
// </div>
// </header>


// <header className='header-bottom py-3'>
// <div className='container-xxl'>
// <div className='row'>
// <div className='col-12'>
// <div className='menu-bottom d-flex align-items-center gap-30'>
// <div>
// <div className="dropdown">
//   <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" 
//   type="button" 
//   data-bs-toggle="dropdown" 
//   aria-expanded="false">
//  <img src={menu} alt=''/><span> Categorías De Tienda</span>
//   </button>
//   <ul className="dropdown-menu">
//     <li><Link className="dropdown-item text-white" to="/clothing">Indumentaría</Link></li>
//     <li><Link className="dropdown-item text-white" to="/tecnology">Tecnología</Link></li>
//     <li><Link className="dropdown-item text-white" to="/accesories">Accesorios</Link></li>
//     <li><Link className="dropdown-item text-white" to="/homeh">Hogar</Link></li>
//     <li><Link className="dropdown-item text-white" to="/kids">Kids</Link></li>
    
//   </ul>
// </div>

// </div>


// <div className='menu-links'>
// <div className='d-flex align-items-center gap-35'>
// <NavLink className="" to="/">Inicio</NavLink>
// <NavLink className="" to="/product">Nuestra Tienda</NavLink>
// <NavLink className="" to="/my-orders">Mis Pedidos</NavLink>
// <NavLink className="" to="/blogs">Blogs</NavLink>
// <NavLink className="" to="/contact">Contactos</NavLink>
// <div className='header-upper-links d-flex align-items-center justify-content-between'>

// <button onClick={handleLogout} className="btn1 border border-0 bg-transparent text-uppercase d-flex justify-content-between" style={{ color: '#1ef5d1' }} type="button">Cerrar Sesión</button>
// </div>
// </div>
// </div>
// </div>

// </div>
// </div>
// </div>
// </header>
// </>
// )
// }

// export default Header