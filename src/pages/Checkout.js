import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'

import BreadCrumb from '../components/BreadCrumb'
import alexa from '../images/alexa.png'
import { IoReturnDownBack } from "react-icons/io5";
import { Link } from 'react-router-dom'
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import  * as yup  from 'yup';
// import { initMercadoPago } from '@mercadopago/sdk-react'
import { createAnOrder, deleteCartProduct, deleteUserCart, getUserCart, loginUser, resetState } from '../features/user/userSlice'
import axios from 'axios';
import { config } from '../utils/axiosconfig';
import { useNavigate } from 'react-router-dom';




const shippingSchema = yup.object({
  firstName: yup.string().required("Primer Nombre Requerido"),
  lastName: yup.string().required("Primer Apellido Requerido"),
  address: yup.string().required("Dirección Requerida"),
  state: yup.string().required("Estado Requerido"),
  other: yup.string().required("Calle, Numero, Dpto, piso, etc Requerido"),
  city: yup.string().required("Ciudad Requerida"),
  country: yup.string().required("País Requerido"),
  pincode: yup.string().required("Código Postal Requerido"),

});


const Checkout = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartState = useSelector(state => state.auth.cartProducts);
  const productCars = cartState?.cart;
  const authState = useSelector(state => state.auth);
  const [totalAmount, setTotalAmount] = useState(null); 
  const [cardProductsState, setCartProductState] = useState([]);
  const CustomerJSON = localStorage.getItem('customer');
  const customer = JSON.parse(CustomerJSON);
  const id = localStorage.getItem('customer') && customer._id;
  const email = localStorage.getItem('customer') && customer.email;
  const [cambioOrd,setCambioOrd]= useState(null);
  const [idoc, setIdOc] = useState(null);

console.log(idoc);

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000); // Genera un número aleatorio entre 0 y 999999
};  

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      state: '',
      city: '',
      country: '',
      pincode: '',
      other: '',
      costoenv:5,
},
validationSchema:shippingSchema,
onSubmit: (values) => {
  //setShippingInfo(values)
  //localStorage.setItem("address", JSON.stringify(values))
  setTimeout(() => {
    checkOutHandler()
}, 300)     
},
});


console.log(formik.values);

// useEffect(() => {
//  dispatch(getUserCart(config2))
// }, [])

useState(() => {
  setIdOc(generateRandomId());

  return idoc;
}, []);


useEffect(() => {
  if(authState?.orderedProduct?.order !== null && authState?.orderedProduct?.success === true) {
navigate("/my-orders")
  }

}, [authState])




useEffect(() => {
  let sum = 0;
  for (let index = 0; index < productCars?.length; index++) {
    sum = sum + (Number(productCars[index].quantity) * productCars[index].price)
    setTotalAmount(sum)
  }
  },[cartState])
  
  

const loadScript = (src) => {
  return new Promise((resolve) => {
const script = document.createElement("script");
script.src = src;
script.onload = () => {
  resolve(true)

}
script.onerror = () => {
  resolve(false)
}
document.body.appendChild(script)
  })
}

console.log(productCars);

useEffect(() => {
  let items = []
  for (let index = 0; index < productCars?.length; index++) {
    console.log(productCars);
    items.push({
      product:productCars[index].productId._id, 
      quantity:productCars[index].quantity, 
      color:productCars[index].color,
      price:productCars[index].price,
    })
  }
  setCartProductState(items)
},[])

console.log(cardProductsState);


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



