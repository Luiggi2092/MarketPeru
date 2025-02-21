import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";





export const getAllProducts = createAsyncThunk("product/get", async(data, thunkAPI) => {
    try {
        return await productService.getProducts(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
        
    }
})
export const getAProduct = createAsyncThunk("product/getAProduct", async(id, thunkAPI) => {
    try {
        return await productService.getSingleProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
        
    }
})



export const addRating = createAsyncThunk("product/rating", async({id,data}, thunkAPI) => {
    try {
        console.log(id);
        console.log(data);
        return await productService.rateProduct(id,data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
        
    }
})


export const addCompare = createAsyncThunk("product/compare", async(data, thunkAPI) => {
    try {
        return await productService.addToCompare(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
        
    }
})


const productState = {
    product: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const productSlice = createSlice({
   name: "product",
   initialState: productState,
   reducers: {},
   extraReducers:(builder) => {
    builder
    
.addCase(getAllProducts.pending, (state)=> {
        state.isLoading = true;

})
.addCase(getAllProducts.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
    state.isSuccess = true;
    state.product = action.payload;
})

.addCase(getAllProducts.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.error;

})

.addCase(getAProduct.pending, (state) => {
    state.isLoading = true;
})

.addCase(getAProduct.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
    state.isSuccess = true;
    state.singleproduct = action.payload;
    // if(state.isSuccess === true){
    //     toast.info("Producto Traido Exitosamente!");
    // }
})

.addCase(getAProduct.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.error;

})
.addCase(addRating.pending, (state) => {
    state.isLoading = true;
})

.addCase(addRating.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
    state.isSuccess = true;
    state.rating = action.payload;
    state.message = "Reseña Agregada"
     if(state.isSuccess){
        toast.success("Reseña Agregada");
    }
    
})

.addCase(addRating.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.error;

})


.addCase(addCompare.pending, (state) => {
    state.isLoading = true;
})

.addCase(addCompare.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
    state.isSuccess = true;
    state.compare = action.payload;
    state.message = "Producto a Comparar"
     if(state.isSuccess){
        toast.success("Producto a Comparar");
    }
    
})

.addCase(addCompare.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.error;

})

}
});

export default productSlice.reducer;
