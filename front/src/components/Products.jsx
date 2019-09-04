// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';

const Products = ({ products }) => (
  products && products.map(product => (
    <Link to={`/productos/${product.id}`} key={product.id}>
      <div className="product" >
        <div className="card">
          <img src={`${product.imagenes[0]}`} className="card-img-top imgproduct" />
          <div className="card-body">
            <h5 className="card-title"> {product.marca + ' ' + product.modelo} </h5>
            <strong><p className="card-text"> ${product.precio} </p></strong>
            <p className="card-text"> {product.descripcion} </p>
          </div>
        </div>
      </div>
    </Link>
  ))
);

export default Products;
