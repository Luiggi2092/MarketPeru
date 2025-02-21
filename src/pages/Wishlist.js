import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import cross from '../images/cross.svg';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist,removeToWishlist } from '../features/user/userSlice';
//import { addToWishlist } from '../features/user/userSlice';
import { toast } from 'react-toastify'; // Importar toast directamente







const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
  const [deleteMessage, setDeleteMessage] = useState('');
  const CustomerJSON = localStorage.getItem('customer');
  const customer = JSON.parse(CustomerJSON);
  const id = localStorage.getItem('customer') && customer._id;
   
  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist(id));
  }


  // Corregir error/////////////////////////////////////////////////////////////////////////////////////
const removeFromWishlist = (productId,userId) => {
 
  console.log(productId);
  console.log(userId);

dispatch(removeToWishlist({productId,userId}));
  setTimeout(() => {
  dispatch(getUserProductWishlist(id));
// toast.success('Producto agregado a la lista de favoritos');

}, 300);
}



  useEffect(() => {
    getWishlistFromDb();
  }, []);



  return (
    <>
<Meta title={"Favoritos"} />
<BreadCrumb title="Favoritos" />
<Container className='wishlist-wrapper home-wrapper-2 py-5'>
<div className='row'>
  {wishlistState && wishlistState.length === 0 && (
<div className='text-center fs-5'>No Tienes Favoritos</div>
)}
  {wishlistState && wishlistState?.map((item, index) => {

return ( 
<div key={index} className='col-3 ' >
<div className='wishlist-card position-relative py-4'>
<img
    src={cross}
    className="position-absolute cross img-fluid"
    onClick={() => { removeFromWishlist(item?._id,id) }}
    alt="cross"
/>
<div className='wishlist-card-image'>
<img
  src={item?.images && item?.images[0]?.url ? item.images[0].url : ''}
  alt='watch'
  className='img-fluid w-100'
/>
</div>

<div className='py-4'>
  <h5 className='title'>{item?.title}</h5>
  <h6 className='price'>$ {item?.price}</h6>
</div>
</div>
</div>
);
})}
</div>
</Container>
</>
)
}

export default Wishlist;











// import React, { useEffect, useState } from 'react';
// import Meta from '../components/Meta';
// import BreadCrumb from '../components/BreadCrumb';
// import cross from '../images/cross.svg';
// import Container from '../components/Container';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserProductWishlist } from '../features/user/userSlice';
// import { addToWishlist } from '../features/user/userSlice';
// import { toast } from 'react-toastify'; // Importar toast directamente







// const Wishlist = () => {
//   const dispatch = useDispatch();
//   const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
//   const [deleteMessage, setDeleteMessage] = useState('');

//   const getWishlistFromDb = () => {
//     dispatch(getUserProductWishlist());
//   }


//   // Corregir error/////////////////////////////////////////////////////////////////////////////////////
// const removeFromWishlist = (id, adding) => {
//   dispatch(addToWishlist(id));
//   setTimeout(() => {
// dispatch(getUserProductWishlist());
//     if (adding) {
//   // toast.success('Producto agregado a la lista de favoritos');
// } else {
//         // toast.error('Producto eliminado de la lista de favoritos');
// }
// }, 300);
// }



//   useEffect(() => {
//     getWishlistFromDb();
//   }, [dispatch]);



//   return (
//     <>
// <Meta title={"Favoritos"} />
// <BreadCrumb title="Favoritos" />
// <Container className='wishlist-wrapper home-wrapper-2 py-5'>
// <div className='row'>
//   {wishlistState && wishlistState.length === 0 && (
// <div className='text-center fs-5'>No Tienes Favoritos</div>
// )}
//   {wishlistState && wishlistState?.map((item, index) => {

// return ( 
// <div key={index} className='col-3 ' >
// <div className='wishlist-card position-relative py-4'>
// <img
//     src={cross}
//     className="position-absolute cross img-fluid"
//     onClick={() => { removeFromWishlist(item?._id, false) }}
//     alt="cross"
// />
// <div className='wishlist-card-image'>
// <img
//   src={item?.images && item?.images[0]?.url ? item.images[0].url : ''}
//   alt='watch'
//   className='img-fluid w-100'
// />
// </div>

// <div className='py-4'>
//   <h5 className='title'>{item?.title}</h5>
//   <h6 className='price'>$ {item?.price}</h6>
// </div>
// </div>
// </div>
// );
// })}
// </div>
// </Container>
// </>
// )
// }

// export default Wishlist;
