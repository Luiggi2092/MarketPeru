import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import {useFormik} from "formik"
import * as yup from 'yup';
import { forgotPasswordToken } from '../features/user/userSlice'



const emailSchema = yup.object({
  email: yup.string().email("Email no válido").required("Dirección de email es requerido"),
 

});


const Forgotpassword = () => {



// const authState = useSelector(state => state.auth);
const navigate = useNavigate();
const dispatch = useDispatch();




const formik = useFormik({
  initialValues: {
    email: '',
},
validationSchema: emailSchema,
  onSubmit: (values) => {
    dispatch(forgotPasswordToken(values));
   
},
});







  return (

<>
<Meta title={"Olvido Contraseña"}/>
<BreadCrumb title="Olvido Contraseña"/>
<Container class1='login-wrapper py-5 home-wrapper-2'>
<div className='row'>
<div className='col-12'>
<div className='auth-card'>
<h3 className='text-center mb-3 mt-2'>Restablecer Contraseña</h3>
<p className='text-center my-2'>Le enviaremos un correo electrónico para restablecer su contraseña.</p>
<form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
<CustomInput type='email' name='email' placeholder='email'
value={formik.values.email}
onChange={formik.handleChange("email")}
onBlur={formik.handleBlur("email")}
/>
<div className='error text-center'>
{formik.touched.email && formik.errors.email}
</div>


<div>  
<div className='mt-3 d-flex justify-content-center flex-column gap-15 align-items-center'>
<button className='button border-0' type='submit'>Enviar</button>
<Link to='/login'>Cancelar</Link>

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

export default Forgotpassword