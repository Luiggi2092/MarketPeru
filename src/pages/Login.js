import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import {Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import {useFormik} from "formik"
import * as yup from 'yup';
import { loginUser } from '../features/user/userSlice'
import { useEffect } from 'react'
import Meta from '../components/Meta'



const loginSchema = yup.object({
  email: yup.string().email("Ingrese email válido").required("Dirección de email es requerido"),
  password: yup.string().required("Contraseña Requerida"),

});



const Login = () => {

const authState = useSelector(state => state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();

const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
},
validationSchema:loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));    
},
});



useEffect(() => {
if(authState.user !== null  && authState.isError === false){
  navigate("/")
}
}, [authState])




  return (
    
<>
<Meta title={"Acceso"}/>
<BreadCrumb title="Acceso"/>
<Container class1='login-wrapper py-5 home-wrapper-2'> 
<div className='row'>
<div className='col-12'>
<div className='auth-card'>
<h3 className='text-center mb-3'>Acceso</h3>
<form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>

<CustomInput type='email' name='email' placeholder='email'
value={formik.values.email}
onChange={formik.handleChange("email")}
onBlur={formik.handleBlur("email")}
/>
<div className='error'>
{formik.touched.email && formik.errors.email}
</div>

<CustomInput type='password' name='password' placeholder='contraseña'
value={formik.values.password}
onChange={formik.handleChange("password")}
onBlur={formik.handleBlur("password")}
/>
<div className='error'>
{formik.touched.password && formik.errors.password}
</div>


<div> 
  <Link to='/forgot-password'>Has olvidado tu contraseña.?</Link>

<div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
<button className='button border-0' type='submit'>Acceso</button>
<Link to="/signup" className='button signup'>Inscribirse</Link>
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

export default Login