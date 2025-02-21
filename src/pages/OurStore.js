import React, {useEffect, useState} from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/ProductCard';



import gr from '../images/gr.svg';
import gr2 from '../images/gr2.svg';
import gr4 from '../images/gr4.svg';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/product/productSlice';






const OurStore = () => {


const [grid, setGrid] = useState(4);
const [brands, setBrands] = useState([]);
const [categories, setCategories] = useState([]);
const [tags, setTags] = useState([]);
// const [category, setCategory] = useState(null);
const [tag, setTag] = useState(null);
const [brand, setBrand] = useState(null);
const [minPrice, setMinPrice] = useState(null);
const [maxPrice, setMaxPrice] = useState(null);
const [sort, setSort] = useState(null);
const [selectedCategories, setSelectedCategories] = useState(new Set());
console.log(sort);
const dispatch = useDispatch();
const productState = useSelector((state) => state?.product?.product);





useEffect(()=> {
  getProducts();
}, [sort, tag, brand, selectedCategories, minPrice, maxPrice])

const getProducts = () => {
dispatch(getAllProducts({sort, tag, brand, categories: Array.from(selectedCategories), minPrice, maxPrice}));

}


useEffect(() => {
  let newBrands = [];
  let newCategories = [];
  let newTags = [];
  let newColors = [];

  for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      newCategories.push(element.category);
      newTags.push(element.tags);
      newColors.push(element.color);
  }

  setBrands([...new Set(newBrands)]);
  setCategories([...new Set(newCategories)]);
  setTags([...new Set(newTags)]);
  // setColors(newColors)
}, [productState]);





const toggleCategory = (category) => {
  const updatedCategories = new Set(selectedCategories);
  if (updatedCategories.has(category)) {
      updatedCategories.delete(category);
  } else {
      updatedCategories.add(category);
  }
  setSelectedCategories(updatedCategories);
}


const handleBrandClick = (item) => {
  // Verificar si la marca seleccionada ya está en el estado brand
  if (brand === item) {
    // Si ya está seleccionada, deseleccionarla
    setBrand(null);
  } else {
    // Si no está seleccionada, seleccionarla
    setBrand(item);
  }
}







  return (


<>
<Meta title={"Nuestra Tienda"}/>
<BreadCrumb title="Nuestra Tienda"/>
<Container class1='store-wrapper home-wrapper-2 py-5'>
<div className='row'>
<div className='col-3'>
<div className='filter-card mb-3'>
  <h3 className='filter-title'>Comprar por Categorías</h3>
<div>
<ul className='ps-0'>
  {categories.map((category, index) => (
    <li key={index} onClick={() => toggleCategory(category)} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
<input type="checkbox" checked={selectedCategories.has(category)} readOnly style={{ marginRight: '4px' }} />
      {category}
</li>
))}
</ul>

</div>
</div>
<div className='filter-card mb-3'>
  <h3 className='filter-title'>Filtrar Por</h3>
<div>



<h5 className='sub-title'>Precio</h5>
<div className='d-flex align-items-center gap-10'>
<div className="form-floating mb-3">
  <input type="number" 
  className="form-control"
  id="floatingInput" 
  placeholder="Desde"
  onChange={(e) => setMinPrice(e.target.value)}
  />
  <label htmlFor="floatingInput">Desde</label>
</div>

<div className="form-floating mb-3">
  <input type="number" 
  className="form-control"
  id="floatingInput" 
  placeholder="Hasta"
  onChange={(e) => setMaxPrice(e.target.value)}
  />
  <label htmlFor="floatingInput">Hasta</label>
</div>
</div>

</div>
<div className=' mt-4 mb-5'>
  <h3 className='sub-title'>Etiqueta de Producto</h3>
<div>
<div className='product-tags d-flex flex-wrap align-items-center gap-10'>

{
   tags && [...new Set(tags)].map((item, index) => {
      return (
      <span key={index} className='badge bg-light text-secondary rounded-3 py-2 px-3 text-capitalize' 
      onClick={() => setTag(item)}>{item}</span>)
    })
  }
</div>
</div>
</div>
<div className='mt-4 mb-4'>
<div className='mt-4 mb-4'>
  <h3 className='sub-title'>Marcas De Productos</h3>
<div>
<div className='product-tags d-flex flex-wrap align-items-center gap-10'>
    {brands && [...new Set(brands)].map((item, index) => (
<span 
  key={index} 
  className={`badge bg-light text-secondary rounded-3 py-2 px-3 text-capitalize ${brand === item ? 'active' : ''}`} 
  onClick={() => handleBrandClick(item)}
>
  {item}
</span>
))}
</div>
</div>
</div>
</div>





</div>
</div>



<div className='col-9'>
<div className='filter-sort-grid mb-4'>
<div className='d-flex justify-content-between align-items-center'>
<div className='d-flex align-items-center ga-10'>
<p className='mb-0 d-block' style={{width: "100px"}}>Ordenar Por:</p>
<select name='' 
defaultValue={"manula"} 
className='form-control form-select' 
id=''
onChange={(e) => setSort(e.target.value)}
>

  <option value='title'>Alfabéticamente, A-Z</option>
  <option value='-title'>Alfabéticamente, Z-A</option>
  <option value='price'>Precio, Menor a Mayor</option>
  <option value='-price'>Precio, Mayor a Menor</option>
  <option value='createdAt'>Fecha, Viejo a nuevo</option>
  <option value='-createdAt'>Fecha, Nuevo a viejo</option>
</select>
</div>
<div className='d-flex align-items-center gap-10'> 
<p className='totalproducts mb-0'>21 Products</p>
<div className='d-flex gap-10 align-items-center grid'>
<img onClick={()=>{setGrid(3);
}} src={gr4} className='d-block img-fluid' alt='grid'/>

<img onClick={()=>{setGrid(6);
}} src={gr2} className='d-block img-fluid' alt='grid'/>

<img onClick={()=>{setGrid(12);
}} src={gr} className='d-block img-fluid' alt='grid'/>
</div>
</div>
</div>
</div>
<div className='products-list pb-5'>
<div className='d-flex gap-10 flex-wrap'>
  
<ProductCard data={selectedCategories.size > 0 ? productState.filter(product => selectedCategories.has(product.category)) : productState} grid={grid} />

</div>
</div>
</div>
</div>
</Container>
</>
  )
}

export default OurStore