import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import ProductCard from '../components/ProductCard'
import ReactStars from "react-rating-stars-component";
import Color from '../components/Color';
import { IoMdGitCompare } from "react-icons/io";
import { FaHeartbeat } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { addRating, getAProduct, getAllProducts } from '../features/product/productSlice';
import { toast } from 'react-toastify';
import { addProductToCart, getUserCart } from '../features/user/userSlice';






const SingleProduct = () => {


const [color, setColor] = useState(null);
const [quantity, setQuantity] = useState(1);
const [alreadyAdded, setAlreadyAdded] = useState(false);
const [star, setStar] = useState(null);
const [comment, setComment] = useState(null);
const CustomerJSON = localStorage.getItem('customer');
const customer = JSON.parse(CustomerJSON);
const userId =  localStorage.getItem('customer') && customer._id;


console.log(star);
console.log(comment);

const addRatingToProduct = () => {
  console.log(star);
  console.log(comment);
  console.log(userId);
  console.log(getProductId);
  
  const data = {
    star: star, comment: comment, prodId: getProductId
  }

  if(star === null) {
    toast.error("Por Favor Califica Éste Producto")
    return false
  } else 
  if(comment === null ) {
    toast.error("Por Favor Escriba Una Reseña Sobre El Producto")
    return false
  } else {
    dispatch(addRating({userId,data}))
    setTimeout(() => {
      dispatch(getAProduct(getProductId))
    }, 100)
   
  }
  return false
}


const location = useLocation()
const navigate = useNavigate();
const dispatch = useDispatch();

const getProductId = location.pathname.split("/")[2]
const productState = useSelector(state => state?.product?.singleproduct)
const productsState = useSelector(state => state?.product?.product)
const cartState = useSelector(state => state?.auth?.cartProducts)
const productCars = cartState?.products;



console.log(getProductId);

useEffect(() => {
dispatch(getAProduct(getProductId))
dispatch(getUserCart())
dispatch(getAllProducts())
},[]);

//useEffect(() => {
 // dispatch(getUserCart(id))
//},[cartState]);



/*useEffect(() => {
  if (cartState) {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
        break; // Termina el bucle una vez que se ha encontrado una coincidencia
      }
    }
  }
}, [cartState, getProductId]);*/




const uploadCart = () => {
  console.log('Color:', color);
  console.log('Product ID:', productState._id);
  console.log('Price:', productState.price);
  console.log('quantity', quantity)
  const id = customer._id;
  const productId = productState?._id
  const price = productState?.price
  console.log(id);
  const cartData = {
    productId,
    quantity,
    color,
    price
  }
  console.log(cartData);
  if (color == null || !productState?._id || !productState?.price) {
    toast.error("Por favor, selecciona el color y verifica el producto.");
    return false;
  } else {
    dispatch(addProductToCart({id,cartData}))
    navigate("/cart")
   
    // toast.success("Producto agregado al carrito exitosamente.");
  }
};



const props = {
  width: 150, 
  height: 150, 
  zoomWidth: 180, 
  img: productState?.images[0]?.url ? productState?.images[0]?.url : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg" 

};


const [orderedProduct, setOrderedProduct] = useState(false)



const copyToClipboard = (text) => {
  console.log('text', text)
  var textField = document.createElement('textarea')
  textField.innerText = text
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
}




const [popularProduct, setPopularProduct] = useState([]);

useEffect(() => {
  let data = []
  for (let index = 0; index < productsState.length; index++) {
    const element = productsState[index];
    if(element.tags === "popular") {
      data.push(element)
    }
    setPopularProduct(data)
  } 
  }, [productState])
  console.log(popularProduct)







const closeModal = () => {}


  return (

<>
<Meta title={"Nombre Producto"}/>
<BreadCrumb title={productState?.title}/>
<Container class1='main-product-wrapper py-5 home-wrapper-2'>
<div className='row'>
<div className='col-6'>
<div className='main-product-image'>
 <div>
{/* <ReactImageZoom {...props} />   */}
<img src={productState?.images[0]?.url}/>
</div>
</div>

<div className='other-product-images d-flex flex-wrap gap-15'>
  
{Array.isArray(productState?.images) && productState.images.length > 0 && 
  productState.images.map((item, index) => {
    return(
      <div key={index}>
      <img src={item.url} className='img-fluid' alt='' />
  </div>
    )
  })}


{/* <div>
  <img src='https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg' 
className='img-fluid' 
alt=''/>
</div> */}
</div>
</div>


<div className='col-6'>
<div className='main-product-details'>
<div className='border-bottom'> 
  <h3 className='title'>
    {productState?.title}
  </h3>
</div>
<div className='border-bottom py-3'>
<p className='price'>$ {productState?.price}</p>
<div className='d-flex align-items-center gap-10'>
<ReactStars
    count={5}
    size={24}
    value={productState?.totalratings}
    edit={false}
    activeColor="#ffd700"
/>
<p className='mb-0 t-review'>(2 reseñas)</p>
</div>
<a className="review-btn" href='#review'>Escribe una Reseña</a>
</div>

<div className='border-bottom py-3'>
<div className='d-flex gap-10 align-items-center my-2'>
    <h3 className='product-heading'>Tipo :</h3> 
    <p className='product-data'>Watch</p>
</div>
<div className='d-flex gap-10 align-items-center  my-2'>
    <h3 className='product-heading'>Marca :</h3> 
    <p className='product-data'>{productState?.brand}</p>
</div>
<div className='d-flex gap-10 align-items-center my-2'>
    <h3 className='product-heading'>Categoría :</h3> 
    <p className='product-data'>{productState?.category}</p>
</div>
<div className='d-flex gap-10 align-items-center my-2'>
    <h3 className='product-heading'>Etiqueta :</h3> 
    <p className='product-data'>{productState?.tags}</p>
</div>

<div className='d-flex gap-10 align-items-center my-2'>
    <h3 className='product-heading'>Disponibilidad :</h3> 
    <p className='product-data'>En Stock</p>
</div> 

{/* <div className='d-flex gap-10 flex-column mt-2 mb-3'>
    <h3 className='product-heading'>Talla :</h3> 
<div className='d-flex flex-wrap gap-15'>
    <span className='badge border border-1 bg-white text-dark border-secundary'>S</span>
    <span className='badge border border-1 bg-white text-dark border-secundary'>M</span>
    <span className='badge border border-1 bg-white text-dark border-secundary'>L</span>
    <span className='badge border border-1 bg-white text-dark border-secundary'>XL</span>
    <span className='badge border border-1 bg-white text-dark border-secundary'>XXL</span>
</div>
</div> */}

{
  alreadyAdded === false && <>
<div className='d-flex gap-10 flex-column mt-2 mb-3'>
    <h3 className='product-heading'>Color :</h3> 
    <Color setColor={setColor} colorData={productState?.color}/>
</div>
  </>
}
<div className={ alreadyAdded? "ms-0" : "ms-5" + 'd-flex align-items-center gap-15 flex-row mt-2 mb-3'}>
{
  alreadyAdded === false && <>
   <h3 className='product-heading'>Cantidad :</h3> 
<div className=''>
<input 
type='number' 
name='' 
min={1} 
max={10} 
className='form-control'
style={{ width: "70px"}} 
id=''
onChange={(e) => setQuantity(e.target.value)}
value={quantity}
/>
</div>
  </>
}

 <div className={alreadyAdded? "ms-0": "ms-5" + 'd-flex align-items-center ms-5 my-4 gap-30'}>
<button className='button border-0'
  // data-bs-toggle="modal"
  // data-bs-target="#staticBackdrop" 
  type='button'
  onClick={() => {userId ? alreadyAdded ? navigate("/cart") : uploadCart(): navigate("/login")}}
>

{alreadyAdded? "Vamos Al Carrito" :  "AÑADIR AL CARRO"}

</button>
 {/*<button className='button signup'>Compre YA!</button>*/}
</div> 
</div>
<div className='d-flex align-items-center gap-15 mt-5'>
<di>
<a href=''><IoMdGitCompare className='fs-5 me-1 mt-0' />
Añadir Comparación
</a>
</di>
<div>

<a href=''><FaHeartbeat  className='fs-5 me-1 mt-0' />
Añadir A Favoritos

</a>
</div>

</div>

<div className='d-flex gap-10 align-items-center my-2'>
    <h3 className='product-heading'>Envíos & Retornos :</h3> 
    <p className='product-data'>¡Envío y devoluciones gratis disponibles en todos los pedidos! 
    Enviamos todos los pedidos nacionales de Bs. As. En un plazo de <b>5 a 10 días hábiles. </b>
    </p>
</div>

<div className='d-flex gap-10 flex-column my-2'>
    <h3 className='product-heading'>Link de Producto :</h3> 
    <a href='javascript:void(0)' onClick={() => 
    {
      copyToClipboard(window.location.href);
    }} className=''>
   Copia Link De Producto
    </a>
</div>


</div>
</div>
</div>

</div>
</Container>


<Container class1='description-wrapper py-5 home-wrapper-2'>
<div className='row'>
<div className='col-12'>
<h4>Descripción</h4>
<div className='desc-p bg-white p-3'>

<p dangerouslySetInnerHTML={{__html: productState?.description}} >

</p>
</div>
</div>
</div>
</Container>


<Container class1='reviews-wrapper home-wrapper-2'>
<div className='row'>
<div className='col-12'>
  <h3 id="review">Comentarios</h3>
<div className='review-inner-wrapper'>
<div className='review-head d-flex justify-content-between align-items-end'>
<div>
  <h4 className='mb-2'>Opiniones de los usuarios</h4>
<div className='d-flex align-items-center gap-10'>

  <ReactStars
    count={5}
    size={24}
    value={4}
    edit={false}
    activeColor="#ffd700"
/>
<p className='mb-0'>Basado en 2 reseñas</p>
</div>
</div>


{orderedProduct && (
    <div>
<a className='text-[#07918a] text-decoration-underline' href=''>Escribe una reseña</a>
</div>

)}

</div>

<div className='review-form py-4'>
<h4 className='mb-0'>Escribe tu Comentario</h4>
<div>
<ReactStars
    count={5}
    size={24}
    value={4}
    edit={true}
    activeColor="#ffd700"
    onChange={(e)=> {
setStar(e)
    }}
/>
</div>

<div>
<textarea 
name='' 
id='' 
cols="30" 
rows="4"
placeholder='Comentarios'
onChange={(e)=> {
  setComment(e.target.value)
      }}
className='form-control w-100'>
</textarea>
</div>
<div className=' d-flex justify-content-end mt-3'>
    <button onClick={addRatingToProduct} className='button border-0 ' type="button" >Enviar Comentario</button>
</div>
</div>


<div className='reviews mt-4'>
{
  productState && productState.ratings?.map((item, index)=> {
    return (
<div key={index} className='review' >
<div className='d-flex gap-10 align-items-center'>
  {/* <h6 className='mb-0'>{i?.comment}</h6> */}
<ReactStars
    count={5}
    size={24}
    value={item?.star}
    edit={false}
    activeColor="#ffd700"
/>
</div>
<p className='mt-3'>
{item?.comment}
</p>
</div>
    )
  })
}
</div>
</div>
</div>

</div>
</Container>


<Container class1='popular-wrapper py-5 home-wrapper-2'>
<div className='row'>
<div className='col-12'>
  <h3 className='section-heading'>Productos Populares</h3>
</div>
</div>
<div className='row'>
<ProductCard  data={popularProduct}/>


</div>
</Container>


</>
)
}

export default SingleProduct