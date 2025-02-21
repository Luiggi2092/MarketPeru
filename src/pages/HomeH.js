import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container';




const HomeH = () => {


  return (

<>
<Meta title={"Hogar"}/>
<BreadCrumb title="Hogar"/>
<Container class1='blog-wrapper home-wrapper-2 py-5'>
<div className='row'>
<div className='col-3'>
<h2>Hogar</h2>
</div>
</div>
</Container>
</>
)
}

export default HomeH