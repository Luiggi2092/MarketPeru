import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux';
import {useFormik} from "formik"
import * as yup from 'yup';
import { resetPassword } from '../features/user/userSlice'





const passwordSchema = yup.object({
  password: yup.string().email("contraseña no válida").required("Contraseña requerida"),
 

});


const Resetpassword = () => {

const dispatch = useDispatch();
const location = useLocation()
const getToken=location.pathname.split("/")[2]
console.log(getToken);
const navigate = useNavigate();


const formik = useFormik({
  initialValues: {
    password: '',
},
validationSchema: passwordSchema,
  onSubmit: (values) => {
    dispatch(resetPassword({token:getToken, password:values.password}));
    navigate("/login")
   
},
});



  return (


<>
<Meta title={"Restablecer Contraseña"}/>
<BreadCrumb title="Restablecer Contraseña"/>
<Container class1='login-wrapper py-5 home-wrapper-2'>
<div className='row'>
<div className='col-12'>
<div className='auth-card'>
<h3 className='text-center mb-3'>Restablecer Contraseña</h3>
<form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
<CustomInput type='password' name='password' placeholder='Contraseña'
value={formik.values.password}
onChange={formik.handleChange("password")}
onBlur={formik.handleBlur("password")}
/>
<div className='error text-center'>
{formik.touched.password && formik.errors.password}
</div>
<div>
<div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
<button className='button border-0'>OK</button>

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

export default Resetpassword