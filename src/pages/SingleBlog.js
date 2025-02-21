import React, {useEffect, useState} from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link, useLocation } from 'react-router-dom'
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import Container from '../components/Container';
import { getABlog } from '../features/blogs/blogSlice';
import visor from '../images/visor-img.webp'



const SingleBlog = () => {


  const dispatch = useDispatch();

  const blogState = useSelector((state) => state?.blog?.singleBlog);
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];

  


  const getblog = () => {
    dispatch(getABlog(getBlogId));
  }


  useEffect(() => {
    getblog();
  }, []);  

  



  return (

<>
<Meta title={'Detalle Blog'}/>
<BreadCrumb title={'Detalle Blog'}/>
<Container class1='blog-wrapper home-wrapper-2 py-5'>
<div className='row'>
<div className='col-12'>
<div className='single-blog-card'>
  <Link to='/blogs' className='d-flex align-item-center gap-10'>
    <FaPersonWalkingArrowLoopLeft className='fs-3'/>
            Volver a Blogs
  </Link>

  <div className='blog-content'>
<img
    src={blogState?.images[0].url ? blogState?.images[0].url : visor}
    className='img-fluid w-10 my-5 blog-image'
    alt='blog'
/>
</div>

<div className='blog-text'>
<h3 className='title-blog mb-0'>{blogState?.title}</h3>
<p className='desc-blog mb-0' dangerouslySetInnerHTML={{ __html: blogState?.description}}></p>
</div>
</div>
</div>
</div>
</Container>

</>
)
}

export default SingleBlog