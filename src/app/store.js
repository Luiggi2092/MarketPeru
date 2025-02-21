import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/user/userSlice';
import productReducer from '../features/product/productSlice';
import blogReducer from '../features/blogs/blogSlice';
import contactReducer from '../features/contact/contactSlice';
// import thunk from 'redux-thunk';
// import cartReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    blog: blogReducer,
    contact: contactReducer,
    // middleware: [thunk],
  },
});
