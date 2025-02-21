import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'




const TermAndContions = () => {


  return ( 
    
<>
<Meta title={"Términos y Condiciones"}/>
<BreadCrumb title="Términos y Condiciones"/>
<Container class1='policy-wrapper py-5 Home'>
<div className='row'>
<div className='col-12'>
<div className='policy'>
    <h3 className='title'>Términos y Condiciones de GIAMZON</h3>
<p >
Al realizar una compra en GIAMZON, aceptas nuestros términos y condiciones. Esta sección proporciona detalles sobre responsabilidades, derechos y restricciones tanto para la tienda como para el cliente. Te invitamos a revisar cuidadosamente 
estos términos y condiciones para asegurarte de entender completamente la relación comercial entre GIAMZON y tú.
</p>
</div>
</div>
</div>  
</Container>
</>
)
}

export default TermAndContions