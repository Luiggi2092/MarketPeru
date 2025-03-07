import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "./contactService";
import { toast } from 'react-toastify';






export const createQuery = createAsyncThunk("contact/post", async(contactData, thunkAPI) => {
    try {
        return await contactService.postQuery(contactData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
        
    }
})



const contactState = {
    contact: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}


export const contactSlice = createSlice({
   name: "contact",
   initialState: contactState,
   reducers: {},
   extraReducers:(builder) => {
    builder
    
.addCase(createQuery.pending, (state)=> {
        state.isLoading = true;

})
.addCase(createQuery.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
    state.isSuccess = true;
    state.contact = action.payload;
    if(state.isSuccess === true){
        toast.success("Mensaje Enviado Exitosamente");
}
})

.addCase(createQuery.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.isSuccess = false;
    state.message = action.error;
    if(state.isError === true){
        toast.success("Algo Salió Mal");
}

})
}
});

export default contactSlice.reducer;
