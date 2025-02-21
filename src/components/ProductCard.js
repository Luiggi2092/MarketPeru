import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';
import wish from '../images/wish.svg';
import relopink from '../images/relopink.jpg';
import motorev from '../images/motorev.jpg';
import prodcompare from '../images/prodcompare.svg';
import view from '../images/view.svg';
import addcart from '../images/add-cart.svg';
import {addToWishlist} from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';








const ProductCard = (props) => {


 const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
 const CustomerJSON = localStorage.getItem('customer');
 const customer = JSON.parse(CustomerJSON);
 const userId =  localStorage.getItem('customer') && customer._id;
 const navigate = useNavigate()
 const dispatch = useDispatch();
 let location= useLocation();


const {grid, data} = props;


const addToWish = (productId,userId) => {
	dispatch(addToWishlist({productId,userId}));
}


if (!data || !Array.isArray(data)) {
	return <div>No hay datos disponibles</div>;
}
  



  return (
<>
{data?.map((item, index) => {
	const handleExpandClick = () => {
		setIsDescriptionExpanded(!isDescriptionExpanded);
}
    return (
			
<div key={index}
	className={`${location.pathname == "/product" ? `gr-${grid}`: "col-3"}`}>

<div className='product-card position-relative'>
{/* <div className='wishlist-icon position-absolute'>
 <button className='border-0 bg-transparent' onClick={(e) => { addToWish(item?._id,userId)}}>
 <img src={wish} alt='wishlist'/>
</button>
</div> */}
	
<div /*className='product-image'*/>
<img src={item?.images && item?.images[0]?.url ? item.images[0].url : item.images[0].url} 
className="img-fluid mx-auto" alt='product image'/>
{/* <!--<img src={relopink} 
className="img-fluid mx-auto" alt='product image'/>--> */}
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
<p  className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}
    style={{
    maxHeight: isDescriptionExpanded ? 'none' : '60px',
    overflow: 'hidden',
}}
 dangerouslySetInnerHTML={{ __html: item?.description }}
>			 
</p>

<p className='price'>$ {item?.price}</p>
</div>
			
<div className='action-bar position-absolute'>
<div className='d-flex flex-column gap-15'>

{ <Link  to={"/product/" + item?._id} className='border-0 bg-transparent'>
		<img src={view} alt='view'/>
</Link> }

<Link to={"/cart/" + item?._id} className='border-0 bg-transparent'>
		<img src={addcart} alt='addcart'/>
</Link>
</div>
</div>
</div>
</div> 	

)
})
}
</>

)
}

export default ProductCard