const checkOutHandler = async () => {
// const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
//   if (!res) {
//     alert("SDK de MercadoPago no pudo cargar")
//     return;
// }
// const result = await axios.post("http://localhost:5000/api/user/order/checkout", {amount:totalAmount + 5}, config)
//   if (!result) {
//     alert("Algo Salió Mal")
//     return;
// }

// const {amount, id: order_id, currency} = result.data.order
// const options = {
//     key: "pk_test_51OcLYFLipi5cnCBscdSKXFoBgpzQiwU9yGENm0RHUYT6bP4RkQnABuV2WYmqPI8C9HYoI3RZxqVUQkBR0thmgdfa00k3NSgrs9", // Enter the Key ID generated from the Dashboard
//     amount: amount.toString(),
//     currency: currency,
//     name: "Amber Laya.",
//     description: "Test Transaction",
//     image: { },
//     order_id: order_id,
//     handler: async function (response) {
// const data = {
//     orderCreationId: order_id,
//     razorpayPaymentId: response.razorpay_payment_id,
//     razorpayOrderId: response.razorpay_order_id,
            
// };

// const result = await axios.post("http://localhost:5000/api/user/order/paymentVerification", data, config);


    
//       dispatch(createAnOrder({totalPrice:totalAmount, totalPriceAfterDiscount:totalAmount, orderItems: cartProductState, paymentInfo:result.data, shippingInfo:JSON.parse(localStorage.getItem("address"))}))

//       dispatch(deleteUserCart(config2))
//       localStorage.removeItem("address")
//       dispatch(resetState())

//   },
//     prefill: {
//     name: "Amber Laya",
//     email: "codev.laya@gmail.com",
//     contact: "9999999999",
// },
//   notes: {
//         address: "Codev.Laya (CDL) Office Argentina, Buenos Aires",
// },
//   theme: {
//         color: "#61dafb",
// },
// };

// const paymentObject = new window.Razorpay(options);
// paymentObject.open();
//const response = await axios.post('http://localhost:5000/api/payment/create-order/',productCars);
//navigate(response.data.init_point);
//const responsepay = await axios.post('http://localhost:5000/api/payment/receiveWebhook/');
//console.log(responsepay);
//console.log(response.data);

const Orden = {
    user: id,
    email: email,
    shippingInfo: formik.values,
    OrderId : idoc,
    PaymentId : "",
    orderItems: cardProductsState,
    totalPrice: totalAmount,
    totalPriceAfterDiscount: totalAmount 
}


const orderResponse = await axios.post(`http://localhost:5000/api/user/cart/create-order`, Orden);
const data = orderResponse.data;

const nroOrden = data.order.OrderId;


if(nroOrden){

  const url = `http://localhost:5000/api/payment/create-order/?nroOrden=${nroOrden}`

  const response = await axios.post(url,productCars);
  
  window.location.href = response.data.init_point;

   
}


}



  return (
<>
<Meta title={"Cart"}/>
<BreadCrumb title="Cart"/>
<Container class1='checkout-wrapper py-5 home-wrapper-2'>
<div className='row'>
<div className='col-7'>
<div className='checkout-left-data'>
<h3 className='website-name'>GIAMSHOP</h3>
<nav style={{ "--bs-breadcrumb-divider": ">"}} 
aria-label="breadcrumb">
  <ol className="breadcrumb">
<li className="breadcrumb-item"><Link className="text-secundary total-price " to="/cart">
      Cart
    </Link>
</li>
    &nbsp; /&nbsp;
<li className="breadcrumb-item  total-price active" aria-current="page">
      Información
</li>
    &nbsp;/
<li className="breadcrumb-item total-price  active">Envío
</li>
    &nbsp;/
<li className="breadcrumb-item total-price  active" aria-current="page">Pago
</li>
</ol>
</nav>


<h4 className='title total'>Información de Contacto</h4>
<p className='user-details total'>CDL (codev.laya@gmail.com)</p>
<h4 className='mb-3'>Dirección De Envío</h4>
<form onSubmit={formik.handleSubmit} 
action='' className='d-flex flex-wrap gap-15 justify-content-between'
>
<div className='w-100'>
  <select 
  name='country'
   value={formik.values.country} 
   onChange={formik.handleChange("country")} 
   onBlur={formik.handleBlur("country")} 
   className="form-control form-select" id=''>
 <option value="" selected disabled>
    Seleccione País
  </option> 
 <option value="Argentina">
    Argentina
  </option> 
  </select>
<div className='error ms-2 my-1'>
{
  formik.touched.country && formik.errors.country
}
</div>
</div>

<div className='flex-grow-1'>
  <input type='text'
   placeholder="Primer Nombre" 
   className='form-control'
   name='firstName'
   value={formik.values.firstName} 
   onChange={formik.handleChange("firstName")} 
   onBlur={formik.handleBlur("firstName")}
   />
   <div className='error ms-2 my-1'>
{
  formik.touched.firstName && formik.errors.firstName
}
</div>
</div>


<div className='flex-grow-1'>
  <input type='text' 
  placeholder="Primer  Apellido" 
  className='form-control'
  name='lastName'
  value={formik.values.lastName} 
  onChange={formik.handleChange("lastName")} 
  onBlur={formik.handleBlur("lastName")}
/>

<div className='error ms-2 my-1'>
{
  formik.touched.lastName && formik.errors.lastName
}
</div>
</div>


<div className='w-100'>
  <input type='text' 
  placeholder="Dirección" 
  className='form-control'
  name='address'
  value={formik.values.address} 
  onChange={formik.handleChange("address")} 
  onBlur={formik.handleBlur("address")}
/>
<div className='error ms-2 my-1'>
{
  formik.touched.address && formik.errors.address
}
</div>
</div>

<div className='w-100'>
  <input type='text' 
  placeholder="Calle, Numero, Dpto, piso, etc " 
  className='form-control'
  name='other'
  value={formik.values.other} 
  onChange={formik.handleChange("other")} 
  onBlur={formik.handleBlur("other")}
/>
<div className='error ms-2 my-1'>
{
  formik.touched.other && formik.errors.other
}
</div>

</div>

<div className='flex-grow-1'>
  <input type='text' 
  placeholder="Ciudad" 
  className='form-control'
  name='city'
  value={formik.values.city} 
  onChange={formik.handleChange("city")} 
  onBlur={formik.handleBlur("city")}
/>
<div className='error ms-2 my-1'>
{
  formik.touched.city && formik.errors.city
}
</div>
</div>

<div className='flex-grow-1'>
<select name='state' 
value={formik.values.state} 
onChange={formik.handleChange("state")} 
onBlur={formik.handleBlur("state")}
className="form-control form-select" 
id=''>
<option value="" selected disabled>
  Selecciona Provincia
</option>
<option value="La Plata" >
La Plata
</option>
</select>
<div className='error ms-2 my-1'>
{
  formik.touched.state && formik.errors.state
}
</div>
</div>

<div className='flex-grow-1'>
  <input type='text' 
  placeholder="Codigo Postal" 
  className='form-control'
  name='pincode'
  value={formik.values.pincode} 
  onChange={formik.handleChange("pincode")} 
  onBlur={formik.handleBlur("pincode")}
/>
<div className='error ms-2 my-1'>
{
  formik.touched.pincode && formik.errors.pincode
}
</div>
</div>

<div className='w-100'>
<div className='d-flex justify-content-between align-items-center'>
<Link to="/cart" className='text-secundary'><IoReturnDownBack className='me-2 fs-2'/>Retorno Al Carro</Link>
<Link to="/cart" className='button'>Continuar El Envío</Link>
<button className='button border-0'  >Realizar Pedido</button>

</div>
</div>
</form>
</div>
</div>



<div className='col-5'>
<div className='border-bottom py-4'>

{
  productCars && productCars?.map((item, index) => {
    return (
<div key={index} className='d-flex gap-10 mb-2 align-items-center'>
<div className='w-75 d-flex gap-10'>
<div className='w-25 position-relative'>
<span style={{top: "-10px", right: "2px"}} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item?.quantity}</span>
  <img src={item?.productId.images[0]?.url} width={50} height={50} alt='alexa'/>
</div>

<div>
<h3 className='parr'>{item?.productId.title}</h3>
<p className='total-price-color'> {item?.color.title}</p>
</div>
</div>

<div className='flex-grow-1'>
  <h5 className='total'>$ {item?.price * item?.quantity}</h5>
</div>
</div>
    )
  })
}


</div>


<div className='border-bottom py-4'>
<div className='d-flex justify-content-between align-items-center'>
<p className='total'>SubTotal</p>
<p className='total-price'>$ {totalAmount ? totalAmount : "0"}</p>
</div>
<div className='d-flex justify-content-between align-items-center'>
<p className='mb-0 total'>Envío</p>
<p className='mb-0 total-price'>$ 5</p>
</div>
</div>


<div className='d-flex justify-content-between align-items-center border-bottom py-4'>
<h4 className='total'>Total</h4>
<h5 className='total-price'>$ {totalAmount ? totalAmount + 5:"0"}</h5>
</div>
</div>


</div>
</Container>
</>
)
}

export default Checkout