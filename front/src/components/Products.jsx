// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';

const Products = ({ products }) => (
  products && products.sort((a, b) => { return b.id - a.id }).map(product => (
    <Link to={`/productos/${product.id}`} key={product.id}>
      <div className="product" >
        <div className="card">
          <img style={{objectFit: 'contain'}} src={`${product.imagenes[0]}`} className="card-img-top imgproduct" />
          <div className="card-body">
            <h5 className="card-title last"> {product.marca + ' ' + product.modelo} </h5>
            <strong><p className="card-text"> ${product.precio} </p></strong>
            <p className="card-text last"> {product.descripcion.slice(0,70) + '...'} </p>
          </div>
        </div>
      </div>
    </Link>
  ))
);

export default Products;
