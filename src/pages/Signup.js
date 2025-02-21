import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import {useFormik} from "formik"
import * as yup from 'yup';
import CustomInput from '../components/CustomInput'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/user/userSlice';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'






const signUpSchema = yup.object({
  firstname: yup.string().required("Nombre Requerido"),
  lastname: yup.string().required("Apellido Requerido"),
  email: yup.string().email("Ingrese email válido").required("Dirección de email es requerido"),
  mobile: yup.string().required("Teléfono no es obligatorio"),
  password: yup.string().required("Contraseña Requerida"),

});




const Signup = () => {
const dispatch = useDispatch();
const authState = useSelector(state => state.auth);
const navigate = useNavigate();

const formik = useFormik({
  initialValues: {
  firstname: '',
  lastname: '',
  email: '',
  mobile: '',
  password: '',
},
  validationSchema:signUpSchema,
    onSubmit: (values) => {
    dispatch(registerUser(values))
},
});



useEffect(() => {
  if (authState.createdUser) {
    navigate("/login");
  }
}, [authState.createdUser]);






  return (




<>
<Meta title={"Registro"}/>
<BreadCrumb title="Registro"/>
<Container class1='login-wrapper py-5 home-wrapper-2'>
<div className='row'>
<div className='col-12'>
<div className='auth-card'>
<h3 className='text-center mb-3'>Regitro</h3>
<form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
<CustomInput type='text' name='firstname' placeholder='Nombre'
  value={formik.values.firstname}
  onChange={formik.handleChange("firstname")}
  onBlur={formik.handleBlur("firstname")}
/>
<div className='error'>
   {formik.touched.firstname && formik.errors.firstname}
</div>

<CustomInput type='text' name='lastname' placeholder='Apellido'
  value={formik.values.lastname}
  onChange={formik.handleChange("lastname")}
  onBlur={formik.handleBlur("lastname")}
/>
<div className='error'>
  {formik.touched.lastname && formik.errors.lastname}
</div>

<CustomInput type='email' name='email' placeholder='Email'
  value={formik.values.email}
  onChange={formik.handleChange("email")}
  onBlur={formik.handleBlur("email")}
/>
<div className='error'>
  {formik.touched.email && formik.errors.email}
</div>


<CustomInput type='tel' name='mobile' placeholder='Numero de Telefono'
  value={formik.values.mobile}
  onChange={formik.handleChange("mobile")}
  onBlur={formik.handleBlur("mobile")}
/>
<div className='error'>
  {formik.touched.mobile && formik.errors.mobile}
</div>


<CustomInput type='password' name='password' placeholder='Contraseña'
  value={formik.values.password}
  onChange={formik.handleChange("password")}
  onBlur={formik.handleBlur("password")}
/>
<div className='error'>
  {formik.touched.password && formik.errors.password}
</div>


<div>    
<div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
<button className='button border-0'>Registro</button>
    
</div>
</div>
</form>
</div>
</div>
</div>
</Container>


</>


)
}

export default Signup
