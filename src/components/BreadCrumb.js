import React from 'react'
import { Link } from 'react-router-dom'



const BreadCrumb = (props) => {

const {title} = props;
  return (


<div className='breadcrumb mb-0 py-4'>
<div className='container-xxl'>
<div className='row'>
<div className='col-12 d-flex justify-content-center align-items-center'>
<p className='text-center mb-0'>
  <Link to="/" className='text-dark'>Inicio &nbsp; </Link> / {title}</p>
</div>
</div>
</div>
</div>
)
}

export default BreadCrumb