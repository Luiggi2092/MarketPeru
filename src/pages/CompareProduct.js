import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Color from '../components/Color';
import cross from '../images/cross.svg';
import watch from '../images/relopink.jpg';
import Container from '../components/Container';





const CompareProduct = () => {


  
  const [comparisonData, setComparisonData] = useState(null);

  useEffect(() => {
    fetchComparisonData(); // Cargar datos de comparación al cargar el componente
  }, []);

  const fetchComparisonData = () => {
    fetch('/api/compare-product') // Reemplaza '/api/compare' con la ruta correcta a tu endpoint de comparación en el backend
      .then(response => response.json())
      .then(data => setComparisonData(data))
      .catch(error => console.error('Error fetching comparison data:', error));
  };

  const handleAddToCompare = (productId) => {
    // Lógica para agregar el producto a la lista de comparación
    fetch('/api/add-to-compare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }), // Envía el ID del producto que se agregará a comparar
    })
      .then(response => response.json())
      .then(data => {
        // Actualizar los datos de comparación después de agregar el producto
        setComparisonData(data);
      })
      .catch(error => console.error('Error adding product to comparison:', error));
  };

  return (
    <> 
      <Meta title={"Compare Productos"}/>
      <BreadCrumb title="Compare Productos"/>

      <Container class1='compare-product-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          {comparisonData && comparisonData.map(product => (
            <div key={product._id} className='col-3'>
              <div className='compare-product-card position-relative'>
                <img src={cross} alt='cross' className='position-absolute cross img-fluid'/>
                <div className='product-card-image'>
                  <img src={watch} alt='watch'/>   

                  <div className='compare-product-details'>
                    <h5 className='title'>{product.title}</h5> 
                    <h6 className='price mb-3 mt-3'>{product.price}</h6> 

                    <div>
                      <div className='product-detail'>
                        <h5>Marca:</h5>
                        <p>{product.brand}</p>
                      </div>
                      <div className='product-detail'>
                        <h5>Tipo:</h5>
                        <p>{product.category}</p>
                      </div>
                      <div className='product-detail'>
                        <h5>Disponibilidad:</h5>
                        <p>{product.quantity > 0 ? 'En Stock' : 'Sin Stock'}</p>
                      </div>
                      <div className='product-detail'>
                        <h5>Color:</h5>
                        <Color/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
