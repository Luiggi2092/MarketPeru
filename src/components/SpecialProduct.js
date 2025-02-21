import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';




const SpecialProduct = (props) => {
  
const {title, brand, price, totalrating, sold, quantity, id,images } = props;


const handleClick = () => {
  // Desplázate al inicio de la página
  window.scrollTo(0, 0);
};
  
  return (

<div className='col-6'>
<div className='special-product-card'>
<div className='d-flex justify-content-between'>
<div>
<img src={images} className="img-fluid w-60" alt='watch'/>
</div>
<div className='special-product-content'>
<h5 className='brand'>{brand}</h5>
<h6 className='title'>{title}</h6>
<ReactStars
  count={5}
  size={24}
  value={parseFloat(totalrating)}
  edit={false}
  activeColor="#ffd700"
/>
<p className='price'>
  <span className='red-p'>${price} </span>&nbsp;
</p>
<div className='prod-count my-3'>
<p>Productos: {quantity}</p>
<div className="progress"> 
<div className="progress-bar"
role="progressbar" 
style={{ width: quantity / quantity + sold * 100 +  "%" }}
aria-label="Basic example" 
aria-valuenow={ quantity / quantity + sold * 100 } 
aria-valuemin={quantity} 
aria-valuemax={sold + quantity}></div>
</div>
</div>

<Link className='button' to={"/product/" + id}  onClick={handleClick} >Ver</Link>
</div>
</div>
</div>
</div>

)
}

export default SpecialProduct