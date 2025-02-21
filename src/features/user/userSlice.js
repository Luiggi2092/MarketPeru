import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { authService } from "./userService";
import { toast } from "react-toastify";








export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await authService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
        
    }
})


export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
        
    }
})

export const getUserProductWishlist = createAsyncThunk("user/wishlist", async (id,thunkAPI) => {
  try {
    return await authService.getUserWishlist(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


export const addToWishlist = createAsyncThunk("user/wishlist", async({productId,userId}, thunkAPI) => {
    try {
        return await authService.addToWishlist(productId,userId);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
        
    }
})

export const removeToWishlist = createAsyncThunk("user/wishlistdelete", async({productId,userId}, thunkAPI) => {
  try {
      console.log(productId);
      console.log(userId);
      return await authService.removeToWishlist(productId,userId);
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
      
  }
})



export const getUserProductCompare = createAsyncThunk("user/compare", async (data, thunkAPI) => {
  try {
    return await authService.getUserCompare(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})



export const addProductToCart = createAsyncThunk("user/cart/add", async ({id,cartData}, thunkAPI) => {
  try {
    console.log(id)
    console.log(cartData);
    return await authService.addToCart(id,cartData);
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


export const getUserCart = createAsyncThunk("user/cart", async (id,thunkAPI) => {
  try {
    console.log(id);
    if(id !== null){
    return await authService.getCart(id);
    }
      

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})



export const getOrders = createAsyncThunk("user/order/get", async (id,thunkAPI) => {
  try {
    return await authService.getUserOrders(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


export const deleteCartProduct = createAsyncThunk("user/cart/product/delete-product-cart", async ({ id, userId }, thunkAPI) => {
  try {
    console.log(id);
    console.log(userId);
    return await authService.removeProductFromCart(id, userId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})



export const updateCartProduct = createAsyncThunk("user/cart/product/update", async ({id, userId, newQuantity}, thunkAPI) => {
  try {
    console.log(id);
    console.log(userId);
    console.log(newQuantity);
    return await authService.updateProductFromCart(id,userId,newQuantity);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


export const createAnOrder = createAsyncThunk("user/cart/create-order", async (orderDetail, thunkAPI) => {
  try {
    return await authService.createOrder(orderDetail);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


export const updateProfile = createAsyncThunk("user/profile/update", async ({id,data}, thunkAPI) => {
  try {
    return await authService.updateUser(id,data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})



export const forgotPasswordToken = createAsyncThunk("user/password/token", async (data, thunkAPI) => {
  try {
    return await authService.forgotPassToken(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})


export const resetPassword = createAsyncThunk("user/password/reset", async (data, thunkAPI) => {
  try {
    return await authService.resetPass(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})



export const deleteUserCart = createAsyncThunk("user/cart/delete", async ( data, thunkAPI) => {
  try {
    return await authService.emptyCart(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})







export const resetState = createAction("Reset_all");
const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
    user: getCustomerfromLocalStorage,
    //wishlist: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };



export const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {},
   extraReducers:(builder) => {
    builder
   
    

.addCase(registerUser.pending, (state)=> {
        state.isLoading = true;

})
.addCase(registerUser.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
    state.isSuccess = true;
    state.createdUser = action.payload;
    if(state.isSuccess === true){
        toast.info("Usuario Creado Con Éxito");
}
})

.addCase(registerUser.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.error;
      if(state.isError === true){
        toast.error(action.payload.response.data.message);
}
})

.addCase(loginUser.pending, (state)=> {
  state.isLoading = true;

})

.addCase(loginUser.fulfilled, (state, action) => {
  state.isLoading = false;
   state.isError = false;
   state.isSuccess = true;
   state.user = action.payload;
    if(state.isSuccess === true){
        //localStorage.setItem("token", action.payload.token)
       toast.info("Usuario Validado Con Éxito");
}
})

.addCase(loginUser.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error;
     if(state.isError === true){
       toast.error(action.payload.response.data.message);
}
})
.addCase(getUserProductWishlist.pending, (state) => {
  state.isLoading = true;

})
.addCase(getUserProductWishlist.fulfilled, (state, action) => {
  state.isLoading = false;
   state.isError = false;
   state.isSuccess = true;
   state.wishlist = action.payload;
})

.addCase(getUserProductWishlist.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error;
   if (state.isSuccess === false) {
    toast.error("Algo salió mal");
  }
})


.addCase(addProductToCart.pending, (state) => {
  state.isLoading = true;

}) 

.addCase(addProductToCart.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.cartProduct = action.payload;
  if (state.isSuccess) {
    toast.success("Producto Agregado Al Carrito");
  }
})

.addCase(addProductToCart.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error.message;
   console.error("Error al agregar producto al carrito:", action.error);
   toast.error(action.error.message);

})


.addCase(getUserCart.pending, (state) => {
  state.isLoading = true;

}) 

.addCase(getUserCart.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.cartProducts = action.payload;
})

.addCase(getUserCart.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error.message;
   

})

.addCase(deleteCartProduct.pending, (state) => {
  state.isLoading = true;

}) 

.addCase(deleteCartProduct.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.deletedCartProduct = action.payload;
  state.message = "Producto eliminado"
//   if(state.isSuccess){
//      toast.success("Producto eliminado");
//  }
})

.addCase(deleteCartProduct.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error.message;
   if (state.isSuccess === false) {
    toast.error("Algo Salió Mal");
  }

})


.addCase(updateCartProduct.pending, (state) => {
  state.isLoading = true;

}) 

.addCase(updateCartProduct.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.updatedCartProduct = action.payload;
  // if (state.isSuccess) {
  //   toast.success("Producto Actualizado Con Exito");
  // }
})

.addCase(updateCartProduct.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error.message;
   if (state.isError === false) {
    toast.error("Algo Salió Mal");
  }

})


.addCase(createAnOrder.pending, (state) => {
  state.isLoading = true;

}) 

.addCase(createAnOrder.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.orderedProduct = action.payload;
  if (state.isSuccess) {
    toast.success("Orden Creada Exitosamente");
  }
})

.addCase(createAnOrder.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error.message;
   if (state.isError === false) {
    toast.error("Algo Salió Mal");
  }

})


.addCase(getOrders.pending, (state) => {
  state.isLoading = true;

}) 

.addCase(getOrders.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.getorderedProduct = action.payload;
 
})

.addCase(getOrders.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error.message;


})


.addCase(updateProfile.pending, (state) => {
  state.isLoading = true;

}) 

.addCase(updateProfile.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.updatedUser = action.payload;  
let currentUserData = JSON.parse(localStorage.getItem("customer"))

let newUserData = {
  _id: currentUserData?._id,
  token:currentUserData.token,
  firstname: action?.payload?.firstname,
  lastname: action?.payload?.lastname,
  email: action?.payload?.email,
  mobile: action?.payload?.mobile,
}
console.log(newUserData);
  localStorage.setItem("customer", JSON.stringify(newUserData))
  state.user = newUserData;
  toast.success("Perfil Actualizado");
 
})

.addCase(updateProfile.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error.message;
   if (state.isSuccess === false) {
    toast.error("Algo salió mal");
  }

})


.addCase(forgotPasswordToken.pending, (state) => {
  state.isLoading = true;

}) 

.addCase(forgotPasswordToken.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.token = action.payload;
  if (state.isSuccess) {
    toast.success("Email Enviado con Exito");
  }
 
})

.addCase(forgotPasswordToken.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error.message;
   if (state.isSuccess === false) {
    toast.error("Algo salió mal");
  }


})


.addCase(resetPassword.pending, (state) => {
  state.isLoading = true;

}) 

.addCase(resetPassword.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.pass = action.payload;
  if (state.isSuccess) {
    toast.success("Contraseña Actualizado con Éxito");
  }
 
})

.addCase(resetPassword.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error.message;
   if (state.isSuccess === false) {
    toast.error("Algo salió mal");
  }


})


.addCase(deleteUserCart.pending, (state) => {
  state.isLoading = true;

}) 

.addCase(deleteUserCart.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.deletedCart = action.payload; 
})

.addCase(deleteUserCart.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error.message;

})


.addCase(getUserProductCompare.pending, (state) => {
  state.isLoading = true;

}) 

.addCase(getUserProductCompare.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.compare = action.payload; 
})

.addCase(getUserProductCompare.rejected, (state, action) => {
   state.isLoading = false;
   state.isError = true;
   state.isSuccess = false;
   state.message = action.error.message;

})
.addCase(resetState, () => initialState);
}
});

export default authSlice.reducer;



