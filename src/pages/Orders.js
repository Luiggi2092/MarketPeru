import React, { useEffect }from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/user/userSlice';






const Orders = () => {

const dispatch = useDispatch();
const orderState = useSelector(state => state.auth?.getorderedProduct?.orders)
const CustomerJSON = localStorage.getItem('customer');
const customer = JSON.parse(CustomerJSON);
const id = localStorage.getItem('customer') && customer._id;
  


useEffect(() => {
	dispatch(getOrders(id))

}, [])



  return (

<> 
<Meta title={"Mis Pedidos"}/>
<BreadCrumb title="Mis Pedidos"/>
<Container class1='cart-wrapper home-wrapper-2 py-5 my-3 '>
<div className='row'> 
<div className='col-12'>
<div className='row'>
<div className='col-3'>
<h5 className='h5id'>Id Pedido</h5>
</div>
<div className='col-3'>
<h5 className='h5id'>Cantidad Total</h5>
</div>
<div className='col-3'>
<h5>Total Con Descuento</h5>
</div>
<div className='col-3'>
<h5 className='h5id'>Estado</h5>
</div>
</div>

</div>
<div className='col-12 mt-3'>
{
	orderState && orderState?.map((item, index) => {
		return (
<div style={{backgroundColor:"#cfdeee"}} className='row pt-3 my-3' key={index} >
<div className='col-3'>
<p className='text-black pid' >{item?._id}</p>
</div>
<div className='col-3'>
<p className='text-black pid2' >{item?.totalPrice}</p>
</div>
<div className='col-3'>
<p className='text-black pid3' >{item?.totalPriceAfterDiscount}</p>
</div>
<div className='col-3'>
<p className='text-black pid3' >{item?.orderStatus}</p>
</div>

<div className='col-12'>
<div className='row py-3 ' style={{backgroundColor:"#090d11"}}>
<div className='col-3'>
<h5 className='text-white h5id1'>Nombre de Producto</h5>
</div>
<div className='col-3'>
<h5 className='text-white h5id2'>Cantidad</h5>
</div>
<div className='col-3'>
<h5 className='text-white h5id3'>Precio</h5>
</div>
<div className='col-3'>
<h5 className='text-white h5id'>Color</h5>
</div>


{
	item?.orderItems?.map((i, index) => {
		return(
			
<div className='col-12' key={index}>
<div style={{backgroundColor:"#cfdeee"}} className='row p-3'>
<div className='col-3'>
<p className='text-black ' >{i?.product?.title}</p>
</div>
<div className='col-3'>
<p className='text-black pid2' >{i?.quantity}</p>
</div>
<div className='col-3'>
<p className='text-black h5id4' >{i?.price}</p>
</div>
<div className='col-3'>
<ul className='colors ps-0'>
  <li className='pid4' style={{backgroundColor: i?.color}}></li>
</ul>
</div>
	 
</div>
</div>
		)
	})
}
</div>
</div>
</div>
		)
	})
}
</div>
</div>
</Container>
</>

)
}

export default Orders