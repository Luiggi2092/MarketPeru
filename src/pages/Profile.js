import React, { useState } from 'react'

import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux';
import {useFormik} from "formik"
import * as yup from 'yup';
import { updateProfile } from '../features/user/userSlice'
import { LiaUserEditSolid } from "react-icons/lia";



const profileSchema = yup.object({
  firstname: yup.string().required("Nombre requerido"),
  lastname: yup.string().required("Apellido requerido"),
  email: yup.string().required("Dirección de email requerida"),
  mobile: yup.string().required("Teléfono Requerido"),

});




const Profile = () => {




const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const config2 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};



const userState = useSelector(state => state.auth.user);
const dispatch = useDispatch();
const CustomerJSON = localStorage.getItem('customer');
const customer = JSON.parse(CustomerJSON);
const id = localStorage.getItem('customer') && customer._id;
  
// const navigate = useNavigate();
const [edit, setEdit] = useState(true)




const formik = useFormik({
		enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
},
validationSchema: profileSchema,
    onSubmit: (values) => {
		dispatch(updateProfile({id,data: values, config2: config2}));
    
setEdit(true)
  // navigate("/")
	    
}
});





  return (

<>
<Meta title={"Mi Perfil"}/>
<BreadCrumb title="Mi Perfil"/>
<Container class1='cart-wrapper home-wrapper-2 py-5'>
<div className='row'> 
<div className='col-12'>
<div className='d-flex justify-content-between align-items-center'>
<h3 className='my-3'> Actualizar Perfil</h3>
<LiaUserEditSolid  className="fs-2" style={{ color: '#07918a' }} onClick={()=> setEdit(false)}/>

</div>
</div>

<div className='col-12'>
<form onSubmit={formik.handleSubmit}>
<div className="mb-3">
    <label htmlFor="example1" className="form-label">Nombre</label>
    <input type="text" name="firstname" disabled={edit}  className="form-control" id="example1" 
		value={formik.values.firstname} 
		onChange={formik.handleChange("firstname")}
		onBlur={formik.handleBlur("firstname")}
/>
<div className='error'>
			{formik.touched.firstname && formik.errors.firstname}
</div>
</div>
<div className="mb-3">
    <label htmlFor="example1" className="form-label">Apellido</label>
    <input type="text" name="lastname" disabled={edit} className="form-control" id="example1" 
		value={formik.values.lastname}
		onChange={formik.handleChange("lastname")}
		onBlur={formik.handleBlur("lastname")}
/>
<div className='error'>
			{formik.touched.lastname && formik.errors.lastname}
</div>
</div>
<div className="mb-3">
    <label htmlFor="example2" className="form-label">Email</label>
    <input type="email" name="email" disabled={edit}  className="form-control" id="example2" aria-describedby="emailHelp" 
		value={formik.values.email}
		onChange={formik.handleChange("email")}
		onBlur={formik.handleBlur("email")}
/>
<div className='error'>
			{formik.touched.email && formik.errors.email}
</div>
</div>
<div className="mb-3">
    <label htmlFor="exampleInputEmail2" className="form-label">N° De Teléfono</label>
    <input type="number" name="mobile" disabled={edit}  className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" 
		value={formik.values.mobile}
		onChange={formik.handleChange("mobile")}
		onBlur={formik.handleBlur("mobile")}
/>
<div className='error'>
			{formik.touched.mobile && formik.errors.mobile}
</div>
</div>
{
	edit === false &&  <button type="submit" className="btn btn-primary">Guardar</button>
}

 
</form>
</div>
</div>
</Container>
</>
)
}

export default Profile