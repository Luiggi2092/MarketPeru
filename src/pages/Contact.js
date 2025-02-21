import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { FaHome } from "react-icons/fa";
import { MdWifiCalling3 } from "react-icons/md";
import { MdContactMail } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Container from '../components/Container';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createQuery } from '../features/contact/contactSlice';


const contactSchema = yup.object({
  name: yup.string().required("Nombre Requerido"),
  email: yup.string().email("Ingrese email válido").required("Dirección de email es requerido"),
  mobile:yup.string().default("").nullable().required("Número de Teléfono Requerido"),
  comment: yup.string().default("").nullable().required("Comentario Requerido"),

});


const Contact = () => {


 const dispatch = useDispatch()


const formik = useFormik({
initialValues: {
  name: '',
  email: '',
  mobile: '',
  comment: ''
},
validationSchema:contactSchema,
 onSubmit: values => {
	dispatch(createQuery({name: values.name, email: values.email, mobile: values.mobile, comment: values.comment}))
},
});  



  return (
<>
<Meta title={"Contactános"}/>
<BreadCrumb title="Contáctanos"/>
<Container class1='contact-wrapper py-5 home-wrapper-2'>   
<div className='row'>    
<div className='col-12'>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53559.322597518374!2d-68.82611925026215!3d-32.965325323733964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0c960c574809%3A0x57621966b9559a27!2zTWFpcMO6LCBNZW5kb3ph!5e0!3m2!1ses-419!2sar!4v1702334004033!5m2!1ses-419!2sar"
 width="600" 
 height="450" 
 className='maps border-0 w-100'
 allowFullScreen="" 
 loading="lazy" 
 referrerPolicy="no-referrer-when-downgrade"> 
 </iframe>
</div>


<div className='col-12 mt-5'>
<div className='contact-inner-wrapper d-flex justify-content-between'>
<div>
     <h3 className='contact-title mb-4'>Contáctanos</h3>
  <form action=''  onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
<div>
<input type='text' 
className='form-control' 
placeholder='Nombre'
name="name"
onChange={formik.handleChange("name")}
onBlur={formik.handleBlur("name")}
value={formik.values.name}
/>

<div className='error'>
{
	formik.touched.name && formik.errors.name
}
</div>
</div>

<div>
<input type='email' 
className='form-control' 
placeholder='Email'
name="email"
onChange={formik.handleChange("email")}
onBlur={formik.handleBlur("email")}
value={formik.values.email}
/>
<div className='error'>
{
	formik.touched.email && formik.errors.email
}
</div>
</div>


<div>
<input type='tel' 
className='form-control'
placeholder='Número de teléfono'
name="mobile"
onChange={formik.handleChange("mobile")}
onBlur={formik.handleBlur("mobile")}
value={formik.values.mobile}
/>
<div className='error'>
{
	formik.touched.mobile && formik.errors.mobile
}
</div>
</div>
<div>


<textarea 
id='' 
cols="30" 
rows="4"
className='form-control w-100'
name="comment"
placeholder='Comentarios'
onChange={formik.handleChange("comment")}
onBlur={formik.handleBlur("comment")}
value={formik.values.comment}
></textarea>
<div className='error'>
{
	formik.touched.comment && formik.errors.comment
}
</div>
</div>
<div>
    <button className='button border-0'>Enviar</button>
</div>
</form>
</div>


<div>
    <h3 className='contact-title mb-4'>Póngase en contacto</h3>
<div>
    <ul className='ps-0'>
        <li className='mb-3 d-flex gap-15 align-items-center'><FaHome className='fs-5'/>
        <address className='mb-0'>Buenos Aires, Argentina</address>
        </li>
        <li className='mb-3 d-flex gap-15 align-items-center'><MdWifiCalling3 className='fs-5'/>
        <a href='tel:+5491122781197'>+5491122781197</a>
        </li>
        <li className='mb-3 d-flex gap-15 align-items-center'><MdContactMail className='fs-5'/>
        <a href='mailto:codev.laya@gmail.com'>codev.laya@gmail.com</a>
        </li>
        <li className='mb-3 d-flex gap-15 align-items-center'><BsFillInfoCircleFill className='fs-5'/>
        <p className='mb-0'>Lunes a Viernes 10:00am a 18hs</p>
        </li>
    </ul>
</div>
</div>
</div>    
</div>
</div> 
</Container>
</>
)
}

export default Contact