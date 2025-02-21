import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { RiDeleteBin5Line } from "react-icons/ri";
import moto from '../images/motop.png'
import alexa from '../images/alexa.png'
// import galaxy from '../images/galaxy.avif'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Container from '../components/Container';
import { deleteCartProduct, getUserCart, updateCartProduct } from '../features/user/userSlice';






const Cart = () => {





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






const dispatch = useDispatch()
const userCartState = useSelector(state => state?.auth?.cartProducts);
const productCars = userCartState?.cart;
const CustomerJSON = localStorage.getItem('customer');
const customer = JSON.parse(CustomerJSON);
const userId =  localStorage.getItem('customer') && customer._id;
const [quantity,setquantity] = useState(null);
console.log(userCartState);

const [productUpdateDetail, setProductUpdateDetail] = useState(null);
const [totalAmount, setTotalAmount] = useState(null);




useEffect(()=>{

       
    dispatch(getUserCart(userId,config2)) 

},[])

/*useEffect(()=>{

       
  dispatch(getUserCart(userId,config2)) 

},[userCartState])
*/

/*useEffect(() => { 
  //const id = customer._id;
  if (productUpdateDetail !== null) {
    const {id,quantity} = productUpdateDetail
    
  dispatch(updateCartProduct({id,userId,quantity}))
  
  setTimeout(() => { 
    
    dispatch(getUserCart(userId,config2))
},200)
}
},[productUpdateDetail])*/

//console.log(productUpdateDetail);

// //useEffect(()=>{
// const ShoppinCartItem = ({item})=> {
//    console.log(id);
//    console.log(quantity)
    


//   dispatch(updateCartProduct({id,userId,quantity}))   
//   setTimeout(()=>{
//     dispatch(getUserCart(userId,config2))

//   }, 200)



const deleteACartProduct = (id,userId) => {
  console.log(id);
  console.log(userId)
  dispatch(deleteCartProduct({id,userId}));
  setTimeout(()=>{
    dispatch(getUserCart(userId,config2))
   

  }, 200)
}


useEffect(() => {
let sum = 0;
for (let index = 0; index < productCars?.length; index++) {
  sum = sum + (Number(productCars[index].quantity) * productCars[index].price)
  setTotalAmount(sum)
}
},[userCartState])



const handleupdateCartProduct = (id,newQuantity) => {

  console.log(id);
  console.log(newQuantity);

          
   dispatch(updateCartProduct({id,userId,newQuantity}));
   setquantity(newQuantity)
    

   setTimeout(()=>{
      dispatch(getUserCart(userId,config2))
  
    }, 200)

}









  return (


<>
<Meta title={"Cart"}/>
<BreadCrumb title="Cart"/>
<Container class1='cart-wrapper home-wrapper-2 py-5'>
<div className='row'>
<div className='col-12'>
<div className='cart-header py-3 d-flex justify-content-between align-items-center'>
    <h4 className='cart-col-1'>Producto</h4>
    <h4 className='cart-col-2'>Precio</h4>
    <h4 className='cart-col-3'>Cantidad</h4>
    <h4 className='cart-col-4'>Total</h4> 
</div>


{userId && productCars && productCars.map((item, index) => {
 
return (
<div key={index} className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'>
<div className='cart-col-1 gap-15 d-flex align-items-center'>
<div className='w-25'>
  <img src={item?.productId.images[0].url} className="imgcart img-fluid" alt='moto'/>
</div>

<div className='w-75'>
  <p>{item?.productId?.title}</p>
  <p className='d-flex gap-3'>Color: <ul className='colors ps-0'>
  <li style={{backgroundColor: item?.color.title}}></li>
</ul></p>
</div>
</div>

<div className='cart-col-2'>
  <h5 className='price'>$ {item?.price}</h5>
</div>
<div className='cart-col-3 d-flex align-items-center gap-15'>
<div>
  <input className='form-control' type='number' name={'quantity' + item?._id}
  //min={1}
  //max={10} 
  id={"cart" + item?._id}
  value={item?.quantity}
  onChange={(e) => {
    handleupdateCartProduct(item?.productId._id,e.target.value)}}/>
</div>
<div>
<RiDeleteBin5Line onClick={() => {deleteACartProduct(item?.productId._id,userId)}} className='icondelet'/>
</div>
</div>
<div className='cart-col-4'>
<h5 className='price'>$ {(item?.price * item?.quantity).toFixed(2)}</h5>
</div>
</div>
)

})
}
</div>


<div className='col-12 py-2 mt-4'>
<div className='d-flex justify-content-between align-items-baseline'>
<Link to="/product" className='button'>Continuar Compra</Link>

{
 ( totalAmount !== null) && 
 <div className='d-flex flex-column align-items-end'>
  <h4>SubTotal: $ {productCars.length === 0 ? 0:parseFloat(totalAmount.toFixed(2))}</h4>
  <p>Impuestos y envío calculados</p>
  <Link to="/checkout" className='button'>Verificar</Link>
</div>
}
</div>
</div>
</div>
</Container>
</>
)
}

export default Cart