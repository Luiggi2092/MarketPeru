import axios from "axios";
import { base_url } from '../../utils/axiosconfig';
import { toast } from "react-toastify";




const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};


const register = async (userData) => {
    const response = await axios.post(`${base_url}user/register`, userData);
  if(response.data){
    if (response.data) {
     
    return response.data;
    }
  } 
  };


  const login = async (userData) => {
    console.log(userData);
    const response = await axios.post(`${base_url}user/login`, userData);
    console.log(response.data);
  if(response.data){
    localStorage.setItem("customer", JSON.stringify(response.data));
    return response.data;
  } 
  };


  const getUserWishlist = async (id) => {
    const response = await axios.get(`${base_url}user/wishlist/${id}`, config);
  if(response.data){
    return response.data;
  }
  };


   const addToWishlist = async (productId,userId) => {
     const response = await axios.post(`${base_url}user/wishlist/${userId}`, {productId}, config);
  if(response.data){
     toast.success("Producto Agregado A Favoritos");
     return response.data;
   } 
   };

   

   const removeToWishlist = async (productId,userId) => {
    const response = await axios.delete(`${base_url}user/wishlistdelete/?productId=${productId}&userId=${userId}`, config);
 if(response.data){
    return response.data;
  } 
  };

  const getUserCompare = async (data) => {
    const response = await axios.get(`${base_url}user/compare`, data, config);
  if(response.data){
    return response.data;
  }
  };


  const addToCart = async (id,cartData) => {
    console.log(cartData);
    console.log(id);
    try{
    const response = await axios.post(`${base_url}user/cart/add/${id}`, cartData,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data);  
  if(response.data){
    return response.data;
  }}
  catch(error){
    console.log(error)
  }
  };


  const getCart = async (id) => {
    console.log(id);
    try{ 
    const response = await axios.get(`${base_url}user/cart/${id}`);
     console.log(response.data);
  if(response.data){
    return response.data;
  }}catch(error){
     console.log(error)
  }
  };


  const removeProductFromCart = async (id,userId) => {
    console.log(id);
    console.log(userId);
    const response = await axios.delete(`${base_url}user/delete-product-cart/${id}/${userId}`);
  if(response.data){
    return response.data;
  }
  };  



  const updateProductFromCart = async (id,userId,newQuantity) => {
    const response = await axios.patch(`${base_url}user/update-product-cart/${id}/${userId}/?quantity=${newQuantity}`, config);
  if(response.data){
    return response.data;
  }
  };


  const createOrder = async (orderDetail) => {
    const response = await axios.post(`${base_url}user/cart/create-order`, orderDetail);
  if(response.data){
    return response.data;
  }
  };


  const getUserOrders = async (id) => {
    const response = await axios.get(`${base_url}user/getmyorders/${id}`, config);
  if(response.data){
    return response.data;
  }
  };


  const updateUser = async (id,data) => {
    console.log(data);
    const response = await axios.put(`${base_url}user/edit-user/${id}`, data, data.config2);
  if(response.data){
    return response.data;
  }
  };


  const forgotPassToken = async (data) => {
    const response = await axios.post(`${base_url}user/forgot-password-token`, data) ;
  if(response.data){
    return response.data;
  }
  };


  const resetPass = async (data) => {
    const response = await axios.put(`${base_url}user/reset-password/${data.token}`, {password:data?.password});
  if(response.data){
    return response.data;
  }
  };



  const emptyCart = async (data) => {
    const response = await axios.delete(`${base_url}user/empty-cart`, data);
  if(response.data){
    return response.data;
  }
  };





  export const authService = {
    register,
    login,
    getUserWishlist,
    addToWishlist,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductFromCart,
    createOrder,
    getUserOrders,
    removeToWishlist,
    updateUser,
    forgotPassToken,
    resetPass,
    emptyCart,
    getUserCompare,
  }