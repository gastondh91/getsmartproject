// eslint-disable-next-line no-unused-vars
import React,{ useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import axios from 'axios'

const Products = ({ search, products }) => {
  
  var [useSearch, setSearch] = useState()

  useEffect(()=>{
    axios.get('/api/productos/busquedas')
    .then(prod => prod.data)
    // setSearch(useSearch= search)

  },[])

  return (

     products.sort((a, b) => { return b.id - a.id }).map(product => (
      <Link to={`/productos/${product.id}`} key={product.id}>
        <div className="product" >
          <div className="card">
            <img style={{ objectFit: 'contain' }} src={`${product.imagenes[0]}`}
             className="card-img-top imgproduct" />
            <div className="card-body">
              <h5 className="card-title last"> {product.marca + ' ' + product.modelo} </h5>
              <strong><p className="card-text"> ${product.precio} </p></strong>
              <p className="card-text last"> {product.descripcion.slice(0, 90) + '...'} </p>
            </div>
          </div>
        </div>
      </Link>
    ))
  );
}
export default Products;
