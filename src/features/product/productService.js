import axios from "axios";
import { config, base_url } from '../../utils/axiosconfig';




  const getProducts = async (data) => {
  
    const response = await axios.get(`${base_url}product?${data?.brand?`brand=${data?.brand}&&` : ""}${data?.tag?`tags=${data?.tag}&&` : ""}${data?.category?`category=${data?.category}&&` : ""}${data?.minPrice?`price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice?`price[lte]=${data?.maxPrice}&&` : ""}${data?.sort?`sort=${data?.sort}&&` : ""}`);  
  if(response.data){
    return response.data;
  } 
  };
  const getSingleProduct = async (id) => {
    const response = await axios.get(`${base_url}product/${id}`);
  if(response.data){
    return response.data;
  } 
  };

  



  const rateProduct = async (id,data) => {
    console.log(id);
    console.log(data);
    const response = await axios.put(`${base_url}product/rating/${id}`, data, config);
  if(response.data){
    return response.data;
  } 
  };

  const productCompare = async (data) => {
    const response = await axios.get(`${base_url}product/compare`, data, config);
  if(response.data){
    return response.data;
  } 
  };



  export const productService = {
    getProducts,
    getSingleProduct,
    rateProduct,
    productCompare,
  }